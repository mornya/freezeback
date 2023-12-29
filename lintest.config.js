/** @type {import('@lintest/core/lintest').Lintest.ConsumerConfig} */
module.exports = {
  provider: 'mornya',
  exportConfig: {
    lint: '.eslintrc',
    test: 'jest.config.json',
  },
};
