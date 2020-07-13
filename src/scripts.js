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
const addToFavs = document.querySelectorAll('.heart-add');
const addToCook = document.querySelectorAll('.pot-add');
const addList = document.querySelectorAll('.button-holder');

let recipes;
let user;
let currentCards = [];
let recipeCards = [recipeCard1, recipeCard2, recipeCard3, recipeCard4];

window.addEventListener('click', clickWrangler);
window.onload = instantiateWebsiteOnLoad();

function addToLists(event) {
  console.log(event);
}

function clickWrangler(event) {
    pantryModal.style.display = "none";
  if (event.target.closest("button") === pantryButton) {
    pantryModal.style.display = "block";
  } else if (event.target.classList[0] === "heart-add") {
    addToFavorites(event.path[3].children[2].innerText);
  } else if (event.target.classList[0] === "pot-add") {
    console.log('pot');
  } else if (
    event.target.classList[0] === "forward" ||
    event.target.classList[0] === "forward-icon"
  ) {
    goForward();
  } else if (
    event.target.classList[0] === "back" ||
    event.target.classList[0] === "back-icon"
  ) {
    goBack();
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
  recipeCards[0].innerHTML = `<div class="button-holder"><button class="to-cook card-btn"><img class="pot-add icon" src="../assets/cooking-pot.svg"></button><button class="favorite card-btn"><img class="heart-add icon" src="../assets/heart.svg"></button></div><img src=${recipes.recipes[0].image}><h3>${recipes.recipes[0].name}</h3><p>${recipes.recipes[0].tags}</p>`;

  recipeCards[1].innerHTML = `<div class="button-holder"><button class="to-cook card-btn"><img class="pot-add icon" src="../assets/cooking-pot.svg"></button><button class="favorite card-btn"><img class="heart-add icon" src="../assets/heart.svg"></button></div><img src=${recipes.recipes[1].image}><h3>${recipes.recipes[1].name}</h3><p>${recipes.recipes[1].tags}</p>`;

  recipeCards[2].innerHTML = `<div class="button-holder"><button class="to-cook card-btn"><img class="pot-add icon" src="../assets/cooking-pot.svg"></button><button class="favorite card-btn"><img class="heart-add icon" src="../assets/heart.svg"></button></div><img src=${recipes.recipes[2].image}><h3>${recipes.recipes[2].name}</h3><p>${recipes.recipes[2].tags}</p>`;

  recipeCards[3].innerHTML = `<div class="button-holder"><button class="to-cook card-btn"><img class="pot-add icon" src="../assets/cooking-pot.svg"></button><button class="favorite card-btn"><img class="heart-add icon" src="../assets/heart.svg"></button></div><img src=${recipes.recipes[3].image}><h3>${recipes.recipes[3].name}</h3><p>${recipes.recipes[3].tags}</p>`;
}

function goBack() {
  recipeCards.forEach(card => {
    if (recipes.currentIndex > 0) {
      recipes.currentIndex--;
      card.innerHTML = `<div class="button-holder"><button class="to-cook card-btn"><img class="pot-add icon" src="../assets/cooking-pot.svg"></button><button class="favorite card-btn"><img class="heart-add icon" src="../assets/heart.svg"></button></div><img src=${
        recipes.recipes[recipes.currentIndex].image
      }><h3>${recipes.recipes[recipes.currentIndex].name}</h3><p>${
        recipes.recipes[recipes.currentIndex].tags
      }</p>`;
    }
  })
}

function goForward() {
  recipeCards.forEach(card => {
    if(recipes.currentIndex < 50) {
      recipes.currentIndex++;
      card.innerHTML = `<div class="button-holder"><button class="to-cook card-btn"><img class="pot-add icon" src="../assets/cooking-pot.svg"></button><button class="favorite card-btn"><img class="heart-add icon" src="../assets/heart.svg"></button></div><img src=${recipes.recipes[recipes.currentIndex].image}><h3>${recipes.recipes[recipes.currentIndex].name}</h3><p>${recipes.recipes[recipes.currentIndex].tags}</p>`;
    }
  })
}

function addToFavorites (currentRecipe) {
  user.favoriteRecipes.push(currentRecipe);
}

function addToCookList(event) {

}