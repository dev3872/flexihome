const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  postedBy: {
    type: String,
  },
  listingPropertyFor: {
    type: Map,
  },
  propertyType: {
    type: Map,
  },
  locationDetails: {
    type: Map,
  },
  propertyDetails: {
    type: Map,
  },
  imageDetails: [
    {
      type: String,
    },
  ],
  furnishing: [
    {
      type: String,
    },
  ],
  amenities: [
    {
      type: String,
    },
  ],
  pricing: {
    type: Map,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("property", PropertySchema);
