const movie_card = document.getElementById("movie_card");
const more = document.getElementById("more");
const message = document.querySelector(".info_message");
const user = document.getElementById("user");
let arr = ["Avengers","Attack","Mission","transformers","motu patlu","king","Murder","X men","Black","dhoni"];


const display = (datas) => {
  // console.log(datas);

  datas.forEach((movies) => {
    const movie = document.createElement("div");

    movie.classList.add("movie");

    movie.innerHTML = `
      <div class="setter">
        <img src="${movies.Poster}" alt="${movies.Title}" data-id="${movies.imdbID}">
      </div>

      <div class="movie_info">
        <h3>
          ${movies.Title}
          <span>${movies.Year}</span>
        </h3>
      </div>

  <button
    class="add_btn"
    data-id="${movies.imdbID}"
    data-title="${movies.Title}"
    data-year="${movies.Year}"
    data-poster="${movies.Poster}"
  >
    Add to wishlist
  </button>
    `;

    movie_card.appendChild(movie);
  });
};

const display_big = (data) => {
  const modal_card = document.createElement("div");
  modal_card.classList.add("modal_card");

  modal_card.innerHTML = `
    <button class="close_modal">❌</button>

    <div class="big_card">
      <img
        class="detail_poster"
        src="${data.Poster}"
        alt="${data.Title}"
      >

      <div class="sub_big">
        <h2>${data.Title}</h2>

        <p>
          ${data.Year}
          <span> ● </span>
          <span> ${data.Genre} </span>
        </p>

        <p>
          Director : ${data.Director} ,
          Writer : ${data.Writer}
        </p>

        <p>Actors : ${data.Actors}</p>
        <p>Rating : ${data.imdbRating}</p>

        <p>
          Runtime : ${data.Runtime},
        </p>
        <p>Languages : ${data.Language}</p>
      </div>
    </div>
    <div class="lines1"></div>
    <h3>Summary :</h3>
    <p>${data.Plot}</p>
  `;

  let movie_modal = document.querySelector(".movie_modal");
  movie_modal.appendChild(modal_card);

  let loader = document.querySelector(".loader");
  loader.setAttribute("id", "hide");

  document.body.style.overflow = "hidden";
  const close_btn = modal_card.querySelector(".close_modal");

  close_btn.addEventListener("click", () => {
    movie_modal.remove();
    document.body.style.overflow = "";
  });
};

const showbig = async (id) => {
  const movie_modal = document.createElement("div");
  movie_modal.classList.add("movie_modal");

  movie_modal.innerHTML = `
    <div class="loader">
    <label>Loading please wait ...</label>
    <div class="loading"></div>
  `;
  const loader = document.createElement("div");
  loader.classList.add("loader");

  document.body.appendChild(movie_modal);

  console.log(`From the show big = ${id}`);

  const answer = await fetch(`/wishlist/icon?Id=${id}`);

  const data = await answer.json();
  console.log(data.full_data);
  display_big(data.full_data);
};

const saveDB = async (data) => {
  console.log(data);

  const answer = await fetch("/wishlist/listing", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      imdbID: data.imdbID,
      title: data.title,
      year: data.year,
      poster: data.poster,
    }),
  });

  const ans = await answer.json();
  console.log(ans);
  return ans;
};

movie_card.addEventListener("click", async (event) => {
  // icons ki rest api call hogi
  if (event.target.matches(".setter img")) {
    console.log("Show movie details in bigger version !!!");
    console.log(event.target.dataset.id);
    showbig(event.target.dataset.id);
  }

  // Mongo call save ke liye jayegi
  if (event.target.matches(".add_btn")) {
    const button = event.target;

    button.innerHTML = "Please wait ...";

    const movie_info = {
      imdbID: button.dataset.id,
      title: button.dataset.title,
      year: button.dataset.year,
      poster: button.dataset.poster,
    };

    let check = await saveDB(movie_info);
    console.log(check);

    if (check.success === true) {
      if (check.successed === true) {
        button.innerHTML = "Already listed";
        button.classList.remove("add_btn");
        button.classList.add("added_btn");
      } else {
        button.innerHTML = " ✔ Added to wishlist";
        button.classList.remove("add_btn");
        button.classList.add("added_btn");
      }
    } else {
      message.textContent = `${check.message}`;
      message.removeAttribute("hidden");
      alert(`${check.message}`);
      // setTimeout(() => {
      //   window.location.replace(check.redirectURL);
      // }, 1000);
    }
  }
});

document.getElementById("search").addEventListener("click", async () => {
  const name = document.getElementById("check").value;
  console.log(name);

  const answer = await fetch(`/wishlist/search?title=${name}`);

  const data = await answer.json();
  console.log(data);
  movie_card.innerHTML = "";
  display(data.data.Search);
  more.removeAttribute("hidden");
});

more.addEventListener("click", async () => {
  const name = document.getElementById("check").value;
  const card = document.getElementById("movie_card");
  console.log(name);

  const pages = card.childElementCount / 10 + 1;
  console.log(pages);

  const answer = await fetch(`/wishlist/load?title=${name}&pages=${pages}`);

  const data = await answer.json();
  console.log(data);
  display(data.movie_data.Search);
});

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
    user.dataset.loggedIn = 'false';
  }
});

let call_random = async(name)=>{
  const answer = await fetch(`/wishlist/search?title=${name}`);

  const data = await answer.json();
  console.log(data);
  movie_card.innerHTML = "";
  display(data.data.Search);
}

let stored = Math.floor(Math.random() * 9);

call_random(arr[stored]);

