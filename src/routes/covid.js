const express = require('express');

const router = express.Router();
const covidController = require('../controllers/covid');


router.get('/', covidController.disease_estimator);


module.exports = router;
