// Titles: https://omdbapi.com/?s=thor&page=1&apikey=fc1fef96
// details: http://www.omdbapi.com/?i=tt3896198&apikey=fc1fef96

const movieSearchBox1 = document.getElementById('movie-search-box1');
const searchList1 = document.getElementById('search-list1');
const resultGrid1 = document.getElementById('result-grid1');

// load movies from API
async function loadMovies(searchTerm1){
    const URL = `https://omdbapi.com/?s=${searchTerm1}&page=1&apikey=fc1fef96`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    // console.log(data.Search);
    if(data.Response == "True") displayMovieList(data.Search);
}

function findMovies1(){
    let searchTerm1 = (movieSearchBox1.value).trim();
    if(searchTerm1.length > 0){
        searchList1.classList.remove('hide-search-list');
        loadMovies(searchTerm1);
    } else {
        searchList1.classList1.add('hide-search-list1');
    }
}

function displayMovieList1(movies){
    searchList1.innerHTML = "";
    for(let idx = 0; idx < movies.length; idx++){
        let movieListItem1 = document.createElement('div');
        movieListItem1.dataset.id = movies[idx].imdbID; // setting movie id in  data-id
        movieListItem1.classList.add('search-list-item');
        if(movies[idx].Poster != "N/A")
            moviePoster = movies[idx].Poster;
        else 
            moviePoster = "image_not_found.png";

        movieListItem1.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[idx].Title}</h3>
            <p>${movies[idx].Year}</p>
        </div>
        `;
        searchList1.appendChild(movieListItem1);
    }
    loadMovieDetails();
}

function loadMovieDetails(){
    const searchListMovies1 = searchList1.querySelectorAll('.search-list-item1');
    searchListMovies1.forEach(movie => {
        movie.addEventListener('click', async () => {
            // console.log(movie.dataset.id);
            searchList1.classList1.add('hide-search-list');
            movieSearchBox1.value = "";
            const result1 = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=fc1fef96`);
            const movieDetails1 = await result.json();
            // console.log(movieDetails1);
            displayMovieDetails(movieDetails1);
        });
    });
}

function displayMovieDetails(details){
    resultGrid1.innerHTML = `
    <div class = "movie-poster">
        <img src = "${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt = "movie poster">
    </div>
    <div class = "movie-info">
        <h3 class = "movie-title">${details.Title}</h3>
        <ul class = "movie-misc-info">
            <li class = "year">Year: ${details.Year}</li>
            <li class = "rated">Ratings: ${details.Rated}</li>
            <li class = "released">Released: ${details.Released}</li>
        </ul>
        <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
        <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
        <p class = "actors"><b>Actors: </b>${details.Actors}</p>
        <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
        <p class = "language"><b>Language:</b> ${details.Language}</p>
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards}</p>
    </div>
    `;
}


window.addEventListener('click', (event) => {
    if(event.target.className != "form-control"){
        searchList1.classList1.add('hide-search-list1');
    }
});
