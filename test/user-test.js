const chai = require('chai');
const expect = chai.expect;

const User = require('../src/User');
const users = require('../data/users');

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
    console.log(user.pantry);
    expect(user.pantry).to.be.an("array");
  })

  
})
