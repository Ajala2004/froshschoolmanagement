const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Personal Information
  surname: { type: String, required: true },
  lastName: { type: String, required: true },
  state: { type: String, required: true },
  lga: { type: String, required: true }, // Local Government Area
  homeAddress: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true },

  // CAC (Corporate Affairs Commission) Registration Details
  cacRegistrationName: { type: String, default: null },
  cacRegistrationNumber: { type: String, default: null },

  // Authentication
  password: { type: String, required: true }, // Store hashed passwords for security

  // Profile Details
  profilePictureUrl: { type: String, default: null }, // URL for uploaded profile picture
  drivingLicenseUrl: { type: String, default: null }, // URL for uploaded driving license
  aboutMe: { type: String, default: null }, // Short bio or description
  skill: { type: String, default: null }, // Short bio or description
  // Metadata
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },

  // Profile completion tracker
  isProfileComplete: { type: Boolean, default: false }, // Indicates if all optional fields are filled
  approved: { type: Boolean, default: false },
  userStatus: { type: String, enum: ["admin", "serviceprovider"], default: "serviceprovider" },
  rating: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },

});
 
module.exports = mongoose.model('User', userSchema);