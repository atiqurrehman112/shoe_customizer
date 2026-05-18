const mongoose = require("mongoose");

const designSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    designImage: String,
    selectedColors: Object,
    logoDecal: String,
    fullDecal: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Design", designSchema);