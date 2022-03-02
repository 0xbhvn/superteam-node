const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { bountyService } = require('../services');

const createBounty = catchAsync(async (req, res) => {
  const bounty = await bountyService.createBounty(req.body);
  res.status(httpStatus.CREATED).send(bounty);
});

const getBounties = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'category']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await bountyService.queryBounties(filter, options);
  res.send(result);
});

const getBounty = catchAsync(async (req, res) => {
  const bounty = await bountyService.getBountyById(req.params.bountyId);
  if (!bounty) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Bounty not found');
  }
  res.send(bounty);
});

const updateBounty = catchAsync(async (req, res) => {
  const bounty = await bountyService.updateBountyById(req.params.bountyId, req.body);
  res.send(bounty);
});

const deleteBounty = catchAsync(async (req, res) => {
  await bountyService.deleteBountyById(req.params.bountyId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createBounty,
  getBounties,
  getBounty,
  updateBounty,
  deleteBounty,
};
