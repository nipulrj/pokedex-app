import React from 'react'
import { useState, useEffect } from 'react';
import './Pokedex.css'
import { DexEntry } from './DexEntry';

export const Pokedex = ({dexUrlEntries}) => {
    const [allPokemonData, setAllPokemonData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPokemonData = async () => {
            try {
                const promises = dexUrlEntries.map(data =>
                    fetch(data.url)
                    .then(res => {
                        if (!res.ok) {
                            throw new Error(`HTTP error! status: ${res.status}`);
                        }
                        return res.json();
                    })
                );
    
                const allPokemonData = await Promise.all(promises);
                setAllPokemonData(allPokemonData);
            } catch (e) {
                setError(e);
            }
        };
        fetchPokemonData();
    }, [dexUrlEntries]);
    if(error !== null) {
        throw new Error(error);
    }

    return (
        <div>
            {Object.entries(allPokemonData).map(([key, value]) => (
                <DexEntry key={key} value={value}/>
            ))}
        </div>
    );å
}

export default Pokedex