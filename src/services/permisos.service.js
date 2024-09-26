import Permiso from '../models/permiso.model';

export function getPermisos() {
  return localStorage.getItem('permisos')
    ? JSON.parse(localStorage.getItem('permisos'))
    : [];
}

export function addPermiso(permiso) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const newPermiso = new Permiso(permiso);
      try {
        newPermiso.validate();
      } catch (error) {
        reject(error);
      }
      // Guardar el nuevo permiso en localStorage
      const existingPermisos = getPermisos();
      existingPermisos.push(newPermiso);
      localStorage.setItem('permisos', JSON.stringify(existingPermisos));
      resolve(newPermiso);
    }, 2000);
  });
}