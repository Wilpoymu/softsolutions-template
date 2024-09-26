// agenda.service.js

// Simulación de una base de datos en memoria
let eventos = [];

/**
 * Crear un nuevo evento en la agenda.
 * @param {Object} evento - El evento a crear.
 * @param {string} evento.titulo - El título del evento.
 * @param {string} evento.descripcion - La descripción del evento.
 * @param {Date} evento.fechaInicio - La fecha y hora de inicio del evento.
 * @param {Date} evento.fechaFin - La fecha y hora de fin del evento.
 * @returns {Object} El evento creado.
 */
export function crearEvento(evento) {
  const nuevoEvento = { id: Date.now(), ...evento };
  eventos.push(nuevoEvento);
  return nuevoEvento;
}

/**
 * Obtener todos los eventos de la agenda.
 * @returns {Array} La lista de eventos.
 */
export function obtenerEventos() {
  return eventos;
}

/**
 * Actualizar un evento existente en la agenda.
 * @param {number} id - El ID del evento a actualizar.
 * @param {Object} datosActualizados - Los datos actualizados del evento.
 * @returns {Object|null} El evento actualizado o null si no se encontró.
 */
export function actualizarEvento(id, datosActualizados) {
  const index = eventos.findIndex((evento) => evento.id === id);
  if (index !== -1) {
    eventos[index] = { ...eventos[index], ...datosActualizados };
    return eventos[index];
  }
  return null;
}

/**
 * Eliminar un evento de la agenda.
 * @param {number} id - El ID del evento a eliminar.
 * @returns {boolean} true si el evento fue eliminado, false si no se encontró.
 */
export function eliminarEvento(id) {
  const index = eventos.findIndex((evento) => evento.id === id);
  if (index !== -1) {
    eventos.splice(index, 1);
    return true;
  }
  return false;
}
