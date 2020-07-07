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

    expect(recipe.allRecipes).to.deep.equal(recipes);
  });

  it('should be able to filter recipes by tag', function () {
    const recipe = new Recipe();

    const filteredByTag = recipe.filterByTag("sauce");
    //return id's at this point?
    expect(filteredByTag).to.deep.equal(recipes[2].id);
  });  

  it('should be able to filter and return multiple recipes by tag', function () {
    const recipe = new Recipe();

    const filteredByTag = recipe.filterByTag("salad");
    const recipeIds = [793584, 999044, 576906, 799732]
    // check out array order
    //return id's at this point?
    expect(filteredByTag).to.deep.equal(recipeIds);
  });  

  it('should be able to filter recipes with no tag', function () {
    const recipe = new Recipe();

    const filteredByTag = recipe.filterByTag();
    const recipeID = [562334];
    //return id's at this point?
    // or have the return equal index of recipes data?
    expect(filteredByTag).to.deep.equal(recipeID);
  }); 

  it('should be able to find recipes by ingredient', function () {
    const recipe = new Recipe();

    const filteredByIngredient = recipe.filterByIngredient("bicarbonate of soda");
    const recipeIds = [595736, 623855, 611858, 583738];
    //return id's at this point?
    // or have the return equal index of recipes data?

    expect(filteredByIngredient).to.deep.equal(recipeIds);
  });  

  it('should be able to find all recipes that have the same word in it', function () {
    const recipe = new Recipe();

    const filteredByIngredient = recipe.filterByIngredient("soda");
    const recipeIds = [595736, 623855, 611858, 583738, 602311];
    //return id's at this point?
    // or have the return equal index of recipes data?

    expect(filteredByIngredient).to.deep.equal(recipeIds);
  });  

  it('should be able to return a message if no recipe has that ingredient', function () {
    const recipe = new Recipe();

    let noIngredient = recipe.filteredByIngredient('rhubarb');

    expect(noIngredient).to.equal('No recipe has that ingredient');
  });  

  it('should be able to return a message if it\'s an invalid ingredient', function () {
    const recipe = new Recipe();

    let noIngredient = recipe.filteredByIngredient('12');
    expect(noIngredient).to.equal('Please enter a valid ingredient');

    let noIngredient = recipe.filteredByIngredient('*');
    expect(noIngredient).to.equal('Please enter a valid ingredient');

    let noIngredient = recipe.filteredByIngredient('  ');
    expect(noIngredient).to.equal('Please enter a valid ingredient');
  }); 

  it('should be able to calculate recipe cost', function () {
    const recipe = new Recipe();

    const recipeCost = recipe.getTotalIngredientCost(595736);

    expect(recipeCost).to.equal(18084.5);
  });  

  it('should calculate recipe cost for only one recipe', function () {
    const recipe = new Recipe();

    const recipeCost = recipe.getTotalIngredientCost(595736, 678353);

    expect(recipe).to.equal(18084.5);
    //or return undefined/message?
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