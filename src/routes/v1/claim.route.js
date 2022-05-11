const express = require('express');
const auth = require('../../middlewares/auth');
// const validate = require('../../middlewares/validate');
// const claimValidation = require('../../validations/claim.validation');
const claimController = require('../../controllers/claim.controller');

const router = express.Router();

router.route('/').post(claimController.createClaim).get(claimController.getClaims);

router
  .route('/:claimId')
  .get(claimController.getClaim)
  .patch(claimController.updateClaim)
  .delete(claimController.deleteClaim);

module.exports = router;
