const Recipe = require('./Recipe');

class Recipes {
  constructor(recipes) {
    this.recipes = recipes;
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
    return this.recipes.filter(recipe => recipe.getIngredientNameList().includes(ingredientName));
  }
}

module.exports = Recipes;