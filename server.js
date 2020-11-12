const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");
const port = 4000;
const app = express();

//connect Database
connectDB();

// Init Middleware
app.use(express.json());

// Define Routes
app.use("/api/users", users);
app.use("/api/auth", auth);

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
