const allRoles = {
  user: ['getBounties', 'requestCollabs', 'manageCollabs'],
  admin: ['getUsers', 'manageUsers', 'getBounties', 'manageBounties', 'requestCollabs', 'manageCollabs'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
