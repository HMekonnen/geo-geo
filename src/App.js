
import './App.css';
import Home from './components/Home'
import Map from './components/Map';
import Trivia from './components/Trivia'
import { Routes, Route, Link } from 'react-router-dom';
import React, {useState, useReducer} from "react";
import US from './components/US/index.';
import Wishlist from './components/Wishlist';
import {BsSuitHeart}  from 'react-icons/bs'
import { v4 } from 'uuid';
import Facts from './components/Facts';

const uuid = v4

export const ACTIONS ={
  ADD: "add",
  // REMOVE: "remove",
  // CLEAR_ALL: "clear_all"
}

function reducer (wish, action){

  switch (action.type){

    case ACTIONS.ADD:
      return [...wish, newWish(action.payload)]
console.log(wish)

break;

default: return wish


  }

}


function newWish(place) {
  return { id: uuid(), name: place} 
}

function App() {

  const [wish, dispatch] = useReducer(reducer, [])

  console.log(wish)

  
  
 
  return (

    <div className="App">

      <h1> Geo-Genius</h1>

      <nav className= "Nav" >

    <strong>   <Link to="/">Home</Link> | <Link to="/worldmap">World Map</Link> | <Link to="/USA">U.S Map</Link> | <Link to="/trivia">Trivia</Link> | <Link to="/wishlist">Travel Wishlist </Link> <BsSuitHeart/> </strong>
      </nav>

     <Routes>

     <Route path='/' element={<Home dispatch={dispatch} />} />
     <Route path='/worldmap' element={<Map dispatch={dispatch} />} />
     <Route path='/facts' element={<Facts dispatch={dispatch} />} />
     <Route path='/USA' element={<US dispatch={dispatch} />} />
     <Route path='/trivia' element={<Trivia  />} />
     <Route path='/wishlist' element={<Wishlist wish={wish}   />} />


     </Routes>
     
    </div>
  );
}

export default App;

