// ==============================================
// DIMON CONNECT — Base de Datos Local
// Versión: 1.0 | Fecha: 2026
// ==============================================

// Claves de almacenamiento
const DB_KEYS = {
  SERVICIOS_BRINDADOS: 'dc_servicios_brindados',
  SERVICIOS_SOLICITADOS: 'dc_servicios_solicitados',
  CATEGORIAS: 'dc_categorias',
  USUARIOS: 'dc_usuarios',
  MENSAJES: 'dc_mensajes_lira'
};

// Datos iniciales de categorías
const categoriasIniciales = [
  { id: 1, nombre: 'Construcción y Reparacion', icono: '🔨' },
  { id: 2, nombre: 'Limpieza y Mantenimiento', icono: '🧹' },
  { id: 3, nombre: 'Cuidado y Bienestar', icono: '💆' },
  { id: 4, nombre: 'Clases y Apoyo Escolar', icono: '📚' },
  { id: 5, nombre: 'Transporte y Mudanzas', icono: '🚚' },
  { id: 6, nombre: 'Tecnologia y Servicios Digitales', icono: '💻' },
  { id: 7, nombre: 'Cocina y Servicios Gastronomicos', icono: '👨‍🍳' },
  { id: 8, nombre: 'Otros Servicios', icono: '📋' }
];

// Inicializar base de datos
function inicializarDB() {
  if (!localStorage.getItem(DB_KEYS.CATEGORIAS)) {
    localStorage.setItem(DB_KEYS.CATEGORIAS, JSON.stringify(categoriasIniciales));
  }
  if (!localStorage.getItem(DB_KEYS.SERVICIOS_BRINDADOS)) {
    localStorage.setItem(DB_KEYS.SERVICIOS_BRINDADOS, JSON.stringify([]));
  }
  if (!localStorage.getItem(DB_KEYS.SERVICIOS_SOLICITADOS)) {
    localStorage.setItem(DB_KEYS.SERVICIOS_SOLICITADOS, JSON.stringify([]));
  }
  if (!localStorage.getItem(DB_KEYS.MENSAJES)) {
    localStorage.setItem(DB_KEYS.MENSAJES, JSON.stringify([]));
  }
}

// Obtener datos
function obtenerDatos(clave) {
  const datos = localStorage.getItem(clave);
  return datos ? JSON.parse(datos) : [];
}

// Guardar datos
function guardarDatos(clave, datos) {
  localStorage.setItem(clave, JSON.stringify(datos));
}

// Agregar nuevo registro
function agregarRegistro(clave, registro) {
  const datos = obtenerDatos(clave);
  registro.id = Date.now(); // ID único basado en tiempo
  registro.fecha = new Date().toISOString();
  datos.push(registro);
  guardarDatos(clave, datos);
  return registro;
}

// Eliminar registro
function eliminarRegistro(clave, id) {
  let datos = obtenerDatos(clave);
  datos = datos.filter(item => item.id !== id);
  guardarDatos(clave, datos);
}

// Obtener categorías
function obtenerCategorias() {
  return obtenerDatos(DB_KEYS.CATEGORIAS);
}

// Registrar servicio brindado
function registrarServicioBrindado(datos) {
  return agregarRegistro(DB_KEYS.SERVICIOS_BRINDADOS, datos);
}

// Registrar servicio solicitado
function registrarServicioSolicitado(datos) {
  return agregarRegistro(DB_KEYS.SERVICIOS_SOLICITADOS, datos);
}

// Obtener servicios brindados
function obtenerServiciosBrindados() {
  return obtenerDatos(DB_KEYS.SERVICIOS_BRINDADOS);
}

// Obtener
