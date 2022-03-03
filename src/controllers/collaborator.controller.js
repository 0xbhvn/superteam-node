const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { collaboratorService } = require('../services');

const createCollaborator = catchAsync(async (req, res) => {
  const collaborator = await collaboratorService.createCollaborator(req.body);
  res.status(httpStatus.CREATED).send(collaborator);
});

const getCollaborators = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'category']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await collaboratorService.queryCollaborators(filter, options);
  res.send(result);
});

const getCollaborator = catchAsync(async (req, res) => {
  const collaborator = await collaboratorService.getCollaboratorById(req.params.collaboratorId);
  if (!collaborator) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Collaborator not found');
  }
  res.send(collaborator);
});

const updateCollaborator = catchAsync(async (req, res) => {
  const collaborator = await collaboratorService.updateCollaboratorById(req.params.collaboratorId, req.body);
  res.send(collaborator);
});

const deleteCollaborator = catchAsync(async (req, res) => {
  await collaboratorService.deleteCollaboratorById(req.params.collaboratorId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCollaborator,
  getCollaborators,
  getCollaborator,
  updateCollaborator,
  deleteCollaborator,
};
