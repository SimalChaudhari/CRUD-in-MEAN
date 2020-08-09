const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  // username: {type: String, required: true},
  firstname : { type: String, required: true },
  lastname : { type: String, required: true },
  email: { type: String, required: true },
  // password: { type: String, required: true },
  role: { type: String, require: true, enum: ['Artist','Designer','Art Manager'] },
  image: { type: String, default: null },
  status: { type: Number, default: 1, enum: [1, 0] },
  is_deleted: { type: Number, default: 0, enum: [1, 0] },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
});

// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);