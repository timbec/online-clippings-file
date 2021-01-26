const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const Link = require("./models/Link");

mongoose
  .connect("mongodb://localhost/linkrApp", { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Mongo Connection Open");
  })
  .catch(err => {
    console.log("MONGO CONNECTION ERROR!");
    console.log(err);
  });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/links", async (req, res) => {
  const links = await Link.find({});
  console.log(links);
  res.render("links/index", { links });
});

app.get("/links/new", async (req, res) => {
  res.render("links/new");
});

app.post("/links", async (req, res) => {
  const link = new Link(req.body.link);
  await link.save();

  res.redirect(`/links`);
});

app.get("/links/:id", async (req, res) => {
  const link = await Link.findById(req.params.id);
  res.render("links/link", { link });
});

app.listen(3000, () => {
  console.log("Serving on port 3000");
});
