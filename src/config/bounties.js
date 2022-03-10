const bountyTypes = {
  WRITING: 'writing',
  DESIGN: 'design',
  DEVELOPMENT: 'development',
  VIDEO: 'video',
  RESEARCH: 'research',
  RECRUITING: 'recruiting',
};

const bountyStates = {
  OPEN: 'open',
  CLOSED: 'closed',
  REVIEW: 'review',
};

const bountyXps = {
  BEGINNER: 10,
  MODERATE: 15,
  EXPERT: 20,
};

module.exports = {
  bountyTypes,
  bountyStates,
  bountyXps,
};
