const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const covidRoutes = require("./src/routes/covid");

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