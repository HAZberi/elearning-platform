const mongoose = require('mongoose');
const validator = require('validator');
const bycrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please tell us your name'],
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please enter a valid email address.'],
    },
    photo: {
      type: String,
    },
    password: {
      type: String,
      required: [true, 'Please enter an eight character password'],
      minlength: [8, 'Minimum password length is 8 characters.'],
      select: false,
    },
    role: {
      type: String,
      enum: {
        values: ['instructor', 'subscriber', 'admin'],
      },
      default: 'subscriber',
    },
    stripe_account_id: {
      type: String,
    },
    stripe_seller: {
      type: String,
    },
    stripe_session: {
      type: String,
    },
  },
  { timestamps: true }
);

//-----------------Pre Save Middlewares-------------------//
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bycrypt.hash(this.password, 12);

  next();
});

//----------------Custom Methods on Model------------------//
userSchema.methods.correctPassword = async function (
  enteredPassword,
  encryptedPassword
) {
  return await bycrypt.compare(enteredPassword, encryptedPassword);
};

module.exports = mongoose.model('User', userSchema);
