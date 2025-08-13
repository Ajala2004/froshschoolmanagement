const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  email: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  ratedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Rating", ratingSchema);