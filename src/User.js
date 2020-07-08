const users = require('../data/users');
const Pantry = require('./Pantry');
const Recipe = require('./Recipe');
const Recipes = require('./Recipes');

class User {
  constructor(userObj) {
    this.pantry = userObj.pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }
  filterRecipes(recipesToFilter, tag) {
    return recipesToFilter.filter(recipe => recipe.tags.includes(tag));
  }

  searchRecipes(userInput) {
    this.favoriteRecipes.filter( recipe => {
      if (recipe.name === userInput) {
        return recipe;
      } else if (recipe.getIngredientNameList().includes(userInput)) {
        return recipe;
      }
    });
  }

  searchPantry(recipe) {
    recipe.ingredients.filter( ingredient => {
      if (this.pantry.includes(!ingredient)) {
        return ingredient;
      }
    });

    // need to check to see if recipe ingredient is in pantry;
    // if statement to see if ingredient isn't in the pantry
    // return ingredient if it's not in the pantry
  }

  checkForIngredients(recipe) {
    // Checking to see if you have the right amount of ingredients for a recipe
    recipe.ingredients.filter( ingredient => {
      for (let i = 0; i < this.pantry.length; i++) {
        if (this.pantry.includes(ingredient) && ingredient.amount > this.pantry[i].amount) {
          let amountNeeded = ingredient.amount - this.pantry[i].amount;
          return `You need ${amountNeeded} more of ${ingredient.name} to make ${recipe}.`;
        }

      }
    });
  }

  shopForIngredients() {
    // ingredients needed and cost
    // round up for non-integers?
  }
}

module.exports = User;