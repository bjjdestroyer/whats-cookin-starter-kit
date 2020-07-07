const chai = require('chai');
const expect = chai.expect;

const Recipe = require('../src/Recipe');
const ingredients = require('../data/ingredients');
const recipes = requires('../data/recipes');

describe('Recipe', function () {

  it('should be a function', function () {
    expect(Recipe).to.be.a('function');
  });

  it('should be an instance of Recipe', function () {
    const recipe = new Recipe();

    expect(recipe).to.be.an.instanceOf(Recipe);
  });

  it('should have an array of recipes', function () {
    const recipe = new Recipe();
    
    recipe.allRecipes = recipes;

    expect(recipe.allRecipes).to.deep.equal(recipes);
  });

  it('should be able to filter recipes by tag', function () {
    const recipe = new Recipe();

    const filteredByTag = recipe.filterByTag("sauce");
    const recipeID = [412309];

    expect(filteredByTag.id).to.deep.equal(recipeID);
  });  

  it('should be able to filter and return multiple recipes by tag', function () {
    const recipe = new Recipe();

    const filteredByTag = recipe.filterByTag("salad");
    const recipeIds = [793584, 999044, 576906, 799732]

    expect(filteredByTag).to.deep.equal(recipeIds);
  });  

  it('should be able to filter recipes with no tag', function () {
    const recipe = new Recipe();

    const filteredByTag = recipe.filterByTag();
    const recipeID = [562334];

    expect(filteredByTag.id).to.deep.equal(recipeID);
  }); 

  it('should be able to find recipes by ingredient', function () {
    const recipe = new Recipe();

    expect(recipe).to.equal(Recipe);
  });  

  it('should be able to return a message if no recipe has that ingredient', function () {
    const recipe = new Recipe();

    expect(recipe).to.equal(Recipe);
  });  

  it('should be able to calculate recipe cost', function () {
    const recipe = new Recipe();

    expect(recipe).to.equal(Recipe);
  });  

  it('should calculate recipe cost for only one recipe', function () {
    const recipe = new Recipe();

    expect(recipe).to.equal(Recipe);
  });  

  it('should be able to list recipe instructions', function () {
    const recipe = new Recipe();

    expect(recipe).to.equal(Recipe);
  });  

  it('should list recipe instructions for only one recipe', function () {
    const recipe = new Recipe();

    expect(recipe).to.equal(Recipe);
  });  
});