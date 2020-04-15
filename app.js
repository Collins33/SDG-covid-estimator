const express = require("express");
const app = express();
const morgan = require("morgan");
const fs = require('fs');
const path =  require('path');
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const covidRoutes = require("./src/routes/covid");

/* eslint-disable no-underscore-dangle, no-console */
const directoryName = path.resolve();
global.basedir = directoryName;
/* eslint-disable no-underscore-dangle, no-console */

if (!fs.existsSync(path.join(directoryName, 'logs/requests.log'))) {
  fs.mkdirSync('logs');
}

// create a write stream (in append mode)
const requestsLogStream = fs.createWriteStream(path.join(directoryName, 'logs/requests.log'), { flags: 'a+' });
morgan.token('response-time-ms', function getResponse(req, res) {
  const time = this['response-time'](req, res, 0) < 10 ? `0${this['response-time'](req, res, 0)}ms` : `${this['response-time'](req, res, 0)}ms`;
  return time;
});
app.use(morgan(':method\t:url\t:status\t:response-time-ms', { stream: requestsLogStream }));

/**
 * Give access control
 * to any client
 */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/api/v1/on-covid-19/", covidRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Covid tracker"
  });
});

module.exports = app;