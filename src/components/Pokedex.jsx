import { useState, useEffect } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'


function DexEntry({pokemon}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    const handleOpenModal = (pokemon) => {
        setSelectedPokemon(pokemon);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedPokemon(null);
    };

    const name = pokemon.name;
    const imageSrc = pokemon.sprites.front_default;
  
    return (
        <>
            <img key={name} src={imageSrc} onClick={() => {handleOpenModal(pokemon)}}></img>
            {isModalOpen && selectedPokemon.name === pokemon.name && <Modal pokemon={selectedPokemon} open={isModalOpen} close={handleCloseModal}/>}
        </>
    )
}

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
        <ul className="flex flex-wrap list-none p-0 m-0 gap-2 items-center justify-center opacity-100">
            {allPokemonData.map((pokemonData) => (
                <li>
                    <DexEntry key={pokemonData.name} pokemon={pokemonData}/>
                </li>
            ))}
        </ul>
    );
}

export default Pokedex;

const Modal = function({pokemon, open, close}) {
    const weightInKg = pokemon.weight / 10;
    const weightInPounds = (weightInKg * 2.205).toFixed(2);
    return  (
        <>
            <Dialog open={open} as="div" className="relative z-10 focus:outline-none" onClose={close}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                        transition
                        className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                        >
                            <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-120 h-100" />
                            <h2 className="text-3xl font-bold mt-4 text-center capitalize">{pokemon.name}</h2>
                            <div className="mt-6 space-y-3 text-white-700">
                                <div className="flex justify-between border-b pb-2">
                                    <span className="font-semibold">Height:</span>
                                    <span>{pokemon?.height}</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="font-semibold">Weight:</span>
                                    <span>{weightInPounds} lbs / {weightInKg} kg</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="font-semibold">Type:</span>
                                    <span className="capitalize">{pokemon.types.map(t => t.type.name).join(', ')}</span>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
}