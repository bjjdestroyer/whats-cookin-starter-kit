const userName = document.querySelector('.user-name');
const recipeCard1 = document.querySelector('.recipe-1');
const recipeCard2 = document.querySelector('.recipe-2');
const recipeCard3 = document.querySelector('.recipe-3');
const recipeCard4 = document.querySelector('.recipe-4');
const backBtn = document.querySelector('.back');
const forwardBtn = document.querySelector('.forward');

let recipes;
let user;
let currentCards = [];
let recipeCards = [recipeCard1, recipeCard2, recipeCard3, recipeCard4];

window.onload = instantiateWebsiteOnLoad();
backBtn.addEventListener("click", goBack);
forwardBtn.addEventListener("click", goForward);


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

function instantiateWebsiteOnLoad() {
  recipes = instantiateRecipes();
  instantiateEachRecipe(recipes);
  let randomUserIndex = getRandomIndex(usersData);
  user = instantiateUser(usersData[randomUserIndex]);
  populateUser(user);

  createCards(recipes);
}

function getRandomIndex(array) {
  return Math.floor(array.length - (Math.random() * array.length));
}

function populateUser(user) {
  userName.innerText = `Hi ${user.name}!`;
}

function createCards(recipes) {
  recipeCards[0].insertAdjacentHTML('beforeend', `<img src=${recipes.recipes[0].image}><h3>${recipes.recipes[0].name}</h3><p>${recipes.recipes[0].tags}</p>`);

  recipeCards[1].insertAdjacentHTML('beforeend', `<img src=${recipes.recipes[1].image}><h3>${recipes.recipes[1].name}</h3><p>${recipes.recipes[1].tags}</p>`);

  recipeCards[2].insertAdjacentHTML('beforeend', `<img src=${recipes.recipes[2].image}><h3>${recipes.recipes[2].name}</h3><p>${recipes.recipes[2].tags}</p>`);

  recipeCards[3].insertAdjacentHTML('beforeend', `<img src=${recipes.recipes[3].image}><h3>${recipes.recipes[3].name}</h3><p>${recipes.recipes[3].tags}</p>`);
}

function goBack() {
  recipeCards.forEach(card => {
    if (recipes.currentIndex > 0) {
      recipes.currentIndex--;
      card.innerHTML = `<img src=${recipes.recipes[recipes.currentIndex].image}><h3>${recipes.recipes[recipes.currentIndex].name}</h3><p>${recipes.recipes[recipes.currentIndex].tags}</p>`;
    }
  })
}

function goForward() {
  recipeCards.forEach(card => {
    if(recipes.currentIndex < 50) {
      recipes.currentIndex++;
      card.innerHTML = `<img src=${recipes.recipes[recipes.currentIndex].image}><h3>${recipes.recipes[recipes.currentIndex].name}</h3><p>${recipes.recipes[recipes.currentIndex].tags}</p>`;
    }
  })
}

// when forward button is pressed, we see the next four recipes in the array
// iterate over recipes and change current recipe to new recipe
// need to change index values being used