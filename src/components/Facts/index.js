import React from "react";
import NumberFormat from "react-number-format";


function Facts({ data }) {
   
    
  return (
    <div className="Fact-Display">

      <div className="Facts">



        Facts about <strong> {data.name}!</strong> <br />

        <li>Capital: {data?.capital}</li>

        <li>Region: {data?.region}</li>

        <li> Sub-Region: {data?.subregion}</li>

        <li> Population: <NumberFormat value={data?.population} displayType={"text"}thousandSeparator={true} prefix= {""}/> </li>

        <li> Timezone: {data?.timezones} </li>
        


      </div>
      
    </div>
  );
}

export default Facts;
