const mongoose = require("mongoose");
const express = require("express");

const app = express();
const path = require("path");

mongoose
  .connect("mongodb://localhost/linkrApp", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Mongo Connection Open");
  })
  .catch(err => {
    console.log("MONGO CONNECTION ERROR!");
    console.log(err);
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000, () => {
  console.log("Serving on port 3000");
});
