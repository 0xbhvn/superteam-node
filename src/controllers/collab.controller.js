const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { collabService } = require('../services');

const createCollab = catchAsync(async (req, res) => {
  const collab = await collabService.createCollab(req.body);
  res.status(httpStatus.CREATED).send(collab);
});

const getCollabs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'createdBy', 'status', 'members', 'skills']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await collabService.queryCollabs(filter, options);
  res.send(result);
});

const getCollab = catchAsync(async (req, res) => {
  const collab = await collabService.getCollabById(req.params.collabId);
  if (!collab) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Collab not found');
  }
  res.send(collab);
});

const updateCollab = catchAsync(async (req, res) => {
  const collab = await collabService.updateCollabById(req.params.collabId, req.body);
  res.send(collab);
});

const deleteCollab = catchAsync(async (req, res) => {
  await collabService.deleteCollabById(req.params.collabId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCollab,
  getCollabs,
  getCollab,
  updateCollab,
  deleteCollab,
};
