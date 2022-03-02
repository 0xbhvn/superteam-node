const httpStatus = require('http-status');
const { Bounty } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a bounty
 * @param {Object} bountyBody
 * @returns {Promise<Bounty>}
 */
const createBounty = async (bountyBody) => {
  return Bounty.create(bountyBody);
};

/**
 * Query for bounties
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryBounties = async (filter, options) => {
  const bounties = await Bounty.paginate(filter, options);
  return bounties;
};

/**
 * Get bounty by id
 * @param {ObjectId} id
 * @returns {Promise<Bounty>}
 */
const getBountyById = async (id) => {
  return Bounty.findById(id);
};

/**
 * Update bounty by id
 * @param {ObjectId} bountyId
 * @param {Object} updateBody
 * @returns {Promise<Bounty>}
 */
const updateBountyById = async (bountyId, updateBody) => {
  const bounty = await getBountyById(bountyId);
  if (!bounty) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Bounty not found');
  }
  Object.assign(bounty, updateBody);
  await bounty.save();
  return bounty;
};

/**
 * Delete bounty by id
 * @param {ObjectId} bountyId
 * @returns {Promise<Bounty>}
 */
const deleteBountyById = async (bountyId) => {
  const bounty = await getBountyById(bountyId);
  if (!bounty) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Bounty not found');
  }
  await bounty.remove();
  return bounty;
};

module.exports = {
  createBounty,
  queryBounties,
  getBountyById,
  updateBountyById,
  deleteBountyById,
};
