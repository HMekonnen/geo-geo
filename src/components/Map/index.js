import React, { useState } from "react";

import axios from "axios";

import Flags from "../Flags";
import Facts from "../Facts";

import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";

import ReactTooltip from "react-tooltip";


// URL for a basic map - this link was provided in the package.json of react-simple-maps - > dist folder.
const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

function Map() {


  const [content, setContent] = useState(""); // Used w/ React toolTip - to show country name upon hover 

 

  const [countryData, setCountryData] = useState({  // Schema for details to be extracted for countries API
    name: "",
    capital: "",
    subregion: "",
    region: "",
    population: 0,
    timezones: "",
    flag: "",
    currency: "",
    languages: "",
    latlng: 0,
  });

  const fetchData = async (ISO_A2) => {

    // console.log({ content });     -Spot check => Logs country name
   
    try {

      const response = await axios.get(
        `https://restcountries.com/v3.1/alpha/${ISO_A2}`
      );

      // console.log("response:", response); - Spot check

      const details = response.data[0];
      
      // console.log("Data:", details);      - Spot check

      setCountryData({
        name: details?.name.common,
        capital: details?.capital[0],
        subregion: details?.subregion,
        region: details?.region,
        population: details?.population,
        timezones: details?.timezones?.[0],
        flag: details?.flags?.svg,
        currency: details?.currencies,
        languages: details?.languages,
        latlng: details?.latlng,
      });
      
    } catch (e) {
      // console.log(e);    - Spot check
    }
  };

  // console.log(countryData);   - Spot check

  

  return (
    <div className="Map-Data">
      <h1> World Map</h1>
      <h2> Click on any Country to explore </h2>
      <h2> Drag and Zoom for a better viewing experience </h2>
      <ReactTooltip>{content}</ReactTooltip>

      <div className="Map">
        <Flags flag={countryData.flag} name={countryData.name} />

        <Facts data={countryData} />
        
        <ComposableMap data-tip="">

          <ZoomableGroup className="Zoom">
            {/* Make map interactive by Wrapping the map in a zoomable component - which will allow us to zoom into the map */}

            {/* Child of ComposableMap takes in prop called Georgraphy - we pass it url from where it should get georgraphy - think of this as each of the countries */}

            <Geographies geography={geoUrl}>

              {({ geographies }) =>

                geographies.map((geo) => (
                 
                  // Array of all the countries that are in the map - sourced from geoUrl each country on the map will be from Geographies component
                 
                  <Geography

                    key={geo.rsmKey}

                    geography={geo}

                    onClick={() => {

                      const { ISO_A2 } = geo.properties;

                      // console.log(geo);  - Spot check

                      fetchData(ISO_A2);

                    }}

                    onMouseEnter={() => {

                      const { NAME } = geo.properties;

                      const { ISO_A2 } = geo.properties;

                      setContent(`${NAME}`);

                      // fetchData(ISO_A2); - pending removal, if uncommented will bring back country flag + details on hover. 
                    }}
                    style={{
                      hover: {
                        fill: "#F53",
                        outline: "none",
                      },
                    }}
                  />
                ))
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </div>
  );
}

export default Map;
