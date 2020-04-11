// Expected data
// {
//   region: {
//   name: "Africa",
//   avgAge: 19.7,
//   avgDailyIncomeInUSD: 5,
//   avgDailyIncomePopulation: 0.71
//   },
//   periodType: "days",
//   timeToElapse: 58,
//   reportedCases: 674,
//   population: 66622705,
//   totalHospitalBeds: 1380614
//   }

const covid19ImpactEstimator = (data) => {
  // get the days
  const { reportedCases } = data;
  // calculate the currently infected for impact and severe
  const impactCurrentlyInfected = reportedCases * 10;
  const severeCurrentlyInfected = reportedCases * 10;

  // calculate the infectionsByRequestedTime
  let days;
  const factor = Math.round(days / 3);
  const multiplier = 2 ** factor;
  const impactInfectionsByRequestedTime = impactCurrentlyInfected * multiplier;
  const severeInfectionsByRequestedTime = severeCurrentlyInfected * multiplier;

  const output = {
    data: {}, // the input data you got
    impact: {
      impactCurrentlyInfected,
      impactInfectionsByRequestedTime
    }, // your best case estimation
    severeImpact: {
      severeCurrentlyInfected,
      severeInfectionsByRequestedTime
    } // your severe case estimation
  };
  return output;
};

export default covid19ImpactEstimator;
