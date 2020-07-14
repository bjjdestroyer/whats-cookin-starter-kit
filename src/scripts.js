const userName = document.querySelector('.user-name');
const recipeCard1 = document.querySelector('.recipe-1');
const recipeCard2 = document.querySelector('.recipe-2');
const recipeCard3 = document.querySelector('.recipe-3');
const recipeCard4 = document.querySelector('.recipe-4');
const cardName1 = document.querySelector('.card-1-name');
const cardName2 = document.querySelector('.card-2-name');
const cardName3 = document.querySelector('.card-3-name');
const cardName4 = document.querySelector('.card-4-name');
const backBtn = document.querySelector('.back');
const forwardBtn = document.querySelector('.forward');
const pantryButton = document.querySelector('.pantry');
const favoritesButton = document.querySelector('.favorites-list');
const toCookBtn = document.querySelector('.to-cook-list');
const shoppingListBtn = document.querySelector('.shopping-list');
const filterBtn = document.querySelector('.dropdown-btn');
const closeButton = document.querySelector('.close-button');
const modal = document.querySelector('.modal');
const listTitle = document.querySelector('.modal-title');
const listContents = document.querySelector('.list');
const addList = document.querySelectorAll('.button-holder');
const searchBar = document.querySelector('.search-input');
const tagList = document.querySelector('.tag-list');

let recipes;
let user;
let currentCards = [];
let recipeCards = [recipeCard1, recipeCard2, recipeCard3, recipeCard4];

window.addEventListener('click', clickWrangler);
window.onload = instantiateWebsiteOnLoad();

// function addToLists(event) {
//   console.log(event);
// }

