import Role from '../models/role.model';

export function getRoles() {
  return localStorage.getItem('roles')
    ? JSON.parse(localStorage.getItem('roles'))
    : [];
}

export function addRole(role) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const newRole = new Role(role);
      try {
        newRole.validate();
      } catch (error) {
        reject(error);
      }
      // Guardar el nuevo rol en localStorage
      const existingRoles = getRoles();
      existingRoles.push(newRole);
      localStorage.setItem('roles', JSON.stringify(existingRoles));
      resolve(newRole);
    }, 2000);
  });
}
