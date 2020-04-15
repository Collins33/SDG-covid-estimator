const express = require('express');

const router = express.Router();
const covidController = require('../controllers/covid');


router.post('/', covidController.disease_estimator);
router.post('/json', covidController.disease_estimator);
router.post('/xml', covidController.disease_estimator_xml);
router.get('/logs', covidController.get_logs);


module.exports = router;
