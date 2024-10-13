// // // Your code here
// // fetch all posts
// fetch('http://localhost:3000/films')
//   .then((response) => response.json())
//   .then((data) => {
//     const movie_titles = document.getElementById("films")
//     for(movies of data){
//       movie_titles.innerHTML += `
//       <div>
//       <li onclick="fetch_data(${movies.id})">${movies.title}</li>
      
//       <button onclick="delete_movies(${movies.id})"class="btn">X</button>
//       </div>
//       `

//       function delete_movies(id){
//         fetch(`http://localhost:3000/films/${id}`,{
//           method: 'DELETE',
//         })
//        .then((response) => response.json())
//        .then((data) => {
//          console.log(data);
//         })
//      alert('deleted successfully');
       
//      }}})
     
    
    

// // const button = document.getElementById("buy-ticket").addEventListener("click",()=>{

// // let ticket = document.getElementById('ticket-num');
// // ticket.innerHTML = ''; // Clear previous output
// // for (let i = 1; i <= 15; i++) {
// //     ticket.innerHTML += i + '<br>'; // Append each number with a line break



// // }
// // })
// // })
//   fetch(`http://localhost:3000/films/1`,{
//     method: 'GET',
//   })
//  .then((response) => response.json())
//  .then((data) => {
//    document.getElementById("poster").innerHTML = 
//    `<img 
//    src="${data.poster}"
//    alt="[MOVIE TITLE]"/>`
//       document.getElementById('title').innerHTML =` ${data.title}`;
//       document.getElementById('runtime').innerHTML = ` ${data.runtime}minutes`
//       document.getElementById('film-info').innerHTML = ` ${data.film-info}`
//       document.getElementById('showtime').innerHTML = ` ${data.showtime}`
//       const movie_tickets_remaining = document.getElementById("ticket-num")
//       movie_tickets_remaining.innerHTML = `[ ${data.capacity-data.ticket-sold}]`;
      
//   })
// function fetch_data(id){
//    fetch(`http://localhost:3000/films/${movies.id}`,{
//      method: 'GET',
//    })
//   .then((response) => response.json())
//   .then((data) => {
//     document.getElementById("poster").innerHTML = 
//     `<img 
//     src="${data.poster}"
//     alt="[MOVIE TITLE]"/>`
//        document.getElementById('title').innerHTML =` ${data.title}`;
//        document.getElementById('runtime').innerHTML = ` ${data.runtime}minutes`
//        document.getElementById('film-info').innerHTML = ` ${data.film-info}`
//        document.getElementById('showtime').innerHTML = ` ${data.showtime}`
//        const movie_tickets_remaining = document.getElementById("ticket-num")
//        movie_tickets_remaining.innerHTML = `[ ${data.capacity-data.ticket-sold}]`;
       
//    })

// }
document.addEventListener("DOMContentLoaded", () => {
  const filmsList = document.getElementById("films");
  const filmTitle = document.getElementById("film-title");
  const filmPoster = document.getElementById("film-poster");
  const filmRuntime = document.getElementById("film-runtime");
  const filmShowtime = document.getElementById("film-showtime");
  const filmDescription = document.getElementById("film-description");
  const availableTickets = document.getElementById("available-tickets");
  const buyTicketButton = document.getElementById("buy-ticket-button");

  // Fetch all films
  fetch("http://localhost:3000/films")
      .then(response => response.json())
      .then(films => {
          films.forEach(film => {
              const li = document.createElement("li");
              li.className = "film item";
              li.textContent = film.title;
              li.dataset.id = film.id;
              li.addEventListener("click", () => displayFilmDetails(film));
              filmsList.appendChild(li);
          });
          // Remove placeholder li if needed
          // const placeholder = document.querySelector("#films li.placeholder");
          // if (placeholder) placeholder.remove();
      });

  function displayFilmDetails(film) {
      filmTitle.textContent = film.title;
      filmPoster.src = film.poster;
      filmRuntime.textContent = `Runtime: ${film.runtime} minutes`;
      filmShowtime.textContent = `Showtime: ${film.showtime}`;
      filmDescription.textContent = film.description;

      const ticketsAvailable = film.capacity - film.tickets_sold;
      availableTickets.textContent = `Available Tickets: ${ticketsAvailable}`;

      if (ticketsAvailable <= 0) {
          buyTicketButton.textContent = "Sold Out";
          buyTicketButton.disabled = true;
          filmsList.querySelector(`[data-id='${film.id}']`).classList.add("sold-out");
      } else {
          buyTicketButton.textContent = "Buy Ticket";
          buyTicketButton.disabled = false;
          buyTicketButton.onclick = () => purchaseTicket(film);
      }
  }

  function purchaseTicket(film) {
      const ticketsAvailable = film.capacity - film.tickets_sold;
      if (ticketsAvailable <= 0) return;

      // Update the server
      const updatedTicketsSold = film.tickets_sold + 1;
      fetch(`http://localhost:3000/films/${film.id}`, {
          method: "PATCH",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ tickets_sold: updatedTicketsSold })
      })
          .then(response => response.json())
          .then(updatedFilm => {
              displayFilmDetails(updatedFilm);
              // Optionally post the ticket purchase
              fetch("/tickets", {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                      film_id: updatedFilm.id,
                      number_of_tickets: 1
                  })
              });
          });
  }
});