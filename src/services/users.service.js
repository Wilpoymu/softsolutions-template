import User from '../models/user.model';

export function getUsers() {
  return localStorage.getItem('users')
    ? JSON.parse(localStorage.getItem('users'))
    : [];
}

export function addUser(user) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const newUser = new User(user);
      try {
        newUser.validate();
      } catch (error) {
        reject(error);
      }
      // Guardar el nuevo usuario en localStorage
      const existingUsers = getUsers();
      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));
      resolve(newUser);
    }, 2000);
  });
}
