const httpStatus = require('http-status');
const { Collab } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a collab
 * @param {Object} collabBody
 * @returns {Promise<Collab>}
 */
const createCollab = async (collabBody) => {
  return Collab.create(collabBody);
};

/**
 * Query for collabs
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCollabs = async (filter, options) => {
  const collabs = await Collab.paginate(filter, options);
  return collabs;
};

/**
 * Get collab by id
 * @param {ObjectId} id
 * @returns {Promise<Collab>}
 */
const getCollabById = async (id) => {
  return Collab.findById(id);
};

/**
 * Update collab by id
 * @param {ObjectId} collabId
 * @param {Object} updateBody
 * @returns {Promise<Collab>}
 */
const updateCollabById = async (collabId, updateBody) => {
  const collab = await getCollabById(collabId);
  if (!collab) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Collab not found');
  }
  Object.assign(collab, updateBody);
  await collab.save();
  return collab;
};

/**
 * Delete collab by id
 * @param {ObjectId} collabId
 * @returns {Promise<Collab>}
 */
const deleteCollabById = async (collabId) => {
  const collab = await getCollabById(collabId);
  if (!collab) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Collab not found');
  }
  await collab.remove();
  return collab;
};

module.exports = {
  createCollab,
  queryCollabs,
  getCollabById,
  updateCollabById,
  deleteCollabById,
};
