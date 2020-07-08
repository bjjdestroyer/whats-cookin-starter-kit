const chai = require('chai');
const expect = chai.expect;

const Pantry = require('../src/Pantry');
const users = require('../data/users');

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
    expect(pantry.contents[3].ingredient).to,equal(1082047);
  })
})