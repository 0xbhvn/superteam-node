const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { claimStates } = require('../config/claims');
const { userSkills } = require('../config/users');

const claimSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    collab: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Collab',
      required: true,
    },
    walletAddress: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: Object.values(claimStates),
      default: claimStates.REQUESTED,
      required: true,
    },
    links: {
      type: [String],
      trim: true,
    },
    skills: {
      type: [String],
      enum: Object.values(userSkills),
      required: true,
    },
    commitHours: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
claimSchema.plugin(toJSON);
claimSchema.plugin(paginate);

claimSchema.pre('save', async function (next) {
  const claim = this;
  next();
});

/**
 * @typedef Claim
 */
const Claim = mongoose.model('Claim', claimSchema);

module.exports = Claim;
