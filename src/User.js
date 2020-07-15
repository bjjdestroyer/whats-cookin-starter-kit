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
      } else if (recipe.getIngredientNameList(recipe.ingredients).includes(userInput)) {
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

  getIngredientInformation(ingredientIds, value) {
    let ingredientObjects = ingredientIds.map(id => {
      return ingredientsData.find(ingredient => {
        if(ingredient.id) {
          return ingredient.id.toString() === id.toString();
        }
      })
    })
    return ingredientObjects.map(ingredient => {
      if(value) {
      return ingredient[value];
    } else {
      return ingredient.name;
    }
  })
  }

  getPantryIngredients() {
    let pantryContents = this.pantry.contents;
    let ingredientIds = pantryContents.map(ingredient => {
      return ingredient.ingredient;
    })
    let ingredientNames = this.getIngredientInformation(ingredientIds);
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
    let unitObjects = recipe.getIngredientUnits(recipe.ingredients)
    let missingIngredientUnits = ingredientIds.map((id, index) => {
      let missingUnit = Object.values(unitObjects[index]).find(unit => {
        return Object.keys(unitObjects[index]) === typeof(id) === 'string' ?
        id : id.toString();
      })
      return missingUnit;
    })
    let ingredientNames = this.getIngredientInformation(ingredientIds);
    let ingredientNamesAndAmounts = ingredientNames.map((name, index) => {
      return `${name}(${missingIngredientUnits[index]}): ${Object.values(missingIngredients)[index]}`;
    })
    return ingredientNamesAndAmounts.join('\n');
  }



  /* shopForIngredients(recipe) {
  starting with a recipe object and an array of ingredient objects
  I want to end with a string that reads "IngredientName: amount unit, cost"
  To get the ingredientName: amount piece, I can call listMissingIngredients and
  use the split method with ', ' to split them into "name: amount" strings.
  To get the unit, I need to go into the recipe object,
 } */
}
if(typeof(module) !== 'undefined') {
  module.exports = User;
}
