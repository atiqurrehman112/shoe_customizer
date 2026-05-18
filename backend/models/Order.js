const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    shoeSize: String,
    footProblem: String,
    material: String,
    soleType: String,
    address: String,

    designImage: String,
    selectedColors: Object,
    logoDecal: String,
    fullDecal: String,

    price: {
      type: Number,
      default: 5000,
    },

    orderStatus: {
      type: String,
      default: "Pending",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);