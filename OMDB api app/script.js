const API_KEY = '3e6ce17c';
const searchInput = document.getElementById('searchInput');
const moviesList = document.getElementById('moviesList');

let debounceTimer;

searchInput.addEventListener('input', function () {
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm !== '') {
            searchMovies(searchTerm);
        } else {
            moviesList.innerHTML = '';
        }
    }, 500); // Debounce time: 500 milliseconds
});

function searchMovies(query) {
    const url = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.Search) {
                const movies = data.Search;
                displayMovies(movies);
            } else {
                moviesList.innerHTML = '<p>No results found</p>';
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayMovies(movies) {
    moviesList.innerHTML = '';

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `<h3>${movie.Title}</h3><p>${movie.Year}</p>`;
        moviesList.appendChild(movieElement);
    });
}
