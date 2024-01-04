const searchInput = document.getElementById('searchInput');
const recipesList = document.getElementById('recipesList');

let throttleTimer;
const THROTTLE_TIME = 500; // Throttle time: 500 milliseconds

searchInput.addEventListener('input', function () {
    clearTimeout(throttleTimer);

    throttleTimer = setTimeout(() => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm !== '') {
            searchRecipes(searchTerm);
        } else {
            recipesList.innerHTML = '';
        }
    }, THROTTLE_TIME);
});

function searchRecipes(query) {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.meals) {
                const recipes = data.meals;
                displayRecipes(recipes);
            } else {
                recipesList.innerHTML = '<p>No results found</p>';
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayRecipes(recipes) {
    recipesList.innerHTML = '';

    recipes.forEach(recipe => {
        const recipeElement = document.createElement('div');
        recipeElement.classList.add('recipe');
        recipeElement.innerHTML = `<h3>${recipe.strMeal}</h3><p>${recipe.strCategory}</p>`;
        recipesList.appendChild(recipeElement);
    });
}
