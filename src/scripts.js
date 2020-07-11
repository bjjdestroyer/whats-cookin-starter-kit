const userName = document.querySelector('.user-name');
const recipeCard1 = document.querySelector('.recipe-1');
const recipeCard2 = document.querySelector('.recipe-2');
const recipeCard3 = document.querySelector('.recipe-3');
const recipeCard4 = document.querySelector('.recipe-4');
const pantryBtn = document.querySelector('.pantry');

let recipes;
let user;
let randomCards = [];

window.onload = instantiateWebsiteOnLoad();
//pantryBtn.addEventListener('click', popUpWindow);

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
  //randomCards = randomizeCard(recipes);
  createCards(recipes);
}

function getRandomIndex(array) {
  return Math.floor(array.length - (Math.random() * array.length));
}

function populateUser(user) {
  userName.innerText = `Hi ${user.name}!`;
}
// for recipes, do forEach for each recipe and create an array of index values
// function randomizeCard(recipes) {
//   recipes.forEach(recipe => randomCards.push(getRandomIndex(recipes)))

//   return randomCards;
// }

// on load, we want to make recipes in a recipe card - done
// for the four cards, use the random index array to select each recipe
// for each card, insert the necessary data
// we want to select each of the four cards and put their info on cards

function createCards(recipes) {
  recipeCard1.insertAdjacentHTML('beforeend', `<img src=${recipes.recipes[0].image}><h3>${recipes.recipes[0].name}</h3><p>${recipes.recipes[0].tags}</p>`);

  recipeCard2.insertAdjacentHTML('beforeend', `<img src=${recipes.recipes[1].image}><h3>${recipes.recipes[1].name}</h3><p>${recipes.recipes[1].tags}</p>`);

  recipeCard3.insertAdjacentHTML('beforeend', `<img src=${recipes.recipes[2].image}><h3>${recipes.recipes[2].name}</h3><p>${recipes.recipes[2].tags}</p>`);

  recipeCard4.insertAdjacentHTML('beforeend', `<img src=${recipes.recipes[3].image}><h3>${recipes.recipes[3].name}</h3><p>${recipes.recipes[3].tags}</p>`);
}

// <img class="recipe-img" src="recipes[randomCards[0]].recipe.image">
// <p class="tags">recipes[randomCards[0]].recipe.tags</p>

// want to get individual recipe name from recipes 