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

const convertToDays = (time, periodType) => {
  if (periodType === 'days') {
    return time;
  }
  if (periodType === 'weeks') {
    return time * 7;
  }
  if (periodType === 'months') {
    return time * 30;
  }

  return time;
};

const severeCasesByTime = (infectionsByTime) => (15 / 100) * infectionsByTime;

const hospitalBedsByTime = (severeCasesByRequestedTime, totalHospitalBeds) => {
  const availableBeds = (35 / 100) * totalHospitalBeds;
  return Math.floor(availableBeds) - severeCasesByRequestedTime + 1;
};


const covid19ImpactEstimator = (data) => {
  const {
    reportedCases, timeToElapse, periodType, totalHospitalBeds
  } = data;
  // calculate the currently infected for impact and severe
  const impactCurrentlyInfected = reportedCases * 10;
  const severeCurrentlyInfected = reportedCases * 50;

  // calculate the infectionsByRequestedTime
  const timeComputation = convertToDays(timeToElapse, periodType);
  const factor = Math.floor(timeComputation / 3);
  const multiplier = 2 ** factor;
  const impactInfectionsByRequestedTime = impactCurrentlyInfected * multiplier;
  const severeInfectionsByRequestedTime = severeCurrentlyInfected * multiplier;

  const impactSevereCasesByRequestedTime = severeCasesByTime(impactInfectionsByRequestedTime);
  const severeImpactSevereCasesByRequestedTime = severeCasesByTime(severeInfectionsByRequestedTime);

  const impactHospitalBedsByRequestedTime = hospitalBedsByTime(
    impactSevereCasesByRequestedTime,
    totalHospitalBeds
  );
  const severeHospitalBedsByRequestedTime = hospitalBedsByTime(
    severeImpactSevereCasesByRequestedTime,
    totalHospitalBeds
  );

  const output = {
    data: {}, // the input data you got
    impact: {
      currentlyInfected: impactCurrentlyInfected,
      infectionsByRequestedTime: impactInfectionsByRequestedTime,
      severeCasesByRequestedTime: impactSevereCasesByRequestedTime,
      hospitalBedsByRequestedTime: impactHospitalBedsByRequestedTime
    }, // your best case estimation
    severeImpact: {
      currentlyInfected: severeCurrentlyInfected,
      infectionsByRequestedTime: severeInfectionsByRequestedTime,
      severeCasesByRequestedTime: severeImpactSevereCasesByRequestedTime,
      hospitalBedsByRequestedTime: severeHospitalBedsByRequestedTime
    } // your severe case estimation
  };
  return output;
};

export default covid19ImpactEstimator;
