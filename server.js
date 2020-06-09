const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan")

const PORT = process.env.PORT || 3000;

const db = require("./models/exercise");

const path = require('path');

const app = express();

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/exercise", {
  useNewUrlParser: true,});



app.listen(PORT, () => {
console.log(`App running on port ${PORT}!`);
});