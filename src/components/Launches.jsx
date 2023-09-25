
import react from "@astrojs/react";
import { useState, useEffect } from "react";
import axios from "axios";

const Data = () => {
  const [allCharacters, setAllcharacters] = useState([]);

  useEffect(() => {
    getData()
  }, [])
 
  async function getData(url = "https://rickandmortyapi.com/api/character") {
    try {
      const response = await axios.get(url)
      const data = response.data

      if(response.status === 200) {
        setAllcharacters((prevCharacters) => prevCharacters.concat(data.results))
        if(data.info.next) {
          await getData(data.info.next)
        } else {
          console.log("All characters have been fetched", allCharacters)
        }
      } else {
        console.error("Error fetching characters:", data.error)
      }
    } catch (error) {
      console.log("An error ocdurred", error)
    }
  }
  return (

    <div> 
      </div>
  
  
  )
  
}

// const baseUrl = "https://rickandmortyapi.com/api/character";
// let allCharacters = [];


// async function fetchAllCharacters(url) {
  // try {
    // const response = await fetch(url);
    // const data = await response.json();
    
    // if (response.ok) {
      // allCharacters = allCharacters.concat(data.results);
      
      // if (data.info.next) {
        // // If there's a next page, recursively fetch the next page
        // await fetchAllCharacters(data.info.next);
      // } else {
        // // All characters have been fetched
        // console.log("All characters have been fetched:", allCharacters);
      // }
    // } else {
      // console.error("Error fetching characters:", data.error);
    // }
  // } catch (error) {
    // console.error("An error occurred:", error);
  // }
// }


// fetchAllCharacters(baseUrl);






