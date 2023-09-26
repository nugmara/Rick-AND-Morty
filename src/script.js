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
        const characterName = document.createElement("p");
        const characterImage = document.createElement("img");

        // Set character name
        characterName.textContent = character.name
        characterName.classList.add("text-lg", "font-bold", "text-white");

        // Set character image source
        characterImage.src = character.image

        // Append name and image to the list item
        listItem.appendChild(characterName)
        listItem.appendChild(characterImage)

        // Append the list item to the characters list
        charactersList.appendChild(listItem)

    })
}

fetchAllCharacters(baseURL)