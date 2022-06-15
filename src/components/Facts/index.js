import React from "react";
import NumberFormat from "react-number-format";
import {BsSuitHeart} from 'react-icons/bs'
import { ACTIONS } from "../../App";


function Facts({ data, dispatch, wish }) {
   

 const COUNTRY = data.name
    
//   function handleSubmit(e){
//     e.preventDefault();
//     dispatch({type: ACTIONS.ADD, payload:{data}})
    
// }

  return (
    <div className="Fact-Display">

      <div className="Facts">



        Facts about <strong> {data.name}!</strong> <br />

        <li>Capital: {data?.capital}</li>

        <li>Region: {data?.region}</li>

        <li> Sub-Region: {data?.subregion}</li>

        <li> Population: <NumberFormat value={data?.population} displayType={"text"}thousandSeparator={true} prefix= {""}/> </li>

        <li> Timezone: {data?.timezones} </li>
        
      <strong><BsSuitHeart className='empty-heart' onClick={() => dispatch({ type: ACTIONS.ADD, payload: COUNTRY })}/> Add {COUNTRY} to Travel Wishlist </strong>
       
       


      </div>
      
    </div>
  );
}

export default Facts;
