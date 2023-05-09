const Recipe = require('../models/recipeModel');

const getRecipes = async (req, res) => {
    try {
        const {
            recipeName,
            includedIngredients,
            excludedIngredients,
            course,
            cuisine,
            minCalories,
            maxCalories,
            count,
            maxSodium,
            maxSugar,
            maxTotalFat,
            maxCarbohydrates,
            maxSaturatedFat
        } = req.body;

        const query = {};

        if (recipeName) {
            query.recipeName = { $regex: recipeName, $options: 'i' };
        }

        query["$and"] = [];

        if (includedIngredients && includedIngredients.length > 0) {
            query["$and"].push({
                "Ingredients.ingredient": {
                    $all: includedIngredients.map((ingredient) => ({
                        $elemMatch: {
                            ingName: { $regex: new RegExp(ingredient, "i") },
                        },
                    })),
                },
            });
        }

        if (excludedIngredients && excludedIngredients.length > 0) {
            query["$and"].push({
                "Ingredients.ingredient": {
                    $not: {
                        $elemMatch: {
                            ingName: { $regex: excludedIngredients.join("|"), $options: "i" },
                        },
                    },
                },
            });
        }


        if (course) {
            query.Course = { $regex: course, $options: 'i' };
        }

        if (cuisine) {
            query.Cuisine = { $regex: cuisine, $options: 'i' };
        }

        if (minCalories != null && maxCalories != null) {
            query['nutritionalValues.calories'] = { $gte: minCalories, $lte: maxCalories };
        }

        if (maxTotalFat != null) {
            query['nutritionalValues.totalFat'] = { $lte: maxTotalFat };
        }

        if (maxSugar != null) {
            query['nutritionalValues.sugar'] = { $lte: maxSugar };
        }

        if (maxSodium != null) {
            query['nutritionalValues.sodium'] = { $lte: maxSodium };
        }

        if (maxSaturatedFat != null) {
            query['nutritionalValues.saturateFat'] = { $lte: maxSaturatedFat };
        }

        if (maxCarbohydrates != null) {
            query['nutritionalValues.carbohydrate'] = { $lte: maxCarbohydrates };
        }

        if (count <= 0) {
            res.status(400).send('Count must be greater than 0');
        }

        const recipes = await Recipe.find(query).limit(count);
        res.status(200).json(recipes);
    } catch (error) {
        console.error(error);
        res.status(404).send('Server error');
    }
};

const createNewRecipe = async (req
    , res) => {
    try {
        const recipe = await Recipe.create({ ...req.body })
        res.status(200).json(recipe)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getRecipeById = async (req
    , res) => {
    try {
        const { _id } = req.params;
        const recipe = await Recipe.findById(_id);
        res.status(200).json(recipe);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};


module.exports = {
    getRecipes
    , createNewRecipe
    , getRecipeById
}