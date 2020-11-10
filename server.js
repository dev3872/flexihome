const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

connectDB();

const port = 4000;
const app = express();

app.get("/", (req, res) => {
  res.json({
    Message: "This is working",
  });
});

app.listen(port, (err) => {
  if (!err) {
    console.log(`Server started at port ${port}`);
  } else {
    console.log(err);
  }
});
