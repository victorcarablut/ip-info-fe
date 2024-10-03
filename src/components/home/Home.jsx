import React, { useState } from 'react';
import Search from '../search/Search';
import WorldMap from '../world-map/WorldMap';
import './home.css';

function Home() {

  const [worldMapData, setWorldMapData] = useState({});

  function handleWorldMapData(data) {
    setWorldMapData(data);
  }

  return (
    <div className="flexbox-container">
      <div className="flexbox-item1">
        <Search handleWorldMapData={handleWorldMapData} />
      </div>
      <div className="flexbox-item2">
        <WorldMap worldMapData={[{
          lat: worldMapData.lat ? worldMapData.lat : 0,
          long: worldMapData.lng ? worldMapData.lng : 0,
          countryName: worldMapData.countryName,
          city: worldMapData.city,
        }]} />
      </div>
    </div>
  )
}

export default Home