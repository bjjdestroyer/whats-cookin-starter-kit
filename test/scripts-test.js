const chai = require('chai');
const expect = chai.expect;

const scripts = require('../src/scripts');
const testArray = [3, 12, 4, 6, 11, 9];

describe('Scripts', function() {
  it('getRandomIndex should return a random number', function() {
    const value = scripts.getRandomIndex(testArray);
    expect(value).to.be.a('number');
  })

  it('the number value should be between 0 and the given array length', function() {
    const value = scripts.getRandomIndex(testArray);
    expect(value >= 0 && value <= testArray.length).to.equal(true);
  })

})
