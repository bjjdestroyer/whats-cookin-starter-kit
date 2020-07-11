// const ingredientsData = require('../data/ingredients');
// const { forEach } = require('../data/users');

class Recipe {
  constructor(recipe) {
    this.id = recipe.id;
    this.image = recipe.image;
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions;
    this.name = recipe.name;
    this.tags = recipe.tags
  }

  getIngredientPrice(id) {
    let ingredientPrice;
    ingredientsData.forEach(ingredient => {
      if (ingredient.id === id) {
        return ingredientPrice = ingredient.estimatedCostInCents;
      }
    })
    return ingredientPrice;
  }

  getIngredientNameList(ingredients) {
    let ingredientIds = this.ingredients.map(ingredient => {
      return ingredient.id;
    })
    let ingredientObjects = ingredientIds.map(id => {
      return ingredientsData.find(ingredient => {
        return id === ingredient.id;
      });
    });
    return ingredientObjects.map(ingredient => {
      return ingredient.name;
    })
  }

  getTotalIngredientCost() {
    return this.ingredients.reduce((totalPrice, ingredient) => {
      const ingredientAmount = ingredient.quantity.amount;
      const ingredientPrice = this.getIngredientPrice(ingredient.id);
      const ingredientTotal = ingredientAmount * ingredientPrice;

      return totalPrice + ingredientTotal;
    }, 0)
  }

  returnRecipeInstructions() {
    return this.instructions;
  }
}

if (typeof(module) !== 'undefined') {
  module.exports = Recipe;
}
