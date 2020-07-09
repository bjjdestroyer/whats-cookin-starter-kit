const fullIngredientsList = require('../data/ingredients');
const allRecipes = require('../data/recipes');
const Recipe = require('./Recipe');

class Recipes {
  constructor() {
    this.recipes = allRecipes;
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
  }

  filterByIngredient(ingredientName) {
    const ingredientNeeded = fullIngredientsList.find( ingredient => {
      return ingredient.name === ingredientName;
    });
    console.log(ingredientNeeded);

    let recipeArray = []

    this.recipes.forEach( recipe => {
      recipe.ingredients.forEach( ingredient => {
        if (ingredientNeeded === undefined) {
          return 'No recipe has that ingredient';
        } else if (ingredient.id === ingredientNeeded.id) {
          recipeArray.push(recipe);
        }
      });
    });

    return recipeArray;
    // search by only part of ingredient name?
  }
}

module.exports = Recipes;