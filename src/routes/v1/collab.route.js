const express = require('express');
const auth = require('../../middlewares/auth');
// const validate = require('../../middlewares/validate');
// const collabValidation = require('../../validations/collab.validation');
const collabController = require('../../controllers/collab.controller');

const router = express.Router();

router.route('/').post(collabController.createCollab).get(collabController.getCollabs);

router
  .route('/:collabId')
  .get(collabController.getCollab)
  .patch(collabController.updateCollab)
  .delete(collabController.deleteCollab);

module.exports = router;
