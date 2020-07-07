const Recipe = require('../Recipe');

class Recipes {
  constructor(recipes) {
    this.recipes = recipes;
  }

  filterRecipesByTag(tag) {
    return this.recipes.filter(recipe => recipe.tags.includes(tag));
  }
}