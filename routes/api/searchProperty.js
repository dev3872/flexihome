const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Property = require("../../models/Property");

router.post("/search", async (req, res) => {
  const {
    postedBy,
    bedroom,
    constructionStatus,
    postedFor,
    propertyType,
  } = req.body;
  const property = await Property.find();
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

module.exports = router;
