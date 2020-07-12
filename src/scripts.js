const userName = document.querySelector('.user-name');
const recipeCard1 = document.querySelector('.recipe-1');
const recipeCard2 = document.querySelector('.recipe-2');
const recipeCard3 = document.querySelector('.recipe-3');
const recipeCard4 = document.querySelector('.recipe-4');
const backBtn = document.querySelector('.back');
const forwardBtn = document.querySelector('.forward');
const pantryModal = document.querySelector('.pantry-modal');
const pantryButton = document.querySelector('.pantry');
const closeButton = document.querySelector('.close-button');
const pantryList = document.querySelector('.pantry-list');

let recipes;
let user;
let currentCards = [];
let recipeCards = [recipeCard1, recipeCard2, recipeCard3, recipeCard4];

window.addEventListener('click', clickWrangler);
window.onload = instantiateWebsiteOnLoad();
backBtn.addEventListener("click", goBack);
forwardBtn.addEventListener("click", goForward);


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
  createCards(recipes);
  populateList();
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
      card.innerHTML = `<div class="button-holder"><button class="to-cook card-btn"><img class="pot icon" src="../assets/cooking-pot.svg"></button><button class="favorite card-btn"><img class="heart icon" src="../assets/heart.svg"></button></div><img src=${recipes.recipes[recipes.currentIndex].image}><h3>${recipes.recipes[recipes.currentIndex].name}</h3><p>${recipes.recipes[recipes.currentIndex].tags}</p>`;
    }
  })
}

function goForward() {
  recipeCards.forEach(card => {
    if(recipes.currentIndex < 50) {
      recipes.currentIndex++;
      card.innerHTML = `<div class="button-holder"><button class="to-cook card-btn"><img class="pot icon" src="../assets/cooking-pot.svg"></button><button class="favorite card-btn"><img class="heart icon" src="../assets/heart.svg"></button></div><img src=${recipes.recipes[recipes.currentIndex].image}><h3>${recipes.recipes[recipes.currentIndex].name}</h3><p>${recipes.recipes[recipes.currentIndex].tags}</p>`;
    }
  })
}

// when forward button is pressed, we see the next four recipes in the array
// iterate over recipes and change current recipe to new recipe
// need to change index values being used

// lose buttons when recipes change