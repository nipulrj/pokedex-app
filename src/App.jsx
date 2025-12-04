import { useState, useEffect, useRef } from 'react'
import Pokedex  from './components/Pokedex';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { motion, useInView  } from 'framer-motion'

function GenerationSelector({generation, onSelect}) {
    const GENS = ["Generation I", "Generation II", "Generation III", "Generation IV", "Generation V", "Generation VI", "Generation VII", "Generation VIII", "Generation IX"];
    return (
      <Menu>
      <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-700 data-open:bg-gray-700">
      {generation ? generation : 'Select an option'}
      <ChevronDownIcon className="size-4 fill-white/60" />
      </MenuButton>

      <MenuItems
      modal={false}
      transition
      anchor="bottom end"
      className="w-52 origin-top-right rounded-xl border border-white/5 bg-white/10 backdrop-blur-md p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
      >
      {GENS.map((gen, idx) => {
      return (
        <div key={gen}>
        <MenuItem>
        <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10" onClick={() => onSelect(gen)}>{gen}</button>
        </MenuItem>
        {idx !== GENS.length - 1 && <hr className="my-1 h-px bg-white/5" />}
        </div>
      )
      })}
      </MenuItems>
      </Menu>
    )
}

function AnimatedTitleCard({title}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.h2
      ref={ref}
      initial={{ filter: 'blur(20px)', opacity: 0 }}
      animate={isInView ? { filter: 'blur(0px)', opacity: 1 } : {}}
      transition={{ duration: 1.2 }}
      className="mt-5 text-xl text-center sm:text-4xl font-bold tracking-tighter md:text-6xl md:leading-[4rem]"
    >
      {title}
    </motion.h2>
  );

};


function App() {
    const [dexUrls, setDexUrls] = useState([]);
    const [generation, setGeneration] = useState("Generation I");

    const GENMAP = {
      "Generation I": 'https://pokeapi.co/api/v2/pokemon?limit=151',
      "Generation II": 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=151',
      "Generation III": 'https://pokeapi.co/api/v2/pokemon?limit=135&offset=251',
      "Generation IV": 'https://pokeapi.co/api/v2/pokemon?limit=107&offset=386',
      "Generation V": 'https://pokeapi.co/api/v2/pokemon?limit=156&offset=493',
      "Generation VI": 'https://pokeapi.co/api/v2/pokemon?limit=72&offset=649',
      "Generation VII": 'https://pokeapi.co/api/v2/pokemon?limit=88&offset=721',
      "Generation VIII": 'https://pokeapi.co/api/v2/pokemon?limit=96&offset=809',
      "Generation IX": 'https://pokeapi.co/api/v2/pokemon?limit=120&offset=905',
    }
    useEffect(() => {
        const fetchGenerationEntries = async () => {
          const fetchUrl = generation !== null ? GENMAP[generation] : GENMAP["Generation I"];
          console.log(fetchUrl);
          try {
            const fetchData = await fetch(fetchUrl);
            const res = await fetchData.json();
            console.log(res)
            setDexUrls(res.results);

          } catch(error) {
            console.error(error);
          }
        }
        fetchGenerationEntries();
    }, [generation]);
    return (
      <>
        <AnimatedTitleCard title="Pokédex"/>
        <AnimatedTitleCard title={generation}/>
        <div className="p-4" style={{ marginLeft: '85%' }}>
          <GenerationSelector generation={generation} onSelect={setGeneration}/>
        </div>
        <div className="mt-2 p-10">
          <Pokedex dexUrlEntries={dexUrls}/>
        </div>
      </>
    )
}

export default App
