const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const collabSchema = mongoose.Schema(
  {
    bounty: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Bounty',
      required: true,
    },
    members: {
      type: Number,
      required: true,
      default: 1,
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    link: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
    },
    ratio: {
      type: String,
    },
    source: {
      file: {
        type: Buffer,
        required: true,
      },
      filename: {
        type: String,
        required: true,
      },
      mimetype: {
        type: String,
        required: true,
      },
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
