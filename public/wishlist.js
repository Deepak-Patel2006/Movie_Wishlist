const movie_card = document.getElementById("movie_card");
const user = document.getElementById("user");

const display = (datas) => {
 
  movie_card.innerHTML = "";

  datas.forEach((movies) => {
    const movie = document.createElement("div");

  movie.classList.add("movie");

    movie.innerHTML = `
      <div class="setter">
        <img src="${movies.movieId.poster}" alt="${movies.movieId.title}" data-id="${movies.movieId.imdbID}">
      </div>

      <div class="movie_info">
        <h3>
          ${movies.movieId.title}
          <span>${movies.movieId.year}</span>
        </h3>
      </div>

    <button
      class="remove"
      data-id="${movies.movieId._id}"
      data-imdbid="${movies.movieId.imdbID}"
      data-title="${movies.movieId.title}"
    >
      Remove from wishlist
    </button>
    `;

    movie_card.appendChild(movie);
  });
};

const removeDB = async(Id)=>{
    console.log(Id);
    
    const erasing = await fetch(`/wishlist/${Id}`,{
        method:'DELETE',
    })
    console.log(erasing);

    return;

};

movie_card.addEventListener("click", async(event) => {

  if (event.target.matches(".remove")) {
    const button = event.target;

    button.innerHTML = "Please wait ...";

    const movie_info = {
      id: button.dataset.id,
      imdb: button.dataset.imdbid,
      title: button.dataset.title,
    };
    console.log(movie_info);
    button.innerHTML = " 🗑️ Removing.....";

    const remove = await removeDB(movie_info.id)
    console.log(remove);
    
    button.parentElement.remove(); 

    }

});


async function loadWishlist() {
  try {
    const response = await fetch('/wishlist/getall');

    if (!response.ok) {
      throw new Error("Could not load movies");
    }
    const data = await response.json();

    display(data.movies);
    
  } catch (error) {
    console.log(error.message);
  }
}

loadWishlist();


const checkStatus = async () => {
  const answer = await fetch("/auth/status");
  const data = await answer.json();
  console.log(data.isloggedIn);
  if(data.isloggedIn){
    user.textContent = "Logout";
    user.dataset.loggedIn = data.isloggedIn;
  } else {
    user.textContent = "login";
  }
};
checkStatus();

user.addEventListener("click", async () => {

  const isLoggedIn = user.dataset.loggedIn === "true";

  if (!isLoggedIn) {
    window.location.href = "auth.html";
    return;
  }else{

    const answer = await fetch("/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await answer.json();
    message.textContent = `${data.message}`;
    message.removeAttribute("hidden");
    user.textContent = "Login";
  }
});


