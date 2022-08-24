let movie = {
  movieApi: "https://yts.mx/api/v2/list_movies.json?quality=3D",
  fetchMovie: async function getUser() {
    try {
      const getRequest = await fetch(
        "https://yts.mx/api/v2/list_movies.json?quality=3D"
      );
      const data = await getRequest.json();
      const movies = await data.data.movies;
      for (const element of movies) {
        console.log(element);
        if (element != [50]) {
          console.log("hi");
          document.querySelector(".home").style.backgroundImage =
            "url(./images/movie.jpg)";
        } else {
          console.log("hey");
          document.querySelector(".home").style.backgroundImage =
            "url(" + element.background_image + ")";
        }
      }
      let list = "";
      movies.forEach((element) => {
        function displayMovie() {
          // Displaying results
          list += `
                    <div class="card">
                        <img src="${element.medium_cover_image}">
                        <div class="card--details">
                            <div class="card--text">
                                <h2> ${element.title} <h2>
                                <p> ${element.year} </p>
                            </div>
                        <div class="card--btn">
                            <a href="#" onclick="getMovie('${element.id}')">
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
      const movieList = document.querySelector(".movie__list");
      movieList.innerHTML = list;
    } catch (err) {
      console.log("Err", err);
      return { errMsg: err };
    }
  },
};

movie.fetchMovie();

function getMovie(id) {
  sessionStorage.setItem("movieId", id);
  location.assign("movie.html");
  return false;
}

async function selectMovie() {
  try {
    let movieId = sessionStorage.getItem("movieId");
    const getRequest = await fetch(
      "https://yts.mx/api/v2/movie_details.json?movie_id=" + movieId
    );
    const data = await getRequest.json();
    const movies = await data.data.movie;
    console.log(movies);
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
}