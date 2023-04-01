// DOM Render function
function renderOneMovie(movie) {
    //create movie option
    let option = document.createElement('option');
    option.value = movie.id;
    option.textContent = movie.title;
    option.poster = movie.poster

    //add movie option to select element
    document.querySelector('#movie-select').appendChild(option);
}
  

//fetch request
//Get fetch for all movie resources
function getAllMovies() {
    fetch('http://localhost:3000/films')
      .then(resp => resp.json())
      .then(movieData => {
        // loop through movieData and render each movie
        movieData.forEach(movie => {
          renderOneMovie(movie);
        });
        // update movie details in html with first movie in array
      const firstMovie = movieData[0];
      document.querySelector('#movie-title').textContent = firstMovie.title;
      document.querySelector('#movie-runtime').textContent = `Runtime: ${firstMovie.runtime} minutes`;
      document.querySelector('#movie-showtime').textContent = `Showtime: ${firstMovie.showtime}`;
      document.querySelector('#movie-tickets-sold').textContent = firstMovie.tickets_sold;
      
      //calculate number of available tickets element
      const capacity = 100; // For example, the theater capacity is 100
      const ticketsSold = firstMovie.tickets_sold;
      const availableTickets = capacity - ticketsSold;
      //update available number ticket element
      document.querySelector('#movie-available-tickets')
      // set src attribute of img element to movie poster
      const posterImg = document.querySelector('#movie-poster');
      posterImg.setAttribute('src', firstMovie.poster);
    })
    .catch(error => console.error(error));
}
// initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Get data and render movies to the DOM
    getAllMovies();
  
    // Add event listener to buy ticket button
  document.querySelector('#buy-ticket-button').addEventListener('click', () => {
    const selectedMovieId = document.querySelector('#movie-select').value;
    if (selectedMovieId !== '') {
      // redirect to ticket purchase page with selected movie id
      window.location.href = `/purchase-ticket.html?movie=${selectedMovieId}`;
    }
  });
});