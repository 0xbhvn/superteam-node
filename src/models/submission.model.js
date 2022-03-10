const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const submissionSchema = mongoose.Schema(
  {
    bounty: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Bounty',
      required: true,
    },
    collab: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Collab',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
submissionSchema.plugin(toJSON);
submissionSchema.plugin(paginate);

submissionSchema.pre('save', async function (next) {
  const submission = this;
  next();
});

/**
 * @typedef Submission
 */
const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;
