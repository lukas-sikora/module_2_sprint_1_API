let currentPage = 1;
let searchValue = "";
let characterStatus = "alive";
let maxPages;

const tileBox = document.getElementById("tile-container");
const searchInput = document.getElementById("search");
const selectStatus = document.querySelectorAll('input[name="status"]');

async function fetchCharacter() {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${currentPage}&name=${searchValue}&status=${characterStatus}`
    );
    const data = await response.json();
    characters = data.results;
    maxPages = data.info.pages;
    renderCharactersTile(data.results);
  } catch (error) {
    console.error("Problem z pobraniem danych", error);
    createNoResutlMessage();
  }
}

function renderCharactersTile(characters) {
  tileBox.innerHTML = "";

  characters.forEach((character) => {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.innerHTML = `
    <img src=${character.image} alt=${character.name}>
    <h2>${character.name}</h2>
    <div class=tile-info>
    <p>Status: ${character.status}</p>
    <p>Gatunke: ${character.species}</p>
    </div>`;
    tileBox.append(tile);
  });
}

searchInput.addEventListener("input", () => {
  searchValue = searchInput.value;
  currentPage = 1;
  fetchCharacter();
});

function nextPage() {
  if (currentPage < maxPages) currentPage++;
  fetchCharacter();
}

function prevPage() {
  if (currentPage > 1) currentPage--;
  fetchCharacter();
}

function createNoResutlMessage() {
  tileBox.innerHTML = "";
  const message = document.createElement("div");
  message.innerHTML = `<p id ="message" >Nie znaleziono postaci spełniających kryteria wyszukiwania.</p>`;
  tileBox.append(message);
}

selectStatus.forEach((radio) => {
  if (radio.value === "alive") {
    radio.checked = true;
  }

  radio.addEventListener("change", (event) => {
    characterStatus = event.target.value;
    currentPage = 1;
    fetchCharacter();
  });
});

fetchCharacter();
