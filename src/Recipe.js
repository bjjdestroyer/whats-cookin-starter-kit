const fullIngredientsList = require('../data/ingredients');

class Recipe {
  constructor(id, image, ingredients, instructions, name, tags) {
    this.id = id;
    this.image = image;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.name = name;
    this.tags = tags;
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
    return this.ingredients.map(ingredient => ingredient.name);
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