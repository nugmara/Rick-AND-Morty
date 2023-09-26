import { useEffect, useState } from "react";

export default function App() {
  const baseURL = "https://rickandmortyapi.com/api/character";
  const [allCharacters, setAllCharacters] = useState([]);

  useEffect(() => {
    fetchAllCharacters(baseURL);
  }, []); // Empty dependency array to run this effect only once

  const fetchAllCharacters = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setAllCharacters((prevCharacters) => [
          ...prevCharacters,
          ...data.results,
        ]);
        console.log("All characters have been fetched:", [
          ...allCharacters,
          ...data.results,
        ]);

        if (data.info.next) {
          await fetchAllCharacters(data.info.next);
        }
      } else {
        console.log("Error fetching characters:", data.error);
      }
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };

  return (
    <header className="py-8 px-4 mx-auto max-w-xl lg:py-16 lg:px-6">
      <div className="mx-auto text-center mb-8 lg:mb-16">
        <h2 className="mb-4 text-5xl tracking-tight font-extrabold text-white">
          Welcome To the Rick and Morty website!
        </h2>
        <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
          Here you will have access to about hundreds of characters, images,
          locations and episodes of your favorite show 🥒
        </p>
      </div>

      <button></button>
    </header>
  );
}
