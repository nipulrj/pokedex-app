import { useState, useEffect, use } from 'react'
import './App.css'
import Pokedex  from './components/Pokedex';


function App() {
    const [dexUrls, setDexUrls] = useState([]);

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
        .then(res => {
            return res.json();
        })
        .then(data => {
        setDexUrls(data.results);
        });
    }, []);
    return (
        <>
            <Pokedex dexUrlEntries={dexUrls}/>
        </>
    )  
}

export default App
