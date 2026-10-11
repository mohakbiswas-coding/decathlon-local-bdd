module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: [
      'support/**/*.ts',
      'step-definitions/**/*.ts'
    ],
    paths: [
      'features/**/*.feature'
    ],
    format: [
      'progress',
      'html:reports/cucumber-report.html'
    ]
  }
};
