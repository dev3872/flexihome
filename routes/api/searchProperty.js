const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Property = require("../../models/Property");
const User = require("../../models/User");

const mailjet = require("node-mailjet").connect(
  "d10945ba5c8e323ff1ecd6e71ee62e83",
  "2d8968d215e8371399928d5ddd9ad6cc"
);

router.post("/search", async (req, res) => {
  const {
    postedBy,
    bedroom,
    constructionStatus,
    postedFor,
    propertyType,
  } = req.body;
  const property = await Property.find().populate("user");
  let propertyFilter = property;
  let propertyFilter1;
  if (propertyType[0] !== "") {
    propertyFilter = propertyFilter.filter(
      (pro) =>
        propertyType.indexOf(pro.propertyType.get("propertySubType")) !== -1
    );
  }
  if (postedFor) {
    propertyFilter = propertyFilter.filter(
      (pro) =>
        pro.listingPropertyFor.get("listingFor").localeCompare(postedFor) === 0
    );
  }
  if (postedBy) {
    propertyFilter = propertyFilter.filter((pro) => pro.postedBy === postedBy);
  }
  if (bedroom) {
    propertyFilter = propertyFilter.filter(
      (pro) => pro.propertyDetails.get("bedrooms") === bedroom
    );
  }
  if (constructionStatus) {
    propertyFilter = propertyFilter.filter(
      (pro) => pro.pricing.get("Availability") === constructionStatus
    );
  }
  res.json(propertyFilter);
});

router.post("/contactUser", auth, async (req, res) => {
  console.log(req.body);
  res.json({ works: true });
  try {
    let user = await User.findById(req.body.id);
    if (user) {
      let user1 = await User.findById(req.user.id);
      const request = mailjet.post("send", { version: "v3.1" }).request({
        Messages: [
          {
            From: {
              Email: "jsdev@student.iul.ac.in",
              Name: "FlexiAbode",
            },
            To: [
              {
                Email: user.email,
                Name: user.name,
              },
            ],
            Subject: "FlexiAbode property lookup",
            TextPart: `Hi, I am intrested in your property posted at FlexiAbode. Please contact me at ${user1.email}. Thank you.`,
            HTMLPart: `<h3>Hi, I am intrested in your property posted at FlexiAbode. Please contact me at ${user1.email}. Thank you.FlexiAbode helps you post and search properties at your ease</h3>`,
            CustomID: "AppGettingStartedTest",
          },
        ],
      });
      request
        .then((result) => {
          res.json({ success: true });
        })
        .catch((err) => {
          console.log(err.statusCode);
        });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
