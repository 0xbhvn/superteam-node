const express = require('express');
const auth = require('../../middlewares/auth');
// const validate = require('../../middlewares/validate');
// const bountyValidation = require('../../validations/bounty.validation');
const bountyController = require('../../controllers/bounty.controller');

const router = express.Router();

router.route('/').post(bountyController.createBounty).get(bountyController.getBounties);

router
  .route('/:bountyId')
  .get(bountyController.getBounty)
  .patch(bountyController.updateBounty)
  .delete(bountyController.deleteBounty);

module.exports = router;
