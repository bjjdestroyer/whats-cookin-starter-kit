const chai = require('chai');
const expect = chai.expect;

const Pantry = require('../src/Pantry');
const users = require('../data/users');
const recipes = require('../data/recipes');


describe('Pantry', function() {
  let pantry;

  beforeEach(function() {
    pantry = new Pantry(users[0].pantry);
  })

  it('should be a function', function() {
    expect(Pantry).to.be.a('function');
  })

  it('should create an instance of Pantry', function() {
    expect(pantry).to.be.an.instanceOf(Pantry);
  })

  it('should contain an array of ingredients', function() {
    expect(pantry.contents[2].ingredient).to.equal(1082047);
  })

  it('should be able to determine if it has enough ingredients for a given recipe', function() {
    let testRecipe = recipes[0];
    let response = pantry.canMakeRecipe(testRecipe);
    expect(response).to.equal("You do not have sufficient ingredients for this recipe.");
  })

  it('should return how much of each ingredient still needed', function() {
    let testRecipe = recipes[0];
    let missingIngredients = pantry.findMissingIngredients(testRecipe);
    expect(missingIngredients).to.deep.equal({"19206": 1, "19334": 0.5, "1012047": 24, 10019903: 2});
  })

  // it('should be able to remove ingredients from a cooked meal', function() {
  //   let testRecipe = recipes[0];

  // })
})
