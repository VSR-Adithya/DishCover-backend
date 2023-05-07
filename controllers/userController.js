const User = require('../models/userModel')
const Recipe = require('../models/recipeModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const {username, password} = req.body

  try {
    const user = await User.login(username, password)

    // create a token
    const token = createToken(user._id)
    const savedRecipes = user.savedRecipes;

    res.status(200).json({username, token, savedRecipes})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// update user details
const updateUserDetails = async (req, res) => {
  const { ...userInfo } = req.body
  try {
    // get user from userinfo
    let username = userInfo.username;

    // find user in database
    let user = await User.findOne({username});

    // update user details
    user.firstName = userInfo.firstName;
    user.lastName = userInfo.lastName;
    user.dob = userInfo.dob;
    user.sex = userInfo.sex;
    user.height = userInfo.height;
    user.weight = userInfo.weight;
    user.bloodGrp = userInfo.bloodGrp;
    user.activityLevel = userInfo.activityLevel;
    user.isVeg = userInfo.isVeg;
    user.diabetic = userInfo.diabetic;
    user.lactoseIntolerance = userInfo.lactoseIntolerance;
    user.highBloodPressure = userInfo.highBloodPressure;
    user.heartDisease = userInfo.heartDisease;
    user.kidneyDisease = userInfo.kidneyDisease;
    user.allergy = userInfo.allergy;

    // save user
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}

// signup a user
const signupUser = async (req, res) => {
  const userInfo = req.body

  try {
    const user = await User.signup(userInfo)

    // create a token
    const username = user.username;
    const token = createToken(user._id);
    const savedRecipes = user.savedRecipes;

    res.status(200).json({username: user.username, token, savedRecipes})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// Get saved recipes by user
const getSavedRecipes = async (req, res) => {
  const {username} = req.body;

  try {
    const user = await User.findOne({username});
    if (!user) {
      return res.status(404).json({error: 'User not found'});
    }

    const savedRecipes = await Recipe.find({_id: {$in: user.savedRecipes}});
    res.status(200).json( savedRecipes );
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}

// Save a recipe for a user
const saveRecipe = async (req, res) => {
  const { username, _id } = req.body;

  try {
    // Check if user exists in the database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if recipe is already saved by the user
    if (user.savedRecipes.includes(_id)) {
      return res.status(409).json({ error: 'Recipe already saved by the user' });
    }

    // Check if recipe exists in the database
    const savedRecipe = await Recipe.findById(_id);
    if (!savedRecipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    // Add recipe ID to user's savedRecipes array
    user.savedRecipes.push(_id);
    await user.save();

    res.status(200).json( savedRecipe );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const removeSavedRecipe = async (req, res) => {
  const { username, _id } = req.body;

  try {
    // Check if user exists in the database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // check if recipe exists in the database
    const savedRecipe = await Recipe.findById(_id);
    if (!savedRecipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    // Remove recipe ID from user's savedRecipes array
    user.savedRecipes = user.savedRecipes.filter((recipe) => recipe !== _id);
    await user.save();
    

  } catch (error) { 
    res.status(500).json({ error: error.message });
  }
}

const getUserDetails = async (req, res) => {
  const { username } = req.body

  try {
      const user = await User.findOne({ username })
      res.status(200).json(user)
  } catch (error) {
      res.status(400).json({ error: error.message })
  }
}

module.exports = { signupUser, loginUser, getSavedRecipes, saveRecipe, getUserDetails,removeSavedRecipe, updateUserDetails }