import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import "../Styles/Header.css"
import PokeCard from './PokeCard';
const Header = () => {
    const[name,setName] = useState("");
    const handleChange =(e)=>{
        const newName = e.target.value;
        setName(newName);
    }

  return (

   <>
    <div className='head'>
        
        <nav>
        <h1>POKEMON</h1>
            <input type="text"  name="name" 
            value={name}
            placeholder='Enter Pokemon name'
             onChange={handleChange} />
            <div className='search-icon'>
              <FaSearch/>
            </div>
        </nav>
    </div>
    <PokeCard name={name} />
   </>
    

  )
}

export default Header