const Recipe = require('./Recipe');

class Recipes {
  constructor(recipes) {
    this.recipes = recipes;
  }

  filterByTag(tag) {
    return this.recipes.filter(recipe => recipe.tags.includes(tag));
  }

  filterByIngredient(ingredientName) {
    return this.recipes.filter(recipe => recipe.getIngredientNameList().includes(ingredientName));
  }
}

module.exports = Recipes;