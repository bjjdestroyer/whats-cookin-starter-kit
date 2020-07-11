const userName = document.querySelector('.user-name');
const pantryModal = document.querySelector('.pantry-modal');
const pantryButton = document.querySelector('.pantry');
const closeButton = document.querySelector('.close-button');
const pantryList = document.querySelector('.pantry-list');

let recipes;
let user;

window.addEventListener('click', clickWrangler);
window.onload = instantiateWebsiteOnLoad();

function clickWrangler(event) {
    pantryModal.style.display = "none";
  if (event.target.closest("button") === pantryButton) {
    pantryModal.style.display = "block";
  }
}

function instantiateRecipes() {
  return new Recipes();
}

function instantiateEachRecipe(recipes) {
  recipes.recipes = recipes.recipes.map(recipe => {
    return new Recipe(recipe);
  });
}

function instantiateUser(user) {
  return new User(user);
}

function populateList() {
  pantryList.innerText = user.getPantryIngredients();
}

function instantiateWebsiteOnLoad() {
  recipes = instantiateRecipes();
  instantiateEachRecipe(recipes);
  let randomUserIndex = getRandomIndex(usersData);
  user = instantiateUser(usersData[randomUserIndex]);
  populateUser(user);
  populateList();
}

function getRandomIndex(array) {
  return Math.floor(array.length - (Math.random() * array.length));
}

function populateUser(user) {
  userName.innerText = `Hi ${user.name}!`;
}
