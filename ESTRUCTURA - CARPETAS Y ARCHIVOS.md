═════════════════════════════════════════════════════════
⚠️  REGLAS IMPORTANTES — NO OLVIDAR
═════════════════════════════════════════════════════════

🔤 EN TODOS LOS ARCHIVOS .html:
   - Arriba del TODO, dentro del <head> SIEMPRE poner:
     <script src="js/idioma.js"></script>
     <script src="js/monedas.js"></script>
   
   - Los textos NUNCA van directos. Usar SIEMPRE:
     ✅ <button data-txt="brindarServicio"></button>
     ❌ <button>Brindar mi servicio</button>
   
   - Los campos de búsqueda:
     ✅ <input data-txt-placeholder="buscarPlaceholder" type="text">
     ❌ <input placeholder="Buscar...">

🎨 EN TODOS LOS ARCHIVOS .css:
   - La imagen de fondo: url('../assets/1788448614792.png')
   - El fondo queda FIJO, no se mueve: background-attachment: fixed;
   - Todo centrado y adaptado a celular y computadora

📁 DÓNDE VA CADA COSA:
   - .html  → van directo dentro de /public/
   - .css   → van dentro de /public/css/
   - .js    → van dentro de /public/js/
   - imágenes → van dentro de /public/assets/

🔐 BACKEND → carpeta /backend/ (en la RAÍZ, NO dentro de public)
   - Esto se sube al servidor (Render)
   - Acá vive la base de datos, usuarios, pagos, notificaciones
