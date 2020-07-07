const chai = require('chai');
const expect = chai.expect;

const User = require('./src/User');

describe('User', function() {
  let user;

  beforeEach(function() {
    user = new User();
  })

  it('should be a function', function() {
    expect(User).to.be.a('function');
  })

  it('should create an instance of User', function() {
    expect(user).to.be.an.instanceOf(User);
  })

  
})
