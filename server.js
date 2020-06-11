const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan")

const PORT = process.env.PORT || 3000;

const db = require("./models/exercise.js");

const path = require('path');

const app = express();

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", {
  useNewUrlParser: true,});


// get requests   

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});
app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/exercise.html"));
});
app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/stats.html"));
});

// get request for last 7 days
app.get("/api/workouts/range", (req, res) => {
  db.find({})
  .limit(7)
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.json(err);
  });
});

//call to create new workout

// get a workout by id and then push an excercise to the array
app.put("/api/workouts/:id", ({body, params}, res) => {
  db.findByIdAndUpdate(params.id, {$push: {exercises: body}}, {new: true, runValidators: true})
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.json(err);
  })
});

// function to post a workout
app.post("/api/workouts", (req, res) => {
  db.create({})
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.json(err);
  });
});

app.listen(PORT, () => {
console.log(`App running on port ${PORT}!`);
});