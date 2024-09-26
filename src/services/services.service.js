import Service from '../models/service.model.jsx';

export function getServices() {
  return localStorage.getItem('services')
    ? JSON.parse(localStorage.getItem('services'))
    : [];
}

export function addService(service) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const newService = new Service(service);
      try {
        newService.validate();
      } catch (error) {
        reject(error);
      }
      // Guardar el nuevo servicio en localStorage
      const existingServices = getServices();
      existingServices.push(newService);
      localStorage.setItem('services', JSON.stringify(existingServices));
      resolve(newService);
    }, 2000);
  });
}