function clickWrangler(event) {
    modal.style.display = "none";
  if (event.target.closest("button") === pantryButton) {
    modal.style.display = "block";
    populateList('pantry');
  } else if (event.target.closest("button") === favoritesButton) {
    modal.style.display = "block";
    populateList("favorites");
  } else if (event.target.closest("button") === toCookBtn) {
    modal.style.display = "block";
    populateList("to-cook");
  } else if (event.target.closest("button") === shoppingListBtn) {
    modal.style.display = "block";
    populateList("shopping-list");
  } else if(event.target.closest("button") === filterBtn) {
    dropdownFilter();
  } else if(event.target.classList[0] === "tags") {
    dropdownFilter();
    modal.style.display = "block";
    displayTaggedRecipes(event.target.text);
  } else if (event.target.classList[0] === "heart-add") {
    addToFavorites(event.path[3].children[2].innerText);
  } else if (event.target.classList[0] === "pot-add") {
    addToCookList(event.path[3].children[2].innerText);
  } else if (event.target.closest(".card") === recipeCard1) {
    modal.style.display = "block";
    populateRecipe(1);
  } else if (event.target.closest(".card") === recipeCard2) {
    modal.style.display = "block";
    populateRecipe(2);
  } else if (event.target.closest(".card") === recipeCard3) {
    modal.style.display = "block";
    populateRecipe(3);
  } else if (event.target.closest(".card") === recipeCard4) {
    modal.style.display = "block";
    populateRecipe(4);
  }else if (
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

function populateList(listType) {
  if (listType === 'pantry') {
    listTitle.innerText = 'Pantry Contents';
    listContents.innerText = user.getPantryIngredients();
  } else if (listType === 'favorites') {
    listTitle.innerText = 'Favorite Recipes';
    listContents.innerText = user.favoriteRecipes;
  } else if (listType === 'to-cook') {
    listTitle.innerText = "Recipes to Cook";
    listContents.innerText = user.recipesToCook;
  } else if (listType === 'shopping-list') {
    listTitle.innerText = "Shopping List";
  }
}

function instantiateWebsiteOnLoad() {
  recipes = instantiateRecipes();
  instantiateEachRecipe(recipes);
  let randomUserIndex = getRandomIndex(usersData);
  user = instantiateUser(usersData[randomUserIndex]);
  populateUser(user);
  createCards(recipes);
}

function populateRecipe(cardNumber) {
  const cardName = document.querySelector(`.card-${cardNumber}-name`).innerText;
  let recipe = recipes.recipes.find(recipe => {
    return recipe.name === cardName;
  })
  listTitle.innerText = cardName;
  listContents.innerText = user.getFullRecipe(recipe);
  listContents.innerText += '\n Instructions: \n';
  recipe.instructions.forEach(instruction => {
    listContents.innerText += instruction.number + ' ' + instruction.instruction + '\n';
  })
  listContents.innerText += `Price: $${recipe.getTotalIngredientCost(recipe.ingredients)} \n \n`;
  listContents.innerText += user.pantry.canMakeRecipe(recipe);
  listContents.innerText += `\n \n You still need: \n ${user.listMissingIngredients(recipe)}`;
}

function getRandomIndex(array) {
  return Math.floor(array.length - (Math.random() * array.length));
}

function populateUser(user) {
  userName.innerText = `Hi ${user.name}!`;
}

function createCards(recipes) {
  recipeCards[0].innerHTML = `<div class="button-holder"><button class="to-cook card-btn"><img class="pot-add icon" src="../assets/cooking-pot.svg"></button><button class="favorite card-btn"><img class="heart-add icon" src="../assets/heart.svg"></button></div><img src=${recipes.recipes[0].image}><h3 class="card-1-name">${recipes.recipes[0].name}</h3><p>${recipes.recipes[0].tags}</p>`;

  recipeCards[1].innerHTML = `<div class="button-holder"><button class="to-cook card-btn"><img class="pot-add icon" src="../assets/cooking-pot.svg"></button><button class="favorite card-btn"><img class="heart-add icon" src="../assets/heart.svg"></button></div><img src=${recipes.recipes[1].image}><h3 class="card-2-name">${recipes.recipes[1].name}</h3><p>${recipes.recipes[1].tags}</p>`;

  recipeCards[2].innerHTML = `<div class="button-holder"><button class="to-cook card-btn"><img class="pot-add icon" src="../assets/cooking-pot.svg"></button><button class="favorite card-btn"><img class="heart-add icon" src="../assets/heart.svg"></button></div><img src=${recipes.recipes[2].image}><h3 class="card-3-name">${recipes.recipes[2].name}</h3><p>${recipes.recipes[2].tags}</p>`;

  recipeCards[3].innerHTML = `<div class="button-holder"><button class="to-cook card-btn"><img class="pot-add icon" src="../assets/cooking-pot.svg"></button><button class="favorite card-btn"><img class="heart-add icon" src="../assets/heart.svg"></button></div><img src=${recipes.recipes[3].image}><h3 class="card-4-name">${recipes.recipes[3].name}</h3><p">${recipes.recipes[3].tags}</p>`;
}

function goBack() {
  recipeCards.forEach((card, index) => {
    if (recipes.currentIndex > 0) {
      recipes.currentIndex--;
      card.innerHTML = `<div class="button-holder"><button class="to-cook card-btn"><img class="pot-add icon" src="../assets/cooking-pot.svg"></button><button class="favorite card-btn"><img class="heart-add icon" src="../assets/heart.svg"></button></div><img src=${
        recipes.recipes[recipes.currentIndex].image
      }><h3 class=card-${index+1}-name>${recipes.recipes[recipes.currentIndex].name}</h3><p>${
        recipes.recipes[recipes.currentIndex].tags
      }</p>`;
    }
  })
}

function goForward() {
  recipeCards.forEach((card, index) => {
    if(recipes.currentIndex < 49) {
      recipes.currentIndex++;
      card.innerHTML = `<div class="button-holder"><button class="to-cook card-btn"><img class="pot-add icon" src="../assets/cooking-pot.svg"></button><button class="favorite card-btn"><img class="heart-add icon" src="../assets/heart.svg"></button></div><img src=${recipes.recipes[recipes.currentIndex].image}><h3 class=card-${index+1}-name>${recipes.recipes[recipes.currentIndex].name}</h3><p>${recipes.recipes[recipes.currentIndex].tags}</p>`;
    }
  })
}

function addToFavorites (currentRecipe) {
  if (user.favoriteRecipes.indexOf(currentRecipe) === -1) {
    user.favoriteRecipes.push(currentRecipe);
  } else {
    return;
  }
}

function addToCookList(currentRecipe) {
  if (user.recipesToCook.indexOf(currentRecipe) === -1) {
    user.recipesToCook.push(currentRecipe);
  } else {
    return;
  }
}

function dropdownFilter() {
  tagList.classList.toggle('show');
}

function displayTaggedRecipes(tagToFilter) {
  let lowerTag = tagToFilter.toLowerCase();

  if (lowerTag === "misc") {
    lowerTag = "";
  }

  const filteredRecipes = recipes.filterByTag(lowerTag);

  const filteredTitles = filteredRecipes.reduce((titles, recipe) => {
    titles.push(recipe.name);
    return titles;
  }, []);

  listTitle.innerText = "Filtered Recipes";
  listContents.innerText = filteredTitles;
}
