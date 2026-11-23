/**
 * Backend de confirmaciones – Posada de Información en Salud, Análisis e Interpretación
 * Pegar en: Hoja de Google → Extensiones → Apps Script
 * Implementar como Aplicación web (acceso: "Cualquier usuario").
 */

const HOJA = "Confirmaciones";
const ENCABEZADOS = ["#", "Nombre", "Confirmación", "Llegó", "Hora de llegada", "Última actualización"];
const VALIDOS = ["si", "no", "pend"];

function hoja_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(HOJA);
  if (!sh) {
    sh = ss.insertSheet(HOJA);
    sh.appendRow(ENCABEZADOS);
    sh.setFrozenRows(1);
  }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// GET: devuelve todas las confirmaciones { "0": {conf, llego, hora}, ... }
function doGet() {
  const sh = hoja_();
  const filas = sh.getLastRow() > 1
    ? sh.getRange(2, 1, sh.getLastRow() - 1, 5).getValues()
    : [];
  const out = {};
  filas.forEach(r => {
    if (r[0] === "") return;
    const i = Number(r[0]) - 1;
    const txt = String(r[2]);
    out[i] = {
      conf: txt === "Asistirá" ? "si" : txt === "No asistirá" ? "no" : "pend",
      llego: r[3] === "Sí",
      hora: String(r[4] || "")
    };
  });
  return json_(out);
}

// POST: guarda la confirmación de una persona
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents);
    const i = Number(d.i);
    if (!Number.isInteger(i) || i < 0 || i > 200 || VALIDOS.indexOf(d.conf) === -1) {
      return json_({ ok: false, error: "datos inválidos" });
    }
    const txt = { si: "Asistirá", no: "No asistirá", pend: "Pendiente" }[d.conf];
    const sh = hoja_();
    sh.getRange(i + 2, 1, 1, 6).setValues([[
      i + 1,
      String(d.nombre || "").slice(0, 100),
      txt,
      d.llego ? "Sí" : "No",
      String(d.hora || "").slice(0, 10),
      new Date()
    ]]);
    return json_({ ok: true });
  } finally {
    lock.releaseLock();
  }
}
