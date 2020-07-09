const fullIngredientsList = require('../data/ingredients');
const { forEach } = require('../data/users');

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
    fullIngredientsList.forEach(ingredient => {
      if (ingredient.id === id) {
        ingredientPrice = ingredient.estimatedCostInCents;
        break;
      }
    })
    return ingredientPrice;
  }

  getIngredientNameList() {
    let ingredientIds = this.ingredients.map(ingredient => {
      return ingredient.name;
    });
    return ingredientIds.map(id => {
      fullIngredientsList.forEach(ingredient => {
        if (ingredient.id === id) {
          return ingredient.name;
        }
      })
    })
  }

  getTotalIngredientCost() {
    this.ingredients.reduce((totalPrice, ingredient) => {
      return totalPrice + (ingredient.quantity.amount * this.getIngredientPrice(ingredient.id))
    }, 0)
  }

  returnRecipeInstructions() {
    return this.instructions;
  }
}

module.exports = Recipe;