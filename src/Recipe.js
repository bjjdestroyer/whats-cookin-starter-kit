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

  getIngredientUnits(ingredients) {
    return ingredients.map(ingredient => {
      return {
        [ingredient.id]: ingredient.quantity.unit
      }
    })
  }

  getIngredientIds(ingredients) {
    return ingredients.map(ingredient => {
      return ingredient.id;
    })
  }

  getIngredientObjects(ingredientPiece) {
    if (typeof(ingredientPiece === 'number')) {
      return ingredientPiece.map(id => {
        return ingredientsData.find(ingredient => {
          return id === ingredient.id;
        })
      })
    }
  }

  getIngredientNameList(ingredients) {
    let ingredientIds = this.getIngredientIds(ingredients);
    let ingredientObjects = this.getIngredientObjects(ingredientIds);
    return ingredientObjects.map(ingredient => {
      return ingredient.name;
    })
  }

  getTotalIngredientCost(ingredients) {
    const rawCost = ingredients.reduce((totalPrice, ingredient) => {
      const ingredientAmount = ingredient.quantity.amount;
      const ingredientPrice = this.getIngredientPrice(ingredient.id);
      const ingredientTotal = ingredientAmount * ingredientPrice;

      return (totalPrice + ingredientTotal);
    }, 0);
    return (rawCost / 100).toFixed(2);
  }

  returnRecipeInstructions() {
    return this.instructions;
  }
}

if (typeof(module) !== 'undefined') {
  module.exports = Recipe;
}
