const express = require('express');
const auth = require('../../middlewares/auth');
// const validate = require('../../middlewares/validate');
// const collabValidation = require('../../validations/collab.validation');
const collabController = require('../../controllers/collab.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageCollabs'), collabController.createCollab)
  .get(auth('requestCollabs'), collabController.getCollabs);

router
  .route('/:collabId')
  .get(auth('requestCollabs'), collabController.getCollab)
  .patch(auth('manageCollabs'), collabController.updateCollab)
  .delete(auth('manageCollabs'), collabController.deleteCollab);

module.exports = router;
