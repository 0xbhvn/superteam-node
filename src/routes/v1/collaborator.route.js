const express = require('express');
const auth = require('../../middlewares/auth');
// const validate = require('../../middlewares/validate');
// const collaboratorValidation = require('../../validations/collaborator.validation');
const collaboratorController = require('../../controllers/collaborator.controller');

const router = express.Router();

router.route('/').post(collaboratorController.createCollaborator).get(collaboratorController.getCollaborators);

router
  .route('/:collaboratorId')
  .get(collaboratorController.getCollaborator)
  .patch(collaboratorController.updateCollaborator)
  .delete(collaboratorController.deleteCollaborator);

module.exports = router;
