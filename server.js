const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");
const postProperty = require("./routes/api/post-property");
const searchProperty = require("./routes/api/searchProperty");
const port = 4000;
const app = express();

//connect Database
connectDB();

// Init Middleware
app.use(express.json());

// Define Routes
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/postProperty", postProperty);
app.use("/api/searchProperty", searchProperty);

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(process.env.PORT || port, (err) => {
  if (!err) {
    console.log(`Server started at port ${port}`);
  } else {
    console.log(err);
  }
});
