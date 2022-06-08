
import './App.css';
import Home from './components/Home'
import Map from './components/Map';
import Trivia from './components/Trivia'
import { Routes, Route, Link } from 'react-router-dom';
import React from "react";



function App() {

  
 
  return (

    <div className="App">

      <h1> Geo-Genius</h1>

      <nav className= "Nav" >

      <li> <Link to="/">Home</Link> </li>
      <li> <Link to="/map">Map</Link> </li>
      <li> <Link to="/trivia">Trivia</Link> </li>

      </nav>

     <Routes>

     <Route path='/' element={<Home  />} />
     <Route path='/map' element={<Map  />} />
     <Route path='/trivia' element={<Trivia  />} />


     </Routes>
     
    </div>
  );
}

export default App;

