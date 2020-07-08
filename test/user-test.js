const chai = require('chai');
const expect = chai.expect;

const User = require('../src/User');
const users = require('../data/users');
const recipes = require('../data/recipes');

describe('User', function() {
  let user;

  beforeEach(function() {
    user = new User(users[0]);
  })

  it('should be a function', function() {
    expect(User).to.be.a('function');
  })

  it('should create an instance of User', function() {
    expect(user).to.be.an.instanceOf(User);
  })

  it('should have a name', function() {
    expect(user.name).to.equal("Saige O'Kon");
  })

  it('should have a user ID', function() {
    expect(user.id).to.equal(1);
  })

  it('should have a pantry', function() {
    expect(user.pantry).to.be.an("array");
  })

  it('should have no favorite recipes by default', function() {
    expect(user.favoriteRecipes).to.deep.equal([]);
  })

  it('should have no recipes to cook by default', function() {
    expect(user.recipesToCook).to.deep.equal([]);
  })

  it('should be able to favorite a recipe', function() {
    const recipe = recipes[0];
    user.addRecipeToFavorites(recipe);
    expect(user.favoriteRecipes[0]).to.deep.equal(recipe);
  })

  it('should only be able to add a recipe once', function() {
    const recipe = recipes[0];
    user.addRecipeToFavorites(recipe);
    user.addRecipeToFavorites(recipe);
    user.addRecipeToFavorites(recipe);
    expect(user.favoriteRecipes.length).to.equal(1);
  })

  it('should be able to add a recipe to a recipe planner', function() {
    const recipe = recipes[0];
    user.saveRecipeForLater();
    expect(user.mealsToCook[0]).to.deep.equal(recipe);
  })

  it.skip('should be able to check the pantry for sufficient ingredients for a saved recipe', function() {
    const recipe = recipes[0];
    let pantryMessage;// = Have user use pantry methods to evaluate
    expect(pantryMessage).to.equal("You do not currently have sufficient ingredients to cook this recipe.");
  })
})
