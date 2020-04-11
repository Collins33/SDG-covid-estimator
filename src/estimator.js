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

/**
 * @method convertToDays
 * @summary - converts weeks and months into days
 * @param int time, string periodType
 * @returns time in minutes
 */
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

/**
 * @method severeCasesByTime
 * @summary - determines positive cases that need hospitalization
 * @param int infectionsByTime
 * @returns 15 percent of infections by time
 */
const severeCasesByTime = (infectionsByTime) => (15 / 100) * infectionsByTime;

/**
 * @method hospitalBedsByTime
 * @summary - determines available hospital cases based on severe cases
 * @param int severeCasesByRequestedTime, int totalHospitalBeds
 * @returns available hospital beds
 */
const hospitalBedsByTime = (severeCasesByRequestedTime, totalHospitalBeds) => {
  const availableBeds = (35 / 100) * totalHospitalBeds;
  return availableBeds - severeCasesByRequestedTime;
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
