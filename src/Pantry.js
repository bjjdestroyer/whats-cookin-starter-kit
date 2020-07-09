const allIngredients = require('../data/ingredients');

class Pantry {
  constructor(contents) {
    this.contents = contents;
  }

  findingNeededIngredients(recipe) {
    let neededIngredients = {};
    recipe.ingredients.forEach(ingredient => {
      neededIngredients[ingredient.id] = ingredient.quantity.amount;
    });
    return neededIngredients;
  };

  addingNeededIngredients(neededIngredients) {
    return this.contents.forEach(ingredient => {
      if (Object.keys(neededIngredients).includes(ingredient.ingredient.toString())) {
        neededIngredients[ingredient.ingredient] -= ingredient.amount;
      }
    });
  };

  canMakeRecipe(recipe) {
    let neededIngredients = this.findingNeededIngredients(recipe);

    this.addingNeededIngredients(neededIngredients);

    const validationArray = Object.values(neededIngredients).map(amount => {
      return amount < 0;
    });

    if (validationArray.includes(false)) {
      return "You do not have sufficient ingredients for this recipe.";
    } else {
      return "You have enough ingredients for this recipe!"
    }
  };

  findMissingIngredients(recipe) {
    let ingredientsNeeded = this.findingNeededIngredients(recipe);
    this.addingNeededIngredients(ingredientsNeeded);
    
    let ingredientsToBuy = {};

    Object.entries(ingredientsNeeded).forEach(([id, amount]) => {
      if (amount > 0) {
        ingredientsToBuy[id] = amount;
      }
    });
    
    return ingredientsToBuy;
  };
}

module.exports = Pantry;
