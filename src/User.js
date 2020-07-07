const users = require('./data/users');
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


}

module.exports = Users;