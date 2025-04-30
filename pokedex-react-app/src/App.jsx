import { useState, useEffect, use } from 'react'
import './App.css'
import { Pokedex } from './components/Pokedex';


function App() {
  const [pokemonUrls, setPokemonUrls] = useState([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then((res) => {
        return res.json();
    })
    .then((data) => {
      setPokemonUrls(data.results);
    });
  }, []);

  if (pokemonUrls.length == 0) {
    return <p>Loading...</p>;
  } else {
    return (
      <>
        <Pokedex urls={pokemonUrls}/>
      </>
    )  
  }
}

export default App
