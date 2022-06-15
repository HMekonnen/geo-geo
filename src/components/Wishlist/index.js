// Travel Wish list- displays list of countries, click heart to add to travel wishlist.  - or world map + us map will have a heart to add to travel wish list 
import React from 'react';

import { useState } from "react";

import {BsSuitHeart}  from 'react-icons/bs'

function Wishlist({wish, dispatch}) {

  

  
console.log(wish)
    return ( <div> <h2>Travel Wishlist</h2>

{
        wish.map((destination) => {
          return (
            <div key={destination.id}>
             
             <ul>

              <h3><BsSuitHeart className='wish-heart'/> {destination.name}</h3>
             
            
              </ul>
            </div>
          )
        })
      }

        
    </div> );
}

export default Wishlist;