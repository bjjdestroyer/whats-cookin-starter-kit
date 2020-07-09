const fullIngredientsList = require('../data/ingredients');
const allRecipes = require('../data/recipes');
const Recipe = require('./Recipe');

class Recipes {
  constructor() {
    this.recipes = allRecipes;
  }

  filterByTag(tag) {
    return this.recipes.filter(recipe => {
      if (tag !== "") {
        return recipe.tags.includes(tag)
      } else {
        const noTag = recipe.id === 562334;
        return noTag;
      }
    });
  }

  filterByIngredient(ingredientName) {
    // const ingredientList = this.recipes.filter(recipe => {
    //   return recipe.getIngredientNameList();
    // }); // this will return names of all ingredients in all recipes

    // return this.recipes.filter( recipe => {
    //   if (ingredientList.includes(ingredientName)) {
    //     return recipe;
    //   }
    // });

    const ingredientNeeded = fullIngredientsList.find( ingredient => {
      return ingredient.name === ingredientName;
    });

    let recipeArray = []

    const recipes = this.recipes.forEach( recipe => {
      recipe.ingredients.forEach( ingredient => {
        if (ingredient.id === ingredientNeeded.id) {
          recipeArray.push(recipe);
        };
      });
    });

    return recipeArray;
    // we want to return all recipes that contain ingredient being searched for
    // User inputs item they're looking for
    // Names aren't in recipes, need to look through ingredients list for names
    // Once we have names, return recipes they're in
  }
}

module.exports = Recipes;