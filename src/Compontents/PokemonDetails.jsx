import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../Styles/Pokecard.css';

const PokemonDetails = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const API = `https://pokeapi.co/api/v2/pokemon/${id}`;

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(API);
        const data = await response.json();
        setPokemon(data);
        setLoading(false);
      } catch (e) {
        console.error("Error fetching Pokémon details:", e);
        setLoading(false);
      }
    };
    fetchPokemonDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!pokemon) {
    return <p>Pokemon not found</p>;
  }

  return (
    <div className='pokemon-detail'>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>ID: {pokemon.id}</p>
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Base Experience: {pokemon.base_experience}</p>
    </div>
  );
};

export default PokemonDetails;
