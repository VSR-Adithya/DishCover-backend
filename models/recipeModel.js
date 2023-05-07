const mongoose = require('mongoose')

const Schema = mongoose.Schema

const recipeScheme = new Schema({
    RecipeID: {
        type: String,
        required: true,
        unique: true
    },
    recipeName: {
        type: String,
    },
    Course: {
        type: String,
        required: true,
    },
    Cuisine: {
        type: String,
        required: true,
    },
    Servings: {
        type: String,
    },
    recipeURL: {
        type: String,
        required: true,
    },
    contributorID: {
        type: String,
        required: true,
    },
    contributorName: {
        type: String,
        required: true,
    },
    SubmittedDate: {
        type: Date,
        required: true,
    },
    Tags: {
        type: Array,
        of: String,
    },
    Time: {
        prepTime: {
            type: String,
        },
        cookTime: {
            type: String,
        },
        totalTime: {
            type: String,
        },
    },
    nutritionalValues: {
        calories: {
            type: Number,
        },
        totalFat: {
            type: Number,
        },
        sugar: {
            type: Number,
        },
        sodium: {
            type: Number,
        },
        saturateFat: {
            type: Number,
        },
        carbohydrate: {
            type: Number,
        },
    },
    image: {
        type: String,
    },
    Description: {
        type: String,
        trim: true,
    },
    Ingredients: {
        ingredient: [{
            ingName: {
                type: String
            },
            ingAmount: {
                type: String
            },
        }]
    },
    Instructions: {
        type: Array,
        of: String,
    },
},)

module.exports = mongoose.model('Recipe', recipeScheme)