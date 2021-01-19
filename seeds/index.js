const mongoose = require("mongoose");
const { titles, urls, descriptions } = require("./seedHelpers");
const Link = require("../models/Link");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Link.deleteMany({});
  for (let i = 0; i < 10; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const link = new Link({
      title: `${titles[random1000]}`,
      url: `${urls[random1000]}`,
      description: `${descriptions[random1000]}`
    });
    await link.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
