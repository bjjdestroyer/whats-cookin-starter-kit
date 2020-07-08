const users = require('../data/users');
const allIngredients = require('../data/ingredients');
const Pantry = require('./Pantry');
const Recipe = require('./Recipe');
const Recipes = require('./Recipes');

class User {
  constructor(userObj) {
    this.id = userObj.id;
    this.name = userObj.name;
    this.pantry = userObj.pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }

  addToFavorites(recipe) {
    this.favoriteRecipes.push(recipe);
  }

  addToRecipesToCook (recipe) {
    this.recipesToCook.push(recipe);
  } 

  filterRecipes(recipesToFilter, tag) {
    return recipesToFilter.filter(recipe => recipe.tags.includes(tag));
  }

  searchRecipes(userInput) {
    this.favoriteRecipes.filter( recipe => {
      if (recipe.name === userInput) {
        return recipe;
      } else if (recipe.getIngredientNameList().includes(userInput)) {
        return recipe;
      }
    });
  }

  searchPantry(recipe) {
    recipe.ingredients.filter( ingredient => {
      if (this.pantry.indexOf(ingredient) === -1) {
        return ingredient;
      }
    });

    // need to check to see if recipe ingredient is in pantry;
    // if statement to see if ingredient isn't in the pantry
    // return ingredient if it's not in the pantry
  }

  checkForIngredients(recipe) {
    // Checking to see if you have the right amount of ingredients for a recipe
    // use reduce on recipe.ingredients array; acc is neededList, cv is 
    // ingredient. Iterate over pantry contents with forEach. If ingredient
    // matches pantry ingredient, compare amounts and return
    // if pantry doesn't include the ingredient, return recipe ingredient
    recipe.ingredients.reduce((neededList, ingredient) => {
      this.pantry.forEach( pantryIngredient => {
        if (this.pantry.includes(ingredient) && neededList[ingredient]) {
          neededList[ingredient] = neededList[ingredient] + pantryIngredient.amount;
        } else if (this.pantry.includes(ingredient) && !neededList[ingredient]) {
          neededList[ingredient] = ingredient.amount;
          neededList[ingredient] = neededList[ingredient] + pantryIngredient.amount;
        }
      })
    }, {})
  }


  shopForIngredients(recipe) {
    // ingredients needed and cost
    // round up for non-integers?
    let ingredientsNeeded = this.checkForIngredients();
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

    // find the keys for ingredients needed.
    // use the array to access the values
    // return new object with keys and values of amountNeeded and cost


    

  }
}

module.exports = User;