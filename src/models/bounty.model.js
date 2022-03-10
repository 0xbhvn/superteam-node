const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { bountyTypes, bountyStates, bountyXps } = require('../config/bounties');

const bountySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: Object.values(bountyTypes),
      required: true,
    },
    description: {
      type: String,
    },
    prize: {
      type: Number,
      required: true,
    },
    state: {
      type: String,
      enum: Object.values(bountyStates),
      default: bountyStates.OPEN,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    baseXp: {
      type: Number,
      default: Object.values(bountyXps),
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
bountySchema.plugin(toJSON);
bountySchema.plugin(paginate);

bountySchema.pre('save', async function (next) {
  const bounty = this;
  next();
});

/**
 * @typedef Bounty
 */
const Bounty = mongoose.model('Bounty', bountySchema);

module.exports = Bounty;
