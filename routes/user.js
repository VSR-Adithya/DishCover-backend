const express = require('express')

// controller functions
const { signupUser, loginUser, getSavedRecipes, saveRecipe, getUserDetails, removeSavedRecipe, updateUserDetails } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// update user details route
router.patch('/updateUserDetails', updateUserDetails)

// get saved recipes id route
router.get('/savedRecipes', getSavedRecipes)

// save a recipe route
router.post('/saveRecipe', saveRecipe)

// remove a saved recipe route
router.post('/removeSavedRecipe', removeSavedRecipe)

// get user route
router.post('/getUser', getUserDetails)

module.exports = router