// // // Your code here
// // fetch all posts
document.addEventListener("DOMContentLoaded", () => {
fetch('http://localhost:3000/films')
  .then((response) => response.json())
  .then((data) => {
    const movie_titles = document.getElementById("films")
    for(movies of data){
      movie_titles.innerHTML += `
      <div>
      <li onclick="fetch_data(${movies.id})">${movies.title}</li>
      
      <button onclick="delete_movies(${movies.id})"class="btn">Del</button>
      </div>
      `

      function delete_movies(id){
        fetch(`http://localhost:3000/films/${id}`,{
          method: 'DELETE',
        })
       .then((response) => response.json())
       .then((data) => {
         console.log(data);
        })
     alert('Deleted successfully');
       
     }}})

     
    
    


// fetch default
  fetch(`http://localhost:3000/films/1`,{
    method: 'GET',
  })
 .then((response) => response.json())
 .then((data) => {
   document.getElementById("poster").innerHTML = 
   `<img 
   src="${data.poster}"
   alt="[MOVIE TITLE]"/>`
      document.getElementById('title').innerHTML =` ${data.title}`
      document.getElementById('runtime').innerHTML = ` ${data.runtime}minutes`
      document.getElementById('film-info').innerHTML = ` ${data.film-info}`
      document.getElementById('showtime').innerHTML = ` ${data.showtime}`
      const tickets_remaining = document.getElementById("ticket-num")
      tickets_remaining.innerHTML = `[ ${data.capacity-data.ticket-sold}]`
      
  })
function fetchdata(id){
   fetch(`http://localhost:3000/films/${id}`,{
     method: 'GET',
   })
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("poster").innerHTML = 
    `<img 
    src="${data.poster}"
    alt="[MOVIE TITLE]"/>`
       document.getElementById('title').innerHTML =`${data.title}`
       document.getElementById('runtime').innerHTML = `${data.runtime}minutes`
       document.getElementById('film-info').innerHTML = `${data.film-info}`
       document.getElementById('showtime').innerHTML = `${data.showtime}`
       const movie_tickets_remaining = document.getElementById("ticket-num")
       movie_tickets_remaining.innerHTML = `[ ${data.capacity-data.ticket-sold}]`
       
   })

} const button = document.getElementById("buy-ticket").addEventListener("click",()=>{

 let ticket = document.getElementById('ticket-num');
 ticket.innerHTML = ''; // Clear previous output
 for (let i = 1; i <= 15; i++) {
     ticket.innerHTML += i + '<br>'; // Append each number with a line break



 }
 })
 })




