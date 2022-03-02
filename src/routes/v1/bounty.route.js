const express = require('express');
const auth = require('../../middlewares/auth');
// const validate = require('../../middlewares/validate');
// const bountyValidation = require('../../validations/bounty.validation');
const bountyController = require('../../controllers/bounty.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageBounties'), bountyController.createBounty)
  .get(auth('getBounties'), bountyController.getBounties);

router
  .route('/:bountyId')
  .get(auth('getBounties'), bountyController.getBounty)
  .patch(auth('manageBounties'), bountyController.updateBounty)
  .delete(auth('manageBounties'), bountyController.deleteBounty);

module.exports = router;
