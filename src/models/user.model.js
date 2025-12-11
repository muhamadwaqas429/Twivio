import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Schema describing the structure of a user document
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true, // enables faster search by username
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true, // fullname may be used in search
    },

    avatar: {
      type: String,
      required: true, // profile image URL
    },

    coverImage: {
      type: String, // optional profile cover image
    },

    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video", // list of videos user has watched
      }
    ],

    password: {
      type: String,
      required: true,
    },

    refreshToken: {
      type: String, // stored refresh token
    },
  },
  {
    timestamps: true, // automatically adds createdAt + updatedAt
  }
);

// Hash password before saving user
userSchema.pre("save", async function (next) {
  // Only hash password if modified
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare user-entered password with hashed password
userSchema.methods.isPasswordCorrect = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Generate short-lived access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      fullname: this.fullname,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

// Generate refresh token used to request a new access token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
