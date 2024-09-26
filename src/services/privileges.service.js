import Privilege from '../models/privilege.model';

export function getPrivileges() {
  return localStorage.getItem('privileges')
    ? JSON.parse(localStorage.getItem('privileges'))
    : [];
}

export function addPrivilege(privilege) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const newPrivilege = new Privilege(privilege);
      try {
        newPrivilege.validate();
      } catch (error) {
        reject(error);
      }
      // Guardar el nuevo privilegio en localStorage
      const existingPrivileges = getPrivileges();
      existingPrivileges.push(newPrivilege);
      localStorage.setItem('privileges', JSON.stringify(existingPrivileges));
      resolve(newPrivilege);
    }, 2000);
  });
}
