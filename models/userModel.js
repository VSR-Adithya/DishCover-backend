const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    unmodifiable: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    unmodifiable: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  sex: {
    type: String,
    required: true
  },
  height: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  bloodGrp: {
    type: String,
  },
  activityLevel: {
    type: String,
  },
  isVeg: {
    type: Boolean,
    default: false
  },
  diabetic: {
    type: Boolean,
    default: false
  },
  lactoseIntolerance: {
    type: Boolean,
    default: false
  },
  highBloodPressure: {
    type: Boolean,
    default: false
  },
  heartDisease: {
    type: Boolean,
    default: false
  },
  kidneyDisease: {
    type: Boolean,
    default: false
  },
  allergy: {
    type: String,
  },
  //  array of saved recipes id
  savedRecipes: {
    type: Array,
    default: []
  },
})

// static signup method
userSchema.statics.signup = async function(userInfo) {
  const {
    email,
    username,
    password,
    firstName,
    lastName,
    dob,
    sex,
    height,
    weight,
    bloodGrp,
    activityLevel,
    isVeg,
    diabetic,
    lactoseIntolerance,
    highBloodPressure,
    heartDisease,
    kidneyDisease,
    allergy,
  } = userInfo;

  // Validate email field
  if (!validator.isEmail(email)) {
    throw new Error('Please provide a valid email address');
  }

  // Validate password field
  if (!password) {
    throw new Error('Please provide a password');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user document
  const user = new this({
    email,
    username,
    password: hashedPassword,
    firstName,
    lastName,
    dob,
    sex,
    height,
    weight,
    bloodGrp,
    activityLevel,
    isVeg,
    diabetic,
    lactoseIntolerance,
    highBloodPressure,
    heartDisease,
    kidneyDisease,
    allergy,
    savedRecipes: [],
  });

  // Save the user document
  await user.save();

  return user;
};

// static login method
userSchema.statics.login = async function (username, password) {
  // Validate username field
  if (!username) {
    throw new Error('Please provide a username')
  }

  // Validate password field
  if (!password) {
    throw new Error('Please provide a password')
  }

  const user = await this.findOne({ username })
  if (!user) {
    throw new Error('Incorrect username')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw new Error('Incorrect password')
  }

  return user
}

module.exports = mongoose.model('User', userSchema)