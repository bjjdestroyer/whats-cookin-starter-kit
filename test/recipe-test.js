const chai = require('chai');
const expect = chai.expect;

const Recipe = require('../src/Recipe');
const ingredients = require('../data/ingredients');
const recipes = require('../data/recipes');

describe('Recipe', function () {
  let recipe;

  beforeEach(function() {
    recipe = new Recipe(recipes[0]);
  });

  it('should be a function', function () {
    expect(Recipe).to.be.a('function');
  });

  it('should be an instance of Recipe', function () {
    expect(recipe).to.be.an.instanceOf(Recipe);
  });

  it('should be able to calculate recipe cost', function () {
    const recipeCost = recipe.getTotalIngredientCost();
    expect(recipeCost).to.equal(17776);
  });  

  it('should calculate recipe cost for only one recipe', function () {
    const recipeCost = recipe.getTotalIngredientCost();

    expect(recipe).to.equal(18084.5);
    //or return undefined/message?
  });  

  it('should be able to list recipe instructions', function () {
    const recipeInstructions = recipe.returnRecipeInstructions();
    expect(recipeInstructions).to.equal(Recipe);
  });  
});