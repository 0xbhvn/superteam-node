const express = require('express');
const auth = require('../../middlewares/auth');
// const validate = require('../../middlewares/validate');
// const collaboratorValidation = require('../../validations/collaborator.validation');
const collaboratorController = require('../../controllers/collaborator.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('requestCollabs'), collaboratorController.createCollaborator)
  .get(auth('requestCollabs'), collaboratorController.getCollaborators);

router
  .route('/:collaboratorId')
  .get(auth('requestCollabs'), collaboratorController.getCollaborator)
  .patch(auth('manageCollabs'), collaboratorController.updateCollaborator)
  .delete(auth('manageCollabs'), collaboratorController.deleteCollaborator);

module.exports = router;
