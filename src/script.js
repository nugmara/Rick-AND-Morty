const baseURL = "https://rickandmortyapi.com/api/character";
let allCharacters = [];

const fetchAllCharacters = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      allCharacters = allCharacters.concat(data.results);
      console.log("All characters have been fectched:", allCharacters);

      if (data.info.next) {
        await fetchAllCharacters(data.info.next);
      } else {
        renderCharacters();
      }
    } else {
      console.log("Error fetching characters:", data.error);
    }
  } catch (error) {
    console.log("An error occurred", error);
  }
};

const renderCharacters = () => {
  const charactersContainer = document.getElementById("characters-container");

  if (charactersContainer) {
    const charactersHTML = allCharacters
      .map(
        (character) => `
        <div class="md:flex character-card">
            <div class="character-image shrink-0">
                <img src="${character.image}" class="h-48 md:h-full md:w-48" alt="${character.name}">
            </div>
            <div class="character-info p-8">
                <div class=" uppercase tracking-wide text-sm text-indigo-500 font-semibold">${character.name}</div>
                <div class="block mt-1 text-lg leading-tight font-medium text-green-500">${character.status}</div>
                <div class="mt-2 text-slate-500">${character.species}</div>
            </div>
        </div>
        `
      )
      .join("");

    charactersContainer.innerHTML = charactersHTML;
  }
};

// Inicia la carga de personajes cuando se cargue la página
window.addEventListener("DOMContentLoaded", () => {
  fetchAllCharacters(baseURL);
});
