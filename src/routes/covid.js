const express = require('express');

const router = express.Router();
const covidController = require('../controllers/covid');


router.post('/', covidController.disease_estimator);


module.exports = router;
