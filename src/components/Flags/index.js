import React, {useEffect, useState} from 'react';


function Flags({flag, name}) {

 
    return ( 
        <div>
         
          <div className='Flag-Display'>
          <h3> {`Flag of: ${name} `} </h3> 
         
            { 
            
            flag?

          <img className='Flag' src={flag} alt={`${name} flag `} />

        :
        
        <img className='No-Flag' src={'https://tse3.mm.bing.net/th?id=OIP.fVlfYWWfiR-jrTeibUedpAHaHw&pid=Api&P=0&w=187&h=196'} alt= {"Globe of flags"}/>
            
            }

            </div>
           

         </div>
            
     );
}

export default Flags; 