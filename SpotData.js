import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import surferDude from "./surfer.png"

const SpitCastAPI = 'https://api.spitcast.com/api/spot';

function SpotData() {
  const [spotData, setSpotData] = useState([]);
  const [selectedSpotID, setSelectedSpotID] = useState(null);

  useEffect(() => {
    axios.get(`${SpitCastAPI}`)
      .then((response) => {
        setSpotData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching surf data:', error);
      });
  }, []);

  const handleSpotSelect = (event) => {
    const newSelectedSpotID = parseInt(event.target.value);
    setSelectedSpotID(newSelectedSpotID);
  };

  if (spotData.length === 0) {
    return <div>Loading beach data...</div>;
  }

  return (
    <div>
      <h2>Select a location
        <img className="clipart" src={surferDude} alt="surfer" />
      </h2>
      <select onChange={handleSpotSelect} value={selectedSpotID || ''} className="select">
        <option value="" disabled={selectedSpotID !== null}>Select a spot</option>
        {spotData.map((spot, index) => (
          <option key={index} value={index}>
            {spot.spot_name}
          </option>
        ))}
      </select>

      {selectedSpotID !== null && (
        <div className="data-points">
          <p className="surf-spot">Beach Spot: {spotData[selectedSpotID].spot_name}</p>
          <p className="data-point">Latitude/Longitude: {spotData[selectedSpotID].coordinates[1]}, {spotData[selectedSpotID].coordinates[0]}</p>
          <p className="data-point">Address: {spotData[selectedSpotID].street_address}</p>
        </div>
      )}
    </div>
  );
}

export default SpotData;
