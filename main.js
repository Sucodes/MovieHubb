// Selectors
const openMenu = document.querySelector("#menu");
const menuNav = document.querySelector("#overlay");
const closeMenu = document.querySelector(".close");
const toggleBtn = document.querySelector(".toggle");
const homeBtn = document.querySelector("#home");
const input = document.querySelector("#input");
const moon = document.querySelector(".dark");
const sun = document.querySelector(".light");
const body = document.querySelector(".container");
const icon = document.querySelectorAll("svg");
const searchBar = document.querySelector(".search");
const searchBtn = document.querySelector("#searchBtn");
const openSearchBar = document.querySelector("#search");
const closeSearchBar = document.querySelector(".close__search");
const searchResult = document.querySelector(".results");
const movieList = document.querySelector(".movie__list");


// Make movie API calls
let movie = {
  movieApi: "https://yts.mx/api/v2/list_movies.json?quality=3D",

  // Fetch movie list from API and display on index page
  fetchMovies: async function getUser() {
    try {
      const getRequest = await fetch(this.movieApi);
      const data = await getRequest.json();
      const movies = await data.data.movies;
      let list = "";
      movies.forEach((element) => {
        function displayMovie() {
          // Displaying results
          list += `
            <div class="card">
              <div class="img"><img src="${element.medium_cover_image}"></div>
              <div class="card--details">
                <div class="card--text">
                  <h2> ${element.title} <h2>
                  <p> ${element.year} </p>
                </div>
                <div class="card--btn">
                  <a href="#" onclick="movie.getMovie('${element.id}')">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path d="M256 0C114.6 0 0 114.6 0 256c0 141.4 114.6 256 256 256s256-114.6 256-256C512 114.6 397.4 0 256 0zM406.6 278.6l-103.1 103.1c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25L306.8 288H128C110.3 288 96 273.7 96 256s14.31-32 32-32h178.8l-49.38-49.38c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l103.1 103.1C414.6 241.3 416 251.1 416 256C416 260.9 414.6 270.7 406.6 278.6z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          `;
        }
        displayMovie();
      });
      movieList.innerHTML = list;
    } catch (err) {
      console.log("Err", err);
      return { errMsg: err };
    }
  },

  // Get specific movie using movie id and switch to movie detail page
  getMovie: function movieChoice(id) {
    sessionStorage.setItem("movieId", id);
    location.assign("movie.html");
    return false;
  },

  // Fetch movie detail using unique movie id
  selectMovie: async function choice() {
    try {
      let movieId = sessionStorage.getItem("movieId");
      const getRequest = await fetch(
        "https://yts.mx/api/v2/movie_details.json?movie_id=" + movieId
      );
      const data = await getRequest.json();
      const movies = await data.data.movie;
      let output = `
          <div class="movie__details--img">
              <img src="${movies.medium_cover_image}" alt="">
          </div>
            
          <div class="movie__details--text">
            <h2> ${movies.title} </h2>

            <div>
              <p> ${movies.year} </p>
              <p> ${movies.genres} </p>
            </div>

            <p> ${movies.description_intro} </p>

            <div class="btn">
              <button>
                <a href="${movies.url}" target="_blank"> Watch Now </a>
              </button>

              <button>
                <a href="${movies.torrents[0].url}"> Download </a>
              </button>
            </div>
          </div>
        `;
      const movieList = document.querySelector(".movie__details");
      movieList.innerHTML = output;
    } catch (err) {
      console.log("Err", err);
      return { errMsg: err };
    }
  },

  // Search for a specific movie in search bar
  searchMovie: function search() {
    searchBar.style.width = "100%";

    closeSearchBar.onclick = function close() {
      searchBar.style.width = "0%";
    };

    searchBtn.addEventListener("click", async (specificMovie) => {
      try {
        let specificMovie = input.value;
        const getRequestMovie = await fetch(
          `https://yts.mx/api/v2/list_movies.json?query_term= ${specificMovie}`
        );
        const data = await getRequestMovie.json();
        const movieList = await data.data.movies;
        console.log(movieList);
        let list = "";
        movieList.forEach((element) => {
          list += `
            <div class="card">
              <img src="${element.medium_cover_image}">
              <div class="card--details">
                <div class="card--text">
                  <h2> ${element.title} <h2>
                  <p> ${element.year} </p>
                </div>
                <div class="card--btn">
                  <a href="#" onclick="movie.getMovie('${element.id}')">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path d="M256 0C114.6 0 0 114.6 0 256c0 141.4 114.6 256 256 256s256-114.6 256-256C512 114.6 397.4 0 256 0zM406.6 278.6l-103.1 103.1c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25L306.8 288H128C110.3 288 96 273.7 96 256s14.31-32 32-32h178.8l-49.38-49.38c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l103.1 103.1C414.6 241.3 416 251.1 416 256C416 260.9 414.6 270.7 406.6 278.6z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          `;
        });
        searchResult.innerHTML = list;
      } catch (err) {
        console.log("Err", err);
        searchResult.innerHTML = "Oops, something went wrong." + "<br>" + "Please try again";
        return { errMsg: err };
      }
    });
  }
};

movie.fetchMovies();


// Open Navigation bar
openMenu.onclick = () => {menuNav.style.width = "100%";}

// Close Navigation bar
closeMenu.onclick = () => {menuNav.style.width = "0%";}

// Return to index page
function home() {location.assign("index.html");}

// Toggle between light and dark modes
toggleBtn.onclick = () => {
  body.style.transition = "0.5s";
  body.classList.toggle("light-mode");
  if (sun.style.display == "none") {
    body.style.transition = "0.5s";
    sun.style.display = "block";
    moon.style.display = "none";
  } else {
    body.style.transition = "0.5s";
    sun.style.display = "none";
    moon.style.display = "block";
  }
}

// Scroll reveal effect on home section
ScrollReveal({
  reset: true,
  distance: "60px",
  duration: 2500,
  delay: 200,
});

ScrollReveal().reveal(".home", { origin: "left" });