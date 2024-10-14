import React from 'react'
import{BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import PokeCard from './Compontents/PokeCard'
import PokemonDetails from './Compontents/PokemonDetails'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<PokeCard/>}/>
        <Route path='pokemon/:id' element={<PokemonDetails/>}/>
      </Routes>
    </Router>
  )
}

export default App