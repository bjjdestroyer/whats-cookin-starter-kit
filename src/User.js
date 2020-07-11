// const users = require('../data/users');
// const ingredientsData = require('../data/ingredients');
// const Pantry = require('./Pantry');
// const Recipe = require('./Recipe');
// const Recipes = require('./Recipes');

class User {
  constructor(userObj) {
    this.id = userObj.id;
    this.name = userObj.name;
    this.pantry = new Pantry(userObj.pantry);
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }

  addToFavorites(recipe) {
    if (!(this.favoriteRecipes.includes(recipe))) {
      this.favoriteRecipes.push(recipe);
    }
  }

  addToRecipesToCook(recipe) {
    if(!(this.recipesToCook.includes(recipe))){
      this.recipesToCook.push(recipe);
    }
  }

  filterRecipes(recipesToFilter, tag) {
    return recipesToFilter.filter(recipe => recipe.tags.includes(tag));
  }

  searchFavoriteRecipes(userInput) {
    this.favoriteRecipes.filter( recipe => {
      if (recipe.name === userInput) {
        return recipe;
      } else if (recipe.getIngredientNameList().includes(userInput)) {
        return recipe;
      }
    });
  }

  // searchPantry(recipe) {
  //   recipe.ingredients.filter( ingredient => {
  //     if (this.pantry.contents.indexOf(ingredient) === -1) {
  //       return ingredient;
  //     }
  //   });
  //
  //   // need to check to see if recipe ingredient is in pantry;
  //   // if statement to see if ingredient isn't in the pantry
  //   // return ingredient if it's not in the pantry
  // }

  checkForIngredients(recipe) {
    const canMakeMessage = this.pantry.canMakeRecipe(recipe);
    if (canMakeMessage.includes('not')) {
      const missingIngredients = this.pantry.findMissingIngredients(recipe);
      let numberOfMissingIngredients = Object.keys(missingIngredients).length;
      return `${canMakeMessage}
      You still need ${numberOfMissingIngredients} ingredients.`;
    } else {
      return canMakeMessage;
    }
  }

  getIngredientNames(ingredientIds) {
    let ingredientObjects = ingredientIds.map(id => {
      return ingredientsData.find(ingredient => {
        if(ingredient.id) {
          return typeof(ingredient.id) === 'number' ?
          ingredient.id === id : ingredient.id.toString() === id;
        }
      })
    })
    return ingredientObjects.map(ingredient => {
      return ingredient.name;
    })
  }

  getPantryIngredients() {
    let pantryContents = this.pantry.contents;
    let ingredientIds = pantryContents.map(ingredient => {
      return ingredient.ingredient;
    })
    let ingredientNames = this.getIngredientNames(ingredientIds);
    let ingredientNamesAndAmounts = ingredientNames.map((name, index) => {
      return `${name}: ${Object.values(pantryContents)[index].amount}`;
    })
    return ingredientNamesAndAmounts.join('\n');
  }

  listMissingIngredients(recipe) {
    const missingIngredients = this.pantry.findMissingIngredients(recipe);
    let ingredientIds = Object.keys(missingIngredients).map(ingredient => {
      return ingredient;
    })
    let ingredientNames = this.getIngredientNames(ingredientIds);
    let ingredientNamesAndAmounts = ingredientNames.map((name, index) => {
      return `${name}: ${Object.values(missingIngredients)[index]}`;
    })
    return ingredientNamesAndAmounts.join(', ');
  }

  // shopForIngredients(recipe) {
  //   // ingredients needed and cost
  //   // round up for non-integers?
  //   const missingIngredients =
  //
  //   // find the keys for ingredients needed.
  //   // use the array to access the values
  //   // return new object with keys and values of amountNeeded and cost
  //
  //
  //
  //
  // }
}
if(typeof(module) !== 'undefined') {
  module.exports = User;
}
