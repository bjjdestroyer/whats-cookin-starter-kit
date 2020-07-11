const fullIngredientsList = require('../data/ingredients');
const recipeData = require('../data/recipes');
const Recipe = require('./Recipe');

class Recipes {
  constructor() {
    this.recipes = recipeData;
  }

  filterByTag(tag) {
    return this.recipes.filter(recipe => {
      if (tag !== "") {
        return recipe.tags.includes(tag)
      } else {
        const noTag = recipe.id === 562334;
        return noTag;
      }
    });
  };

  getAllIngredients(ingredientName) {
    const ingredientNeeded = fullIngredientsList.filter(ingredient => {
      if (ingredient.name === undefined) {
        return;
      } else if (ingredient.name.includes(ingredientName)) {
        return ingredient;
      }
    });

    return ingredientNeeded;
  };

  filterByIngredient(ingredientName) {
    const ingredientNeeded = this.getAllIngredients(ingredientName);

    let recipeArray = []

    this.recipes.forEach( recipe => {
      recipe.ingredients.forEach( ingredient => {
        if (ingredientNeeded === []) {
          return;
        }
        ingredientNeeded.forEach(needIngredient => {
          if (ingredient.id === needIngredient.id) {
            recipeArray.push(recipe);
          }
        })
      });
    });

    return recipeArray;
  }
}

if(typeof(module) !== 'undefined') {
  module.exports = Recipes;
}
