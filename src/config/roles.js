const allRoles = {
  user: ['getBounties', 'requestCollab', 'manageCollab'],
  admin: ['getUsers', 'manageUsers', 'getBounties', 'manageBounties', 'requestCollab', 'manageCollab'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
