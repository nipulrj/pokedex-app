import React from 'react'
import { useState, useEffect } from 'react';
import './Pokedex.css'
import { DexEntry } from './DexEntry';

export const Pokedex = ({urls}) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
        try {
          const promises = urls.map(item =>
            fetch(item.url)
            .then(response => {
                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
              })
          );
  
          const allResults = await Promise.all(promises);
          setResults(allResults);
        } catch (e) {
          setError(e);
        } finally {
          setLoading(false);
        }
      };
      fetchPokemonData();
  }, [urls]);

  return (
    <div>
      {Object.entries(results).map(([key, value]) => (
        <DexEntry key={key} value={value}/>
      ))}
    </div>
  );
}

export default Pokedex