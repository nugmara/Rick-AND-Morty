const baseURL = "https://rickandmortyapi.com/api/character";
let allCharacters = []

const fetchAllCharacters = async (url) => {
    try {
        const response = await fetch(url)
        const data = await response.json()

        if (response.ok) {
            allCharacters = allCharacters.concat(data.results)
            console.log("All characters have been fectched:", allCharacters);

            if (data.info.next) {
                await fetchAllCharacters(data.info.next)
            } else {
                renderCharacters()
            }
        } else {
            console.log("Error fetching characters:", data.error )
        }
    } catch (error) {
        console.log("An error occurred", error)
    }
}

function renderCharacters() {
    const charactersList = document.getElementById("characters-list");
    allCharacters.forEach((character) => {
        const listItem = document.createElement("article");
        listItem.classList.add("character-card", "bg-zinc-800", "rounded-lg", "shadow-lg", "w-full", "md:w-1/2", "lg:w-1/3");

        // Create a div for the character image
        const characterImage = document.createElement("div");
        characterImage.classList.add("character-image", "w-1/3"); // Tailwind CSS classes for styling
        const imageElement = document.createElement("img");
        imageElement.src = character.image;
        imageElement.classList.add("w-full", "h-auto");
        characterImage.appendChild(imageElement);

        // Create a div for character information
        const characterInfo = document.createElement("div");
        characterInfo.classList.add("character-info", "w-2/3", "p-4"); // Tailwind CSS classes for styling

        // Set character name
        const characterName = document.createElement("div");
        characterName.textContent = character.name;
        characterName.classList.add("text-lg", "font-bold", "text-white");

        // Set character status
        const characterStatus = document.createElement("div");
        characterStatus.textContent = character.status;
        characterStatus.classList.add("text-base", "text-green-500");

        // Set character species
        const characterSpecies = document.createElement("div");
        characterSpecies.textContent = character.species;
        characterSpecies.classList.add("text-base", "text-blue-500");

        // Append name, status, and species to characterInfo
        characterInfo.appendChild(characterName);
        characterInfo.appendChild(characterStatus);
        characterInfo.appendChild(characterSpecies);

        // Append characterImage and characterInfo to the list item
        listItem.appendChild(characterImage);
        listItem.appendChild(characterInfo);

        // Append the list item to the characters list
        charactersList.appendChild(listItem);
        charactersList.classList.add("flex");
    });
}


fetchAllCharacters(baseURL)