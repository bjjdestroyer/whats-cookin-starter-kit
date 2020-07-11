const chai = require('chai');
const expect = chai.expect;

const Recipes = require('../src/Recipes');
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

  it('should be able to filter & return multiple recipes by tag', function () {
    const filteredByTag = recipes.filterByTag("salad");
    const filteredIds = [filteredByTag[0].id, filteredByTag[1].id, filteredByTag[2].id, filteredByTag[3].id];
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
    const filteredIds = [filteredByIngredient[0].id, filteredByIngredient[1].id, filteredByIngredient[2].id, filteredByIngredient[3].id];
    const recipeIds = [595736, 623855, 611858, 583738];

    expect(filteredIds).to.deep.equal(recipeIds);
  });

  it('should be able to find all recipes that have the same word in it', function () {
    const filteredByIngredient = recipes.filterByIngredient("soda");
    const filteredIds = [filteredByIngredient[0].id, filteredByIngredient[1].id, filteredByIngredient[2].id, filteredByIngredient[3].id, filteredByIngredient[4].id];
    const recipeIds = [595736, 623855, 602311, 611858, 583738];

    expect(filteredIds).to.deep.equal(recipeIds);
  });

  it('should be able to return an empty array if no recipe has ingredient', function () {
    let noIngredient = recipes.filterByIngredient('rhubarb');

    expect(noIngredient).to.deep.equal([]);
  });

  it('should be able to return an empty array if it\'s an invalid ingredient', function () {
    let noIngredient1 = recipes.filterByIngredient('12');
    expect(noIngredient1).to.deep.equal([]);

    let noIngredient2 = recipes.filterByIngredient('*');
    expect(noIngredient2).to.deep.equal([]);

    let noIngredient3 = recipes.filterByIngredient('  ');
    expect(noIngredient3).to.deep.equal([]);
  });
});
