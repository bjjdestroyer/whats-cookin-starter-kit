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

  searchPantry() {

  }

  checkForIngredients() {

  }

  shopForIngredients() {
    
  }
}

module.exports = User;