const CLAVE_SERVICIOS = 'dimon_servicios';
const CLAVE_SOLICITUDES = 'dimon_solicitudes';
const CLAVE_PERFIL = 'dimon_perfil';
const CLAVE_IDIOMA = 'idioma';
const CLAVE_NOTIFICACIONES = 'dimon_notificaciones';
const CLAVE_CHATS = 'dimon_chats';

function guardarServicio(datos) {
  const servicios = JSON.parse(localStorage.getItem(CLAVE_SERVICIOS) || '[]');
  datos.id = Date.now();
  datos.fecha = new Date().toISOString();
  servicios.unshift(datos);
  localStorage.setItem(CLAVE_SERVICIOS, JSON.stringify(servicios));
  return datos;
}

function guardarSolicitud(datos) {
  const solicitudes = JSON.parse(localStorage.getItem(CLAVE_SOLICITUDES) || '[]');
  datos.id = Date.now();
  datos.fecha = new Date().toISOString();
  solicitudes.unshift(datos);
  localStorage.setItem(CLAVE_SOLICITUDES, JSON.stringify(solicitudes));
  return datos;
}

function obtenerServicios() {
  return JSON.parse(localStorage.getItem(CLAVE_SERVICIOS) || '[]');
}

function obtenerSolicitudes() {
  return JSON.parse(localStorage.getItem(CLAVE_SOLICITUDES) || '[]');
}

function guardarPerfil(datos) {
  localStorage.setItem(CLAVE_PERFIL, JSON.stringify(datos));
}

function obtenerPerfil() {
  return JSON.parse(localStorage.getItem(CLAVE_PERFIL) || 'null');
}

function agregarNotificacion(notificacion) {
  const notificaciones = JSON.parse(localStorage.getItem(CLAVE_NOTIFICACIONES) || '[]');
  notificacion.id = Date.now();
  notificacion.leida = false;
  notificacion.fecha = new Date().toISOString();
  notificaciones.unshift(notificacion);
  localStorage.setItem(CLAVE_NOTIFICACIONES, JSON.stringify(notificaciones));
}

function obtenerNotificaciones() {
  return JSON.parse(localStorage.getItem(CLAVE_NOTIFICACIONES) || '[]');
}

function marcarNotificacionLeida(id) {
  const notificaciones = obtenerNotificaciones();
  const actualizadas = notificaciones.map(n => 
    n.id === parseInt(id) ? { ...n, leida: true } : n
  );
  localStorage.setItem(CLAVE_NOTIFICACIONES, JSON.stringify(actualizadas));
}

function iniciarChat(otroUsuario) {
  const chats = JSON.parse(localStorage.getItem(CLAVE_CHATS) || '[]');
  const chatExistente = chats.find(c => c.usuarioId === otroUsuario.id);
  
  if (!chatExistente) {
    chats.unshift({
      id: Date.now(),
      usuarioId: otroUsuario.id,
      usuarioNombre: otroUsuario.nombre,
      usuarioCorreo: otroUsuario.correo,
      mensajes: [],
      fechaInicio: new Date().toISOString()
    });
    localStorage.setItem(CLAVE_CHATS, JSON.stringify(chats));
  }
}

function validarCorreo(correo) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(correo);
}

function limpiarDatos() {
  localStorage.removeItem(CLAVE_SERVICIOS);
  localStorage.removeItem(CLAVE_SOLICITUDES);
  localStorage.removeItem(CLAVE_PERFIL);
  localStorage.removeItem(CLAVE_NOTIFICACIONES);
  localStorage.removeItem(CLAVE_CHATS);
}
