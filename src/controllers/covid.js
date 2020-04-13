const xml2 = require('xml2js');
const covid19ImpactEstimator = require('../estimator');
/**
 * @method disease_estimator
 * @summary - estimate the covid numbers
 * @param request body, response body
 * @returns json message
 */

exports.disease_estimator = (req, res) => {
  const {
    region: {
      name,
      avgAge,
      avgDailyIncomeInUSD,
      avgDailyIncomePopulation
    },
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds
  } = req.body;
  const data = {
    region: {
      name,
      avgAge,
      avgDailyIncomeInUSD,
      avgDailyIncomePopulation
    },
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds
  };
  const response = covid19ImpactEstimator(data);
  res.status(200).json(response);
};


exports.disease_estimator_xml = (req, res) => {
  const {
    region: {
      name,
      avgAge,
      avgDailyIncomeInUSD,
      avgDailyIncomePopulation
    },
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds
  } = req.body;
  const data = {
    region: {
      name,
      avgAge,
      avgDailyIncomeInUSD,
      avgDailyIncomePopulation
    },
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds
  };

  const xmlBuilder = new xml2.Builder({
    renderOpts: { pretty: true }
  });

  const xmlResponse = covid19ImpactEstimator(data);
  res.status(200).type('application/xml').send(xmlBuilder.buildObject(xmlResponse));
};
