module.exports = {
  default: {
    paths: ['tests/BDD/*.feature'],
    require: ['tests/BDD/steps/*.js'],
    format: ['progress', 'html:cucumber-report.html']
  }
};