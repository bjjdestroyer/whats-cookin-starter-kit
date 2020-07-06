class Recipe {
  constructor(id, image, ingredients, instructions, name, tags) {
    this.id = id;
    this.image = image;
    this,ingredients = ingredients;
    this.instructions = instructions;
    this.name = name;
    this.tags = tags;
  }

  getIngredientCost() {
    this.ingredients.reduce(ingredient, totalPrice, function() {
      totalPrice + (ingredient.quantity.amount * /* ingredientPrice method, where ingredientPrice takes in an id and returns the estimatedCostInCents from that id's object*/)
    }, 0)
  }
}

module.exports = Recipe;