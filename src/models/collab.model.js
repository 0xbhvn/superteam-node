const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { collabStates } = require('../config/collabs');
const { userSkills } = require('../config/users');

const collabSchema = mongoose.Schema(
  {
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    period: {
      type: Number,
    },
    skills: [
      {
        type: String,
        enum: Object.values(userSkills),
      },
    ],
    status: {
      type: String,
      enum: Object.values(collabStates),
      default: collabStates.OPEN,
    },
    members: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
collabSchema.plugin(toJSON);
collabSchema.plugin(paginate);

collabSchema.pre('save', async function (next) {
  const collab = this;
  next();
});

/**
 * @typedef Collab
 */
const Collab = mongoose.model('Collab', collabSchema);

module.exports = Collab;
