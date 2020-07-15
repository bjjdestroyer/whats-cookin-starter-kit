const userName = document.querySelector('.user-name');
const recipeCard1 = document.querySelector('.recipe-1');
const recipeCard2 = document.querySelector('.recipe-2');
const recipeCard3 = document.querySelector('.recipe-3');
const recipeCard4 = document.querySelector('.recipe-4');
const pantryButton = document.querySelector('.pantry');
const favoritesButton = document.querySelector('.favorites-list');
const toCookBtn = document.querySelector('.to-cook-list');
const shoppingListBtn = document.querySelector('.shopping-list');
const filterBtn = document.querySelector('.dropdown-btn');
const modal = document.querySelector('.modal');
const listTitle = document.querySelector('.modal-title');
const listContents = document.querySelector('.list');
const tagList = document.querySelector('.tag-list');
const userInput = document.querySelector('form');
const submitInput = document.querySelector('.search-submit');

let recipes;
let user;
let recipeCards = [recipeCard1, recipeCard2, recipeCard3, recipeCard4];
let searchValue;

// window.addEventListener('click', clickWrangler);
// window.onload = instantiateWebsiteOnLoad();
// userInput.addEventListener('input', keepInput);

function clickWrangler(event) {
  modal.style.display = "none";
  if (event.target.closest("button") === pantryButton) {
    modal.style.display = "block";
    populateList("pantry");
  } else if (event.target.closest("button") === favoritesButton) {
    modal.style.display = "block";
    populateList("favorites");
  } else if (event.target.closest("button") === toCookBtn) {
    modal.style.display = "block";
    populateList("to-cook");
  } else if (event.target.closest("button") === shoppingListBtn) {
    modal.style.display = "block";
    populateList("shopping-list");
  } else if (event.target.closest("button") === filterBtn) {
    dropdownFilter();
  } else if (event.target.classList[0] === "tags") {
    dropdownFilter();
    modal.style.display = "block";
    displayTaggedRecipes(event.target.text);
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
  } else if (event.target.closest("button") === submitInput) {
    modal.style.display = "block";
    searchForRecipes(searchValue);
  }
}

function getRandomIndex(array) {
  return Math.floor(array.length - Math.random() * array.length);
}

// Functions on Window Load

