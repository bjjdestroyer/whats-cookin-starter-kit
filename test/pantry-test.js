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

  it('should still run on an empty pantry', function() {
    pantry = new Pantry(users[21].pantry);
    let testRecipe = recipes[0];
    let response = pantry.canMakeRecipe(testRecipe);
    expect(response).to.equal("You do not have sufficient ingredients for this recipe.");
  })

  it('should return how much of each ingredient still needed', function() {
    let testRecipe = recipes[0];
    let missingIngredients = pantry.findMissingIngredients(testRecipe);
    expect(missingIngredients).to.deep.equal({"19206": 1, "19334": 0.5, "1012047": 24, 10019903: 2});
  })

  it('should still return how much of each ingredient needed if pantry is empty', function() {
    pantry = new Pantry(users[21].pantry);
    let testRecipe = recipes[0];
    let missingIngredients = pantry.findMissingIngredients(testRecipe);
    expect(missingIngredients).to.deep.equal({
      "20081":  1.5,
      "18372":  0.5,
      "1123": 1,
      "19335": 0.5,
      "19206": 3,
      "19334": 0.5,
      "2047": 0.5,
      "1012047": 24,
      "10019903": 2,
      "1145": 0.5,
      "2050": 0.5
    })
  })

  it('should still return how much of an ingredient is needed on a different recipe', function() {
    let testRecipe = recipes[31];
    let missingIngredients = pantry.findMissingIngredients(testRecipe);
    expect(missingIngredients).to.deep.equal({
      "98998": 12,
      "8030": 6.5,
      "19116": 9,
      "19336": 1
    })
  })


  // it('should be able to remove ingredients from a cooked meal', function() {
  //   let testRecipe = recipes[0];

  // })
})
