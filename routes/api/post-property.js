const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Property = require("../../models/Property");

router.post("/submit", auth, async (req, res) => {
  const {
    user,
    listingPropertyFor,
    propertyType,
    locationDetails,
    propertyDetails,
    imageDetails,
    furnishing,
    amenities,
    pricing,
  } = req.body;

  try {
    const property = new Property({
      user: req.user.id,
      postedBy: user,
      listingPropertyFor: {},
      propertyType: {},
      locationDetails: {},
      propertyDetails: {},
      imageDetails: [],
      furnishing: [],
      amenities: [],
      pricing: {},
    });
    property.listingPropertyFor.set(
      "listingFor",
      listingPropertyFor.listingFor
    );
    switch (listingPropertyFor.listingFor) {
      case "Sell":
        property.listingPropertyFor.set(
          "reraStatus",
          listingPropertyFor.reraStatus
        );
        break;
      case "Rent":
        property.listingPropertyFor.set(
          "agreementType",
          listingPropertyFor.agreementType
        );
        property.listingPropertyFor.set(
          "family",
          listingPropertyFor.rentGroup.family
        );
        property.listingPropertyFor.set(
          "singleWomen",
          listingPropertyFor.rentGroup.singleWomen
        );
        property.listingPropertyFor.set(
          "singleMen",
          listingPropertyFor.rentGroup.singleMen
        );
        property.listingPropertyFor.set(
          "all",
          listingPropertyFor.rentGroup.all
        );
        break;
      case "PG":
        property.listingPropertyFor.set(
          "girls",
          listingPropertyFor.pgGroup.girls
        );
        property.listingPropertyFor.set(
          "boys",
          listingPropertyFor.pgGroup.boys
        );
        property.listingPropertyFor.set(
          "both",
          listingPropertyFor.pgGroup.both
        );
        break;
      case "Share":
        property.listingPropertyFor.set(
          "girls",
          listingPropertyFor.shareGroup.girls
        );
        property.listingPropertyFor.set(
          "boys",
          listingPropertyFor.shareGroup.boys
        );
        property.listingPropertyFor.set(
          "both",
          listingPropertyFor.shareGroup.both
        );
        break;
    }
    property.propertyType.set("propertyType", propertyType.propertyType);
    property.propertyType.set("propertySubType", propertyType.propertySubType);
    property.locationDetails.set("defState", locationDetails.defState);
    property.locationDetails.set("defCity", locationDetails.defCity);
    property.locationDetails.set("projectName", locationDetails.projectName);
    property.locationDetails.set("address", locationDetails.address);
    property.locationDetails.set("locality", locationDetails.locality);
    property.locationDetails.set("pincode", locationDetails.pincode);
    property.propertyDetails.set(
      "superBuiltUpArea",
      propertyDetails.superBuiltUpArea
    );
    property.propertyDetails.set("builtUpArea", propertyDetails.builtUpArea);
    property.propertyDetails.set("carpetArea", propertyDetails.carpetArea);
    property.propertyDetails.set("unit", propertyDetails.unit);
    property.propertyDetails.set(
      "bedrooms",
      propertyDetails.roomCount.bedrooms
    );
    property.propertyDetails.set(
      "bathrooms",
      propertyDetails.roomCount.bathrooms
    );
    property.propertyDetails.set(
      "balconies",
      propertyDetails.roomCount.balconies
    );
    property.propertyDetails.set(
      "poojaRoom",
      propertyDetails.roomCount.poojaRoom
    );
    property.propertyDetails.set(
      "studyRoom",
      propertyDetails.roomCount.studyRoom
    );
    property.propertyDetails.set(
      "serventRoom",
      propertyDetails.roomCount.serventRoom
    );
    property.propertyDetails.set(
      "reservedParking",
      propertyDetails.reservedParking
    );
    property.propertyDetails.set("parkingCount", propertyDetails.parkingCount);
    property.propertyDetails.set(
      "constructionCount",
      propertyDetails.constructionCount
    );
    property.propertyDetails.set(
      "propertyOnFloor",
      propertyDetails.propertyOnFloor
    );
    property.imageDetails = [...imageDetails.map((image) => image.preview)];
    property.furnishing = [...furnishing];
    property.amenities = [...amenities];
    property.pricing.set("Availability", pricing.Availability);
    property.pricing.set("Ownership", pricing.Ownership);
    property.pricing.set("Maintenence", pricing.Maintenence);
    property.pricing.set("MembershipCharge", pricing.MembershipCharge);
    property.pricing.set("BookingAmount", pricing.BookingAmount);
    property.pricing.set("AnnualDuesPayable", pricing.AnnualDuesPayable);
    property.pricing.set("ExpectedRental", pricing.ExpectedRental);
    property.pricing.set("ExpectedPrice", pricing.ExpectedPrice);
    const res_property = await property.save();
    res.json(res_property);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
