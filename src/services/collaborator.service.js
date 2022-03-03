const httpStatus = require('http-status');
const { Collaborator } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a collaborator
 * @param {Object} collabBody
 * @returns {Promise<Collaborator>}
 */
const createCollaborator = async (collabBody) => {
  return Collaborator.create(collabBody);
};

/**
 * Query for collaborators
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCollaborators = async (filter, options) => {
  const collaborators = await Collaborator.paginate(filter, options);
  return collaborators;
};

/**
 * Get collaborator by id
 * @param {ObjectId} id
 * @returns {Promise<Collaborator>}
 */
const getCollaboratorById = async (id) => {
  return Collaborator.findById(id);
};

/**
 * Update collaborator by id
 * @param {ObjectId} collabId
 * @param {Object} updateBody
 * @returns {Promise<Collaborator>}
 */
const updateCollaboratorById = async (collabId, updateBody) => {
  const collaborator = await getCollaboratorById(collabId);
  if (!collaborator) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Collaborator not found');
  }
  Object.assign(collaborator, updateBody);
  await collaborator.save();
  return collaborator;
};

/**
 * Delete collaborator by id
 * @param {ObjectId} collabId
 * @returns {Promise<Collaborator>}
 */
const deleteCollaboratorById = async (collabId) => {
  const collaborator = await getCollaboratorById(collabId);
  if (!collaborator) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Collaborator not found');
  }
  await collaborator.remove();
  return collaborator;
};

module.exports = {
  createCollaborator,
  queryCollaborators,
  getCollaboratorById,
  updateCollaboratorById,
  deleteCollaboratorById,
};
