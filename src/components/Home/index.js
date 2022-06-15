import React from "react";
import { ACTIONS } from "../../App";

function Home({dispatch, wish}) {
  let location = "";

  return (
    <div>
      <h2>
          <br/>
        <li> Browse World + US Maps </li> <br/>
        <li> Click Countires/States to learn more </li><br/>
        <li> Add to Travel Wishlist for later use. </li><br/>
        <br />
        <br />
       Bonus! You can also manually add dream destinations to your Travel Wishlist
        below!
      </h2>

      <form
        onSubmit={() => dispatch({ type: ACTIONS.ADD, payload: location })}
      >
        <label>
          
          <strong>Destination</strong>
          <input type={"text"} name={location} />
        </label>
        <input type={"submit"} />
      </form>
    </div>
  );
}

export default Home;
