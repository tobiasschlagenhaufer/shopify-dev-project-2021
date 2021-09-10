const allRoles = {
  user: ['uploadImage'],
  admin: ['getUsers', 'manageUsers', 'uploadImage'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
