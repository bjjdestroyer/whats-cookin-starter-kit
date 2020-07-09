const chai = require('chai');
const expect = chai.expect;

const Recipes = require('../src/Recipes');
const ingredients = require('../data/ingredients');
const allRecipes = require('../data/recipes');

describe('Recipes', function () {
  let recipes;

  beforeEach(function () {
    recipes = new Recipes(allRecipes);
  });

  it('should be a function', function () {
    expect(Recipes).to.be.a('function');
  });

  it('should be an instance of Recipe', function () {
    expect(recipes).to.be.an.instanceOf(Recipes);
  });

  it('should have an array of recipes', function () {
    expect(recipes.recipes).to.deep.equal(allRecipes);
  });

  it('should be able to filter recipes by tag', function () {
    const filteredByTag = recipes.filterByTag("sauce");
    const filteredId = filteredByTag[0].id;
    
    expect(filteredId).to.deep.equal(allRecipes[2].id);
  });

  it('should be able to filter and return multiple recipes by tag', function () {
    const filteredByTag = recipes.filterByTag("salad");
    const filteredIds = [filteredByTag[0].id, filteredByTag[1].id, filteredByTag[2].id, filteredByTag[3].id,]
    const recipeIds = [793584, 999044, 576906, 799732]
    
    expect(filteredIds).to.deep.equal(recipeIds);
  });

  it('should be able to filter recipes with no tag', function () {
    const filteredByTag = recipes.filterByTag("");
    const filteredIds = [filteredByTag[0].id];
    const recipeID = [562334];
    
    expect(filteredIds).to.deep.equal(recipeID);
  });

  it('should be able to find recipes by ingredient', function () {
    const filteredByIngredient = recipes.filterByIngredient("bicarbonate of soda");
    const filteredIds = [filteredByIngredient[0].id, filteredByIngredient[1].id, filteredByIngredient[2].id, filteredByIngredient[3].id,]
    const recipeIds = [595736, 623855, 611858, 583738];

    expect(filteredIds).to.deep.equal(recipeIds);
  });

  it('should be able to find all recipes that have the same word in it', function () {
    const filteredByIngredient = recipes.filterByIngredient("soda");
    const filteredIds = filteredByIngredient.map(recipe => recipe.id);
    const recipeIds = [595736, 623855, 611858, 583738, 602311];
    
    expect(filteredIds).to.deep.equal(recipeIds);
  });

  it('should be able to return a message if no recipe has that ingredient', function () {
    let noIngredient = recipes.filterByIngredient('rhubarb');

    expect(noIngredient).to.equal('No recipe has that ingredient');
  });

  it('should be able to return a message if it\'s an invalid ingredient', function () {
    let noIngredient1 = recipes.filteredByIngredient('12');
    expect(noIngredient1).to.equal('Please enter a valid ingredient');

    let noIngredient2 = recipes.filteredByIngredient('*');
    expect(noIngredient2).to.equal('Please enter a valid ingredient');

    let noIngredient3 = recipes.filteredByIngredient('  ');
    expect(noIngredient3).to.equal('Please enter a valid ingredient');
  });
});