import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
} from "react-simple-maps";

import {BsSuitHeart}  from 'react-icons/bs'

import { ACTIONS } from "../../App";

import allStates from "./allStates.json";

import { geoCentroid } from "d3-geo";

import axios from "axios";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";



const offsets = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21],
};

function US({dispatch, wish}) {

  const [flag, setFlag] = useState("");

  const [stateName, setStateName] = useState("");

  const stateFlag = async (name) => {
    try {
      console.log("name", name);

      const res = await axios.get(
        `https://cdn.civil.services/us-states/flags/${name
          .toLowerCase()
          .replace(/\s/g, "-")}-small.png`

 
      );

      console.log("res", res);

      const details = res.config.url;

      console.log(details);

      setFlag(details);
      setStateName(name);
    } catch (e) {}
  };
  console.log(flag);
  console.log(stateName);
  return (
    <>
      <h1>U.S Map</h1>
      <div className="State-Details">
        <h2>{stateName}</h2>
      
        {flag ? (
          <img
            className="State-Flag"
            src={flag}
            alt={`Flag of ${stateName} `}
          />
        ) : (
          <img
            className="Default-Flag"
            src={"http://www.9to5carwallpapers.com/wp-content/uploads/2017/08/American-Flag-Waving-free-hdWallpapersimages.jpg"}
            alt={"US Flag"}
          />
        )} <br/>
         <strong> <BsSuitHeart className="empty-heart" onClick={()=> dispatch({type: ACTIONS.ADD, payload: stateName})}/> Add {stateName} to Travel Wishlist </strong>
        
      </div>
      <div className="US-map">
        <ComposableMap projection="geoAlbersUsa">
          <Geographies geography={geoUrl}>
            {({ geographies }) => (
              <>
                {geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    stroke="#FFF"
                    geography={geo}
                    onClick={() => {
                      const { name } = geo.properties;

                      stateFlag(name);
                    }}
                    onMouseEnter={() => {
                      const { name } = geo.properties;
                    }}
                    style={{
                      fill: "#DDD",
                      hover: {
                        fill: "#F53",
                      },
                    }}
                  />
                ))}
                {geographies.map((geo) => {
                  const centroid = geoCentroid(geo);
                  const cur = allStates.find((s) => s.val === geo.id);
                  return (
                    <g key={geo.rsmKey + "-name"}>
                      {cur &&
                        centroid[0] > -160 &&
                        centroid[0] < -67 &&
                        (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                          <Marker coordinates={centroid}>
                            <text y="2" fontSize={14} textAnchor="middle">
                              {cur.id}
                            </text>
                          </Marker>
                        ) : (
                          <Annotation
                            subject={centroid}
                            dx={offsets[cur.id][0]}
                            dy={offsets[cur.id][1]}
                          >
                            <text
                              x={4}
                              fontSize={14}
                              alignmentBaseline="middle"
                            >
                              {cur.id}
                            </text>
                          </Annotation>
                        ))}
                    </g>
                  );
                })}
              </>
            )}
          </Geographies>
        </ComposableMap>
      </div>
    </>
  );
}

export default US;
