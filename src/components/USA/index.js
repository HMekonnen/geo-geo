import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
} from "react-simple-maps";

import { geoCentroid } from "d3-geo";



import allstates from "./allstates.json";

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

function USA() {
  const [content, setContent] = useState("");

  const [flag, setFlag] = useState({
      flag:""
  })

  const stateName = async (name) => {
    try {
      await setContent(`${name}`);
 
    } catch (e) {}
  };

  

  const test = content.toLowerCase().replace(/\s/g, "");
  const final = test.replace(/\s/g, "");

  console.log("test",test)
  console.log("final",final)
  

  const stateFlag = async (final) => {
    try {
        

      const res = await axios.get(
        `https://cdn.civil.services/us-states/flags/${final}-small.png`
        
        // Two word states return status 203 due to % and spacing. See line 49 for attempted solution. 

      ); 
    

      console.log("res",res)

      const details = res.config.url

      console.log(details)
      
     
setFlag(details)
     
    } catch (e) {}
  };
  console.log(flag)

  return (
    <>
    <h1>U.S Map</h1>
      <div className="State-Details">
        <h2>{content}</h2>
        {
         flag ? 
          <img className="State-Flag" src={flag} alt={`Flag of ${content} `} />
         : 
          <img
            className="No-Flag"
            src={"https://i.ytimg.com/vi/qYv0J7rM7pc/maxresdefault.jpg"}
            alt={"Temporarily unavailable"}
          />
        
        }
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
                      stateName(name);
                      stateFlag(name.toLowerCase())
                    }}
                    onMouseEnter={() => {
                      const { name } = geo.properties;
                      
                    }}
                    style={{
                      hover: {
                        fill: "#F53",
                        //   outline: "none",
                      },
                    }}
                  />
                ))}
                {geographies.map((geo) => {
                  const centroid = geoCentroid(geo);
                  const cur = allstates.find((s) => s.val === geo.id);
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

export default USA;
