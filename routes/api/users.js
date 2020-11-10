const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");

// @route    GET api/users
// @desc     Test api
// @access   Public
router.get("/", (req, res) => {
  console.log("server to client connected");
  res.send({ data: "client to server connected" });
});

module.exports = router;
