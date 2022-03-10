const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { collaboratorStates, collaboratorSkills } = require('../config/collaborators');

const collaboratorSchema = mongoose.Schema(
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
    status: {
      type: String,
      enum: Object.values(collaboratorStates),
      default: collaboratorStates.REQUESTED,
      required: true,
    },
    skill: {
      type: String,
      enum: Object.values(collaboratorSkills),
      required: true,
      trim: true,
    },
    loggedHours: {
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
collaboratorSchema.plugin(toJSON);
collaboratorSchema.plugin(paginate);

collaboratorSchema.pre('save', async function (next) {
  const collaborator = this;
  next();
});

/**
 * @typedef Collaborator
 */
const Collaborator = mongoose.model('Collaborator', collaboratorSchema);

module.exports = Collaborator;