function instantiateWebsiteOnLoad() {
  recipes = instantiateRecipes();
  instantiateEachRecipe(recipes);
  let randomUserIndex = getRandomIndex(usersData);
  user = instantiateUser(usersData[randomUserIndex]);
  populateUser(user);
  createCards(recipes);
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

function populateUser(user) {
  userName.innerText = `Hi ${user.name}!`;
}

function createCards(recipes) {
  recipeCards[0].innerHTML = `<div class="button-holder">
    <button class="to-cook card-btn"><img class="pot-add icon" src="../assets/cooking-pot.svg"></button>
    <button class="favorite card-btn"><img class="heart-add icon" src="../assets/heart.svg"></button>
  </div>
  <img src=${recipes.recipes[0].image}>
  <h3 class="card-1-name">${recipes.recipes[0].name}</h3>
  <p>${recipes.recipes[0].tags}</p>`;

  recipeCards[1].innerHTML = `<div class="button-holder">
    <button class="to-cook card-btn"><img class="pot-add icon" src="../assets/cooking-pot.svg"></button>
    <button class="favorite card-btn"><img class="heart-add icon" src="../assets/heart.svg"></button>
  </div>
  <img src=${recipes.recipes[1].image}>
  <h3 class="card-1-name">${recipes.recipes[1].name}</h3>
  <p>${recipes.recipes[1].tags}</p>`;

  recipeCards[2].innerHTML = `<div class="button-holder">
    <button class="to-cook card-btn"><img class="pot-add icon" src="../assets/cooking-pot.svg"></button>
    <button class="favorite card-btn"><img class="heart-add icon" src="../assets/heart.svg"></button>
  </div>
  <img src=${recipes.recipes[2].image}>
  <h3 class="card-1-name">${recipes.recipes[2].name}</h3>
  <p>${recipes.recipes[2].tags}</p>`;

  recipeCards[3].innerHTML = `<div class="button-holder">
    <button class="to-cook card-btn"><img class="pot-add icon" src="../assets/cooking-pot.svg"></button>
    <button class="favorite card-btn"><img class="heart-add icon" src="../assets/heart.svg"></button>
  </div>
  <img src=${recipes.recipes[3].image}>
  <h3 class="card-1-name">${recipes.recipes[3].name}</h3>
  <p>${recipes.recipes[3].tags}</p>`;
}

// Add Lists to Modal Windows

function populateList(listType, listInfo) {
  if (listType === "pantry") {
    listTitle.innerText = "Pantry Contents";
    listContents.innerText = user.getPantryIngredients();
  } else if (listType === "favorites") {
    listTitle.innerText = "Favorite Recipes";
    listContents.innerText = user.favoriteRecipes.join("\n");
  } else if (listType === "to-cook") {
    listTitle.innerText = "Recipes to Cook";
    listContents.innerText = user.recipesToCook.join("\n");
  } else if (listType === "shopping-list") {
    listTitle.innerText = "Shopping List";
  } else if (listType === "filtered") {
    listTitle.innerText = "Filtered Recipes";
    listContents.innerText = listInfo.join("\n");
  } else if (listType === 'searched') {
    listTitle.innerText = "Searched Ingredients & Recipes";
    listContents.innerText = listInfo.join('\n');
  }
}

// Add Recipe Info to Modal Window

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

// Pagination Functions

function goBack() {
  recipeCards.forEach((card, index) => {
    if (recipes.currentIndex > 0) {
      recipes.currentIndex--;
      card.innerHTML = `<div class="button-holder">
      <button class="to-cook card-btn"><img class="pot-add icon" src="../assets/cooking-pot.svg"></button>
      <button class="favorite card-btn"><img class="heart-add icon" src="../assets/heart.svg"></button>
      </div>
      <img src=${recipes.recipes[recipes.currentIndex].image}> 
      <h3 class=card-${index + 1}-name>${recipes.recipes[recipes.currentIndex].name}</h3>
      <p>${recipes.recipes[recipes.currentIndex].tags}</p>`;
    }
  })
}

function goForward() {
  recipeCards.forEach((card, index) => {
    if (recipes.currentIndex < 49) {
      recipes.currentIndex++;
      card.innerHTML = `<div class="button-holder">
      <button class="to-cook card-btn"><img class="pot-add icon" src="../assets/cooking-pot.svg"></button>
      <button class="favorite card-btn"><img class="heart-add icon" src="../assets/heart.svg"></button>
      </div>
      <img src=${recipes.recipes[recipes.currentIndex].image}>
      <h3 class=card-${index + 1}-name>${recipes.recipes[recipes.currentIndex].name}</h3>
      <p>${recipes.recipes[recipes.currentIndex].tags}</p>`;
    }
  })
}

// Filter Functions

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

  populateList('filtered', filteredTitles);
}


// Search Functions 

function keepInput(event) {
  searchValue = event.target.value;
}

function searchForRecipes(inputValue) {
  event.preventDefault();
  const ingredientRecipes = recipes.filterByIngredient(inputValue);
  const searchedRecipes = searchRecipes(ingredientRecipes, inputValue);
  const allRecipes = ingredientRecipes.concat(searchedRecipes);

  console.log(ingredientRecipes);
  console.log(searchedRecipes);
  console.log(allRecipes);

  const finalList = allRecipes.map(recipe => {
    return recipe.name;
  })

  populateList('searched', finalList);
}

function searchRecipes(ingredientRecipes, inputValue) {
  return recipes.recipes.filter( recipe => {
    const redoneRecipe = recipe.name.toLowerCase();
    if (redoneRecipe.includes(inputValue) && ingredientRecipes.indexOf(recipe) === -1) {
      return recipe;
    }
  });
}


module.exports = {
  getRandomIndex: getRandomIndex,
  searchForRecipes: searchForRecipes,
  searchRecipes: searchRecipes
}
