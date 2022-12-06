'use strict';

const argon2 = require('argon2');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { isEmail, isPhone } = require('../utils/validator');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 100,
      trim: true,
      uppercase: true,
      required: true,
      match: /^(?!\s*$).+/,
    },
    email: {
      type: String,
      minlength: 5,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
      index: {
        unique: true,
        dropDups: true,
      },
      validate: isEmail,
    },
    username: {
      type: String,
      minlength: 5,
      trim: true,
      unique: true,
      lowercase: true,
      required: true,
      index: {
        unique: true,
        dropDups: true,
      },
    },
    password: {
      type: String,
      trim: true,
      minlength: 8,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    phone: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "User phone number required"],
      index: {
        unique: true,
        dropDups: true,
      },
      validate: isPhone,
    },
    roles: {
      type: String,
      enum: ["Super Admin", "Admin", "User"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidator);

userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await argon2.hash(this.password);
    this.password = hashed;
  } catch (err) {
    return next(err);
  }
});

userSchema.pre('findOneAndUpdate', async function (next) {
  try {
    if (this._update.password) {
      const docToUpdate = await this.model.findOne(this.getQuery());
      const match = await argon2.verify(docToUpdate.password, this._update.password);
      if (match) {
        this._update.password = this.password;
      }
      const hashed = await argon2.hash(this._update.password);
      this._update.password = hashed;
    }
    
    next();
  } catch (err) {
    return next(err);
  }
});


module.exports = mongoose.model("Users", userSchema);
