module.exports = {
  default: {
    featuresPath: ['./tests/BDD/*.feature'],
    requirePath: ['./tests/BDD/steps/*.js'],
    format: [
      'progress',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json'
    ],
    parallel: 1,
    retry: 0,
    strict: true
  }
};