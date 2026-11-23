# 🎄 Posada de Información en Salud, Análisis e Interpretación

Tablero web de la posada organizada por el **Mtro. Javier Torres Rodríguez**.

- **Día:** 14 de diciembre
- **Horario:** a partir de las 3:00 pm
- **Lugar:** Restaurant Plaza Gallo – 10 Berriozábal esquina

## Funciones

- Información del evento (día, hora y lugar con enlace al mapa) y menú completo
- Lista de los 21 invitados
- Cada invitado confirma: **Asistiré / No podré / Pendiente**
- Confirmación **en línea** (opcional): todas las respuestas se guardan en una Hoja de Google
- **Modo organizador:** casilla “Llegó” para pasar lista el día del evento, exportar a CSV y reiniciar
- Contadores en tiempo real, búsqueda sin acentos, filtros e impresión

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La página del tablero |
| `apps-script.gs` | Código que guarda las confirmaciones en una Hoja de Google |
| `README.md` | Estas instrucciones |

## 1. Publicar en GitHub Pages

```bash
git init
git add index.html README.md apps-script.gs
git commit -m "Tablero de la posada"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/posada.git
git push -u origin main
```

En el repositorio: **Settings → Pages → Source: rama `main`, carpeta `/ (root)` → Save**.
Quedará en `https://TU_USUARIO.github.io/posada/`.

## 2. Activar la confirmación en línea (Hoja de Google)

1. Crea una **Hoja de cálculo de Google** nueva (por ejemplo “Confirmaciones Posada”).
2. Ve a **Extensiones → Apps Script**, borra lo que haya y pega el contenido de `apps-script.gs`. Guarda.
3. Clic en **Implementar → Nueva implementación** → tipo **Aplicación web**:
   - *Ejecutar como:* **Yo**
   - *Quién tiene acceso:* **Cualquier usuario**
4. Autoriza los permisos y copia la **URL de la aplicación web** (termina en `/exec`).
5. En `index.html` busca esta línea y pega la URL:
   ```js
   const SCRIPT_URL = "https://script.google.com/macros/s/XXXXXXXX/exec";
   ```
6. Sube el cambio a GitHub (`git commit -am "URL en línea" && git push`).

Las respuestas aparecen en la pestaña **Confirmaciones** de la hoja, y la página se actualiza sola cada 30 segundos.

> Si modificas `apps-script.gs` después, usa **Implementar → Administrar implementaciones → Editar → Nueva versión** para que la URL siga siendo la misma.

## 3. Enlaces

- **Para los invitados:** `https://TU_USUARIO.github.io/posada/`
  Solo ven la información, el menú y los botones para confirmar.
- **Para el organizador:** `https://TU_USUARIO.github.io/posada/?organizador`
  Además ven la columna **“Llegó”** para pasar lista, y los botones para exportar a CSV y reiniciar.

## Consideraciones

- La lista no pide contraseña: cualquiera con el enlace puede cambiar la confirmación de cualquier invitado.
  Para un evento interno del departamento suele ser suficiente, y la hoja guarda la hora de cada cambio.
- El enlace `?organizador` solo oculta o muestra la columna de asistencia; no es una protección real.
  Compártelo únicamente con quien pasará lista.
- Sin `SCRIPT_URL`, el tablero funciona igual, pero las marcas se guardan solo en el navegador de cada persona.
