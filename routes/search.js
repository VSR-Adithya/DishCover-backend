const express = require('express')

// controller functions
const { getRecipes, createNewRecipe, getRecipeById } = require('../controllers/recipeController')

const router = express.Router()

// search route
router.post('/getRecipes', getRecipes)

// create new recipe route
router.post('/create', createNewRecipe)

// get recipe by id
router.get('/getRecipeByID/:_id', getRecipeById)

module.exports = router

