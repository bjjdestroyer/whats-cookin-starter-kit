const allIngredients = require('../data/ingredients');

class Pantry {
  constructor() {
    this.contents = [];
  }

  canMakeRecipe(recipe) {
    recipe.ingredients.reduce((neededList, ingredient) => {
      this.contents.forEach(pantryIngredient => {
        if (this.contents.includes(ingredient) && neededList[ingredient]) {
          neededList[ingredient] = neededList[ingredient] + pantryIngredient.amount;
        } else if (this.contents.includes(ingredient) && !neededList[ingredient]) {
          neededList[ingredient] = ingredient.amount;
          neededList[ingredient] = neededList[ingredient] + pantryIngredient.amount;
        }
      })
    }, {})
  }

  findMissingIngredients(recipe) {
    let ingredientsNeeded = this.canMakeRecipe();
    let ingredientsKeys = Object.keys(ingredientsNeeded);

    ingredientsKeys.reduce((shoppingList, ingredient) => {
      let ingredientInArray = allIngredients.find(ingredient => {
        allIngredients.name === ingredient;
      });

      if (!shoppingList[ingredient]) {
        shoppingList[ingredient] = 0;
        shoppingList[ingredient].amount = ingredientsNeeded[ingredient];
        shoppingList[ingredient].cost = ingredientsNeeded[ingredient] * ingredientInArray.estimatedCostInCents;
      } else {
        shoppingList[ingredient].amount = ingredientsNeeded[ingredient];
        shoppingList[ingredient].cost = ingredientsNeeded[ingredient] * ingredientInArray.estimatedCostInCents;
      }
    }, {})
  }
}

module.exports = Pantry;