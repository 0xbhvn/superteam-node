const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { bountyTypes } = require('../config/bounties');

const bountySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: [
        bountyTypes.WRITING,
        bountyTypes.DESIGN,
        bountyTypes.DEVELOPMENT,
        bountyTypes.VIDEO,
        bountyTypes.RESEARCH,
        bountyTypes.RECRUITING,
      ],
      required: true,
    },
    prize: {
      type: Number,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    creator: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
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
