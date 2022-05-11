const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { claimService } = require('../services');

const createClaim = catchAsync(async (req, res) => {
  const claim = await claimService.createClaim(req.body);
  res.status(httpStatus.CREATED).send(claim);
});

const getClaims = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['collab', 'user', 'status', 'skills']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await claimService.queryClaims(filter, options);
  res.send(result);
});

const getClaim = catchAsync(async (req, res) => {
  const claim = await claimService.getClaimById(req.params.claimId);
  if (!claim) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Claim not found');
  }
  res.send(claim);
});

const updateClaim = catchAsync(async (req, res) => {
  const claim = await claimService.updateClaimById(req.params.claimId, req.body);
  res.send(claim);
});

const deleteClaim = catchAsync(async (req, res) => {
  await claimService.deleteClaimById(req.params.claimId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createClaim,
  getClaims,
  getClaim,
  updateClaim,
  deleteClaim,
};
