const fullIngredientsList = require('./data/ingredients.js');

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

  getTotalIngredientCost() {
    this.ingredients.reduce((ingredient, totalPrice) => {
      totalPrice + (ingredient.quantity.amount * this.getIngredientPrice(ingredient.id))
    }, 0)
  }
}

module.exports = Recipe;