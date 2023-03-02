const URL = "https://api.thecatapi.com/v1";

async function getCats() {
  const res = await fetch(URL + "/images/search?limit=10");
  const data = await res.json();

  for (const item in data) {
    const templateCard = `
      <div class="main__card">
        <div class="card__img">
          <img src="${data[item].url}" alt="${data[item].id}">
        </div>
        <button id="btn-add" onclick="${saveFavorite(data[item].id)}">Favorite</button>
      </div>
    `;
    const content = document.getElementById("main-content");
    content.innerHTML += templateCard;
  }
}

async function getFavorites() {
  const res = await fetch(URL + "/favourites");
  const data = await res.json();

  for (const item in data) {
    const templateCard = `
      <div class="main__card">
        <div class="card__img">
          <img src="${data[item].url}" alt="${data[item].id}">
        </div>
      </div>
    `;
    const content = document.getElementById("favorites-content");
    content.innerHTML += templateCard;

    console.log(data);
  }
}

async function saveFavorite(id) {
  const res = await fetch(URL + "/favourites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": "",
    },
    body: JSON.stringify({
      image_id: id,
    }),
  });

  const data = await res.json();
  console.log(data);
}

getCats();
