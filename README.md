# 🍖 Tablero del Evento – Restaurant Plaza Gallo

Tablero web para la comida organizada por **Javier Torres Rodríguez**.

- **Día:** 14 de noviembre
- **Horario:** a partir de las 3:00 pm
- **Lugar:** Restaurant Plaza Gallo – 10 Berriozábal esquina

## Funciones

- Información del evento (día, hora, lugar con enlace a mapa)
- Menú completo (entrada, parrillada, bebida y postre)
- Lista de los 21 invitados
- Confirmación por persona: **Asistirá / No / Pendiente**
- Casilla **“Llegó”** para marcar la asistencia el día del evento (registra la hora)
- Contadores en tiempo real y barra de progreso de llegadas
- Búsqueda (sin importar acentos) y filtros
- Exportar a CSV (abre en Excel) e imprimir

Los datos se guardan en el navegador (`localStorage`), así que no se pierden al recargar la página.

## Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub (por ejemplo `tablero-evento`).
2. Sube `index.html` y `README.md`:
   ```bash
   git init
   git add index.html README.md
   git commit -m "Tablero del evento"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/tablero-evento.git
   git push -u origin main
   ```
3. En el repositorio ve a **Settings → Pages**, en *Source* elige la rama `main` y la carpeta `/ (root)`, y guarda.
4. En un par de minutos estará en `https://TU_USUARIO.github.io/tablero-evento/`.

## Nota

GitHub Pages solo sirve archivos estáticos: cada dispositivo guarda sus propias marcas.
Lo ideal es que una sola persona (el organizador) lleve el control desde su teléfono o computadora.
Si se necesita que varias personas confirmen desde sus propios dispositivos y se vea en un solo lugar,
hace falta un backend (por ejemplo una API en Laravel con base de datos).
