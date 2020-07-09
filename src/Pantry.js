const allIngredients = require('../data/ingredients');

class Pantry {
  constructor(contents) {
    this.contents = contents;
  }

  canMakeRecipe(recipe) {
    let neededIngredients = {};
    recipe.ingredients.forEach(ingredient => {
      neededIngredients[ingredient.id] = ingredient.quantity.amount;
    })
    this.contents.forEach(ingredient => {
      if (Object.keys(neededIngredients).includes(ingredient.ingredient.toString())) {
        neededIngredients[ingredient.ingredient] -= ingredient.amount;
      }
    })
    const validationArray = Object.values(neededIngredients).map(amount => {
      return amount < 0;
    })
    if (validationArray.includes(false)) {
      return "You do not have sufficient ingredients for this recipe.";
    } else {
      return "You have enough ingredients for this recipe!"
    }
    // return recipe.ingredients.reduce((neededList, ingredient) => {
    //   console.log(neededList);
    //   return neededList[ingredient.id] = this.contents.forEach(pantryIngredient => {
    //     if (this.contents.includes(ingredient)) {
    //       return ingredient.amount - pantryIngredient.amount;
    //     } else if (this.contents.includes(!ingredient)) {
    //       return ingredient.amount;
    //     }
    //   })
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
