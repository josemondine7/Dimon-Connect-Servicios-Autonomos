// ==========================================
// DIMON CONNECT 2026 — Sistema de Idioma
// ==========================================

const traducciones = {
  es: {
    volver: "Volver",
    inicio: "Inicio",
    buscar: "Buscar",
    ofertaDemanda: "Oferta y Demanda",
    solicitarServicio: "Solicitar un servicio",
    brindarServicio: "Brindar mi servicio",
    iniciarSesion: "Iniciar sesión",
    inscribirse: "Inscribirse",
    descargarApp: "Descargar aplicación",
    normas: "Normas y Seguridad",
    privacidad: "Privacidad",
    terminos: "Términos de Servicio",
    cookies: "Cookies",
    contacto: "Contacto",
    buscarPlaceholder: "Buscar servicios, personas, ayuda...",
    // Oferta y Demanda
    verTodos: "Ver todos",
    soloOfertas: "Ofertas",
    soloDemandas: "Demandas",
    anotarse: "Anotarse",
    yaAnotado: "Ya anotado ✓",
    sinResultados: "No se encontraron resultados",
    // Formularios
    tuNombre: "Tu nombre completo",
    tuCorreo: "Tu correo electrónico",
    tuTelefono: "Tu teléfono",
    pais: "País",
    localidad: "Ciudad / Localidad",
    tipoServicio: "Tipo de servicio",
    descripcion: "Contame brevemente qué necesitás u ofrecés",
    precio: "Precio estimado",
    moneda: "Moneda",
    enviar: "Enviar publicación",
    // Confirmaciones
    guardadoOk: "✅ Guardado correctamente",
    publicadoOk: "✅ ¡Publicado con éxito!",
    errorCampos: "⚠️ Completá todos los campos obligatorios",
    errorCorreo: "⚠️ Ingresá un correo válido",
    // Trato y comisiones
    señaExplicacion: "La seña queda protegida por la plataforma hasta que confirmes el servicio",
    comisionDetalle: "Comisión Dimon Connect: 5% (incluida)",
    confirmarTrato: "Confirmar trato y pagar seña",
    // Navegación
    inicio: "Inicio",
    buscarNav: "Buscar",
    mensajes: "Mensajes",
    perfil: "Perfil"
  },
  en: {
    volver: "Back",
    inicio: "Home",
    buscar: "Search",
    ofertaDemanda: "Offer & Demand",
    solicitarServicio: "Request a service",
    brindarServicio: "Offer my service",
    iniciarSesion: "Log in",
    inscribirse: "Sign up",
    descargarApp: "Download app",
    normas: "Rules & Safety",
    privacidad: "Privacy",
    terminos: "Terms of Service",
    cookies: "Cookies",
    contacto: "Contact",
    buscarPlaceholder: "Search services, people, help...",
    verTodos: "All",
    soloOfertas: "Offers",
    soloDemandas: "Requests",
    anotarse: "Sign up",
    yaAnotado: "Signed ✓",
    sinResultados: "No results found",
    tuNombre: "Your full name",
    tuCorreo: "Your email",
    tuTelefono: "Your phone",
    pais: "Country",
    localidad: "City / Location",
    tipoServicio: "Service type",
    descripcion: "Briefly describe what you need or offer",
    precio: "Estimated price",
    moneda: "Currency",
    enviar: "Publish",
    guardadoOk: "✅ Saved successfully",
    publicadoOk: "✅ Published successfully!",
    errorCampos: "⚠️ Please fill in all required fields",
    errorCorreo: "⚠️ Enter a valid email",
    señaExplicacion: "Deposit is held securely until service completion",
    comisionDetalle: "Platform fee: 5% (included)",
    confirmarTrato: "Confirm deal & pay deposit",
    inicio: "Home",
    buscarNav: "Search",
    mensajes: "Messages",
    perfil: "Profile"
  },
  pt: {
    volver: "Voltar",
    inicio: "Início",
    buscar: "Buscar",
    ofertaDemanda: "Oferta e Procura",
    solicitarServicio: "Solicitar serviço",
    brindarServicio: "Oferecer meu serviço",
    iniciarSesion: "Entrar",
    inscribirse: "Cadastrar-se",
    descargarApp: "Baixar app",
    normas: "Regras e Segurança",
    privacidad: "Privacidade",
    terminos: "Termos de Serviço",
    cookies: "Cookies",
    contacto: "Contato",
    buscarPlaceholder: "Buscar serviços, pessoas, ajuda..."
  }
};

// Detectar y establecer idioma
let idiomaActual = localStorage.getItem('dimon_idioma') || 
  (navigator.language.startsWith('es') ? 'es' : 
   navigator.language.startsWith('pt') ? 'pt' : 'en');

function cambiarIdioma(nuevoIdioma) {
  if (traducciones[nuevoIdioma]) {
    idiomaActual = nuevoIdioma;
    localStorage.setItem('dimon_idioma', idiomaActual);
    aplicarTraducciones();
    actualizarMonedaSegunIdioma();
  }
}

function t(clave) {
  return traducciones[idiomaActual][clave] || clave;
}

function aplicarTraducciones() {
  document.querySelectorAll('[data-t]').forEach(el => {
    const clave = el.getAttribute('data-t');
    el.textContent = t(clave);
  });
  document.querySelectorAll('[data-t-placeholder]').forEach(el => {
    const clave = el.getAttribute('data-t-placeholder');
    el.placeholder = t(clave);
  });
}

// Moneda según región
function actualizarMonedaSegunIdioma() {
  const monedaPorIdioma = {
    es: 'USD',
    en: 'USD',
    pt: 'BRL'
  };
  localStorage.setItem('dimon_moneda', monedaPorIdioma[idiomaActual] || 'USD');
}

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', aplicarTraducciones);
