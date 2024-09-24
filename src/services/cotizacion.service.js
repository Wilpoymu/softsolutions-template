import { Cotizacion } from '../models/cotizacion.model';

export function getCotizaciones() {
  return localStorage.getItem('cotizaciones')
    ? JSON.parse(localStorage.getItem('cotizaciones'))
    : [];
}

export function addCotizacion(cotizacion) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Adding cotizacion', cotizacion);
      const newCotizacion = new Cotizacion(cotizacion);
      console.log('New Cotizacion', newCotizacion);
      try {
        newCotizacion.validate();
      } catch (error) {
        reject(error);
      }
      const existingCotizaciones = getCotizaciones();
      existingCotizaciones.push(newCotizacion);
      localStorage.setItem('cotizaciones', JSON.stringify(existingCotizaciones));
      resolve(newCotizacion);
    }, 2000);
  });
}
