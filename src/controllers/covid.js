// const covid19ImpactEstimator = require('../estimator');

/**
 * @method disease_estimator
 * @summary - estimate the covid numbers
 * @param request body, response body
 * @returns json message
 */

exports.disease_estimator = (req, res) => {
  res.status(200).json({
    message: 'we are here'
  });
};
