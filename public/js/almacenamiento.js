const CLAVES = {
  USUARIO: 'usuarioDimon',
  OFERTAS: 'ofertasDimon',
  DEMANDAS: 'demandasDimon',
  NOTIFICACIONES: 'notificacionesDimon',
  TRANSACCIONES: 'transaccionesDimon',
  CONFIGURACION: 'configDimon'
};

function generarId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function guardarDato(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
    return true;
  } catch (error) {
    console.error('Error al guardar:', error);
    return false;
  }
}

function obtenerDato(clave, valorPorDefecto = null) {
  try {
    const dato = localStorage.getItem(clave);
    return dato ? JSON.parse(dato) : valorPorDefecto;
  } catch (error) {
    console.error('Error al leer:', error);
    return valorPorDefecto;
  }
}

function borrarDato(clave) {
  localStorage.removeItem(clave);
}

const Almacenamiento = {
  usuario: {
    guardar(datos) {
      return guardarDato(CLAVES.USUARIO, { ...datos, fechaRegistro: new Date().toISOString() });
    },
    obtener() {
      return obtenerDato(CLAVES.USUARIO, null);
    },
    actualizar(campos) {
      const actual = this.obtener() || {};
      return this.guardar({ ...actual, ...campos });
    },
    borrar() {
      borrarDato(CLAVES.USUARIO);
    }
  },

  ofertas: {
    todas() {
      return obtenerDato(CLAVES.OFERTAS, []);
    },
    agregar(datos) {
      const lista = this.todas();
      const nueva = {
        id: generarId(),
        ...datos,
        fechaCreacion: new Date().toISOString(),
        activa: true
      };
      lista.unshift(nueva);
      guardarDato(CLAVES.OFERTAS, lista);
      return nueva;
    },
    eliminar(id) {
      const lista = this.todas().filter(item => item.id !== id);
      guardarDato(CLAVES.OFERTAS, lista);
    },
    porServicio(nombreServicio) {
      return this.todas().filter(item => item.servicio === nombreServicio);
    },
    porUsuario(correoUsuario) {
      return this.todas().filter(item => item.correo === correoUsuario);
    }
  },

  demandas: {
    todas() {
      return obtenerDato(CLAVES.DEMANDAS, []);
    },
    agregar(datos) {
      const lista = this.todas();
      const nueva = {
        id: generarId(),
        ...datos,
        fechaCreacion: new Date().toISOString(),
        activa: true
      };
      lista.unshift(nueva);
      guardarDato(CLAVES.DEMANDAS, lista);
      return nueva;
    },
    eliminar(id) {
      const lista = this.todas().filter(item => item.id !== id);
      guardarDato(CLAVES.DEMANDAS, lista);
    },
    porServicio(nombreServicio) {
      return this.todas().filter(item => item.servicio === nombreServicio);
    },
    porUsuario(correoUsuario) {
      return this.todas().filter(item => item.correo === correoUsuario);
    }
  },

  notificaciones: {
    todas() {
      return obtenerDato(CLAVES.NOTIFICACIONES, []);
    },
    agregar(datos) {
      const lista = this.todas();
      const nueva = {
        id: generarId(),
        ...datos,
        fecha: new Date().toISOString(),
        leida: false
      };
      lista.unshift(nueva);
      guardarDato(CLAVES.NOTIFICACIONES, lista);
      return nueva;
    },
    marcarLeida(id) {
      const lista = this.todas();
      const item = lista.find(n => n.id === id);
      if (item) {
        item.leida = true;
        guardarDato(CLAVES.NOTIFICACIONES, lista);
      }
    },
    noLeidas() {
      return this.todas().filter(n => !n.leida);
    }
  },

  transacciones: {
    todas() {
      return obtenerDato(CLAVES.TRANSACCIONES, []);
    },
    registrar(datos) {
      const lista = this.todas();
      const nueva = {
        id: generarId(),
        ...datos,
        fecha: new Date().toISOString()
      };
      lista.unshift(nueva);
      guardarDato(CLAVES.TRANSACCIONES, lista);
      return nueva;
    }
  },

  configuracion: {
    obtener() {
      return obtenerDato(CLAVES.CONFIGURACION, {
        monedaPredeterminada: 'USD',
        paisPredeterminado: 'Uruguay'
      });
    },
    actualizar(campos) {
      const actual = this.obtener();
      return guardarDato(CLAVES.CONFIGURACION, { ...actual, ...campos });
    }
  }
};
