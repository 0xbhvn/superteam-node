const httpStatus = require('http-status');
const { Claim } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a claim
 * @param {Object} collabBody
 * @returns {Promise<Claim>}
 */
const createClaim = async (collabBody) => {
  return Claim.create(collabBody);
};

/**
 * Query for claims
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryClaims = async (filter, options) => {
  const claims = await Claim.paginate(filter, options);
  return claims;
};

/**
 * Get claim by id
 * @param {ObjectId} id
 * @returns {Promise<Claim>}
 */
const getClaimById = async (id) => {
  return Claim.findById(id);
};

/**
 * Update claim by id
 * @param {ObjectId} collabId
 * @param {Object} updateBody
 * @returns {Promise<Claim>}
 */
const updateClaimById = async (collabId, updateBody) => {
  const claim = await getClaimById(collabId);
  if (!claim) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Claim not found');
  }
  Object.assign(claim, updateBody);
  await claim.save();
  return claim;
};

/**
 * Delete claim by id
 * @param {ObjectId} collabId
 * @returns {Promise<Claim>}
 */
const deleteClaimById = async (collabId) => {
  const claim = await getClaimById(collabId);
  if (!claim) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Claim not found');
  }
  await claim.remove();
  return claim;
};

module.exports = {
  createClaim,
  queryClaims,
  getClaimById,
  updateClaimById,
  deleteClaimById,
};
