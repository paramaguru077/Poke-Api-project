import React, { useEffect, useState } from 'react'
import '../Styles/Pokecard.css'
import { useNavigate } from 'react-router-dom';
const PokeCard = ({name}) => {
  const navigate = useNavigate();
  const API = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=100";
  const[pokemons,setPokemons]=useState([]);// Store api infprmatiom
  const[currentPage,setCurrentPage] = useState(1); // for current page
  const[loading,setLoading]=useState(true); // intial loading
  const pokemonsPerPage=6; 
  const [searchQuery, setSearchQuery] = useState('');

  const fetchPokemonData = async (url=API)=>{
    setLoading(true);
    try{
      const response = await fetch(url);
      const data = await response.json();
      const results = await Promise.all(
        data.results.map(async (pokemon)=>{
          const res = await fetch(pokemon.url);
          const data = await res.json();
          return{
            id:data.id,
            name:data.name,
            image:data.sprites.front_default,
          };

        })
      );
      setPokemons((prevPokemons)=>[...prevPokemons,...results]);
      if(data.next){
        fetchPokemonData(data.next);
      }
      else{
        setLoading(false);
      }

    }
    catch(error){
      console.error("Error fetching pokrmon", error);
      setLoading(false);

    }
  };
  useEffect(()=>{
    fetchPokemonData();
  },[]);


  //flitering

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().startsWith(searchQuery.toLowerCase())
  );


  // pagination logic

  const indexOfLastPokemon = currentPage*pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon-pokemonsPerPage;
  const currentPokemons = filteredPokemons.slice(indexOfFirstPokemon,indexOfLastPokemon);


  const nextPage =()=> setCurrentPage((prev)=> prev+1);
  const prevPage =()=> setCurrentPage((prev)=> (prev>1 ? prev-1:1));


  const handleCardClick =(id)=>{
    navigate(`/pokemon/${id}`);
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
   <div className='app'>
    <header>
        <h1>Pokemon Cards</h1>
        <input
          type="text"
          placeholder="Search Pokémon by name..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </header>
    {loading ? (<p> Loading Pokemon..</p>):(
      <>
      <div className='pokemon-container'>
        {
          currentPokemons.map((pokemons)=>(
            <div
             key={pokemons.id}
             className='pokemon-card'
             onClick={()=>handleCardClick(pokemons.id)}>
              <p>ID : {pokemons.id}</p>
              <img src={pokemons.image} alt={pokemons.name} />
              <h3>{pokemons.name}</h3>
              </div>

          ))
        }

      </div>
      <div className='pagination'>
        <button onClick={prevPage} disabled={currentPage===1}>previous</button>
        <button onClick={nextPage} disabled={indexOfLastPokemon>=filteredPokemons.length}>Next</button>
      </div>
      </>
    )}
   </div>
  )
}

export default PokeCard