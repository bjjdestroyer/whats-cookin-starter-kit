const chai = require('chai');
const expect = chai.expect;

const Recipe = require('../src/Recipe');
const ingredients = require('../data/ingredients');
const recipes = require('../data/recipes');

describe('Recipe', function () {
  let recipe;

  beforeEach(function () {
    recipe = new Recipe();
  });

  it('should be a function', function () {
    expect(Recipe).to.be.a('function');
  });

  it('should be an instance of Recipe', function () {
    expect(recipe).to.be.an.instanceOf(Recipe);
  });

  it('should be able to get the price of an ingredient', function () {
    let ingredientPrice = recipe.getIngredientPrice(2047);

    expect(ingredientPrice).to.equal(280);
  });

  it('should be able to return a list of ingredients', function () {
    let ingredientList = recipe.getIngredientNameList();
    let ingredients = ["wheat flour", "blanched almond flour", "egg yolks", "salt","sesame seeds", "sucrose", "unsalted butter"]

    // recipe.id === 541288

    expect(ingredientList).to.equal(ingredients);
  });

  it('should be able to calculate recipe cost', function () {
    const recipeCost = recipe.getTotalIngredientCost(595736);

    expect(recipeCost).to.equal(18084.5);
  });  

  it('should calculate recipe cost for only one recipe', function () {
    const recipeCost = recipe.getTotalIngredientCost(595736, 678353);

    expect(recipe).to.equal(18084.5);
    //or return undefined/message?
  });  

  it('should be able to list recipe instructions', function () {
    const recipeInstructions = recipe.returnRecipeInstructions();

    expect(recipeInstructions).to.equal(Recipe);
  });  
});