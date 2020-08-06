import React, { useState } from 'react';
import './App.scss';

function App() {
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [date, setDate] = useState('');
  const [assets, setAssets] = useState({});
  const [view, setView] = useState(false);

  const submit = e => {
    e.preventDefault();
    fetch(`https://api.nasa.gov/planetary/earth/assets?lon=${lon}&lat=${lat}&date=${date}&dim=0.15&api_key=DEMO_KEY`, {
      method: 'GET'
    }).then(response => response.json())
    .then(data => setAssets(data))
    .then(setView(true))
  }

  return (
    <React.Fragment>
      <h1>Get assets from Nasa Earth api</h1>
      <form onSubmit={submit}>
        <label htmlFor="date">Date</label>
          <input
            type="text"
            name="date"
            value={date}
            onChange={e => setDate(e.target.value)}
           />

        <label htmlFor="lat">latitude</label>
          <input
            type="text"
            name="lat"
            value={lat}
            onChange={e => setLat(e.target.value)}
           />

        <label htmlFor="lon">Longitude</label>
        <input
          type="text"
          name="lon"
          value={lon}
          onChange={e => setLon(e.target.value)}
         />

       <button type="submit">Fetch!</button>
      </form>

      <div className="results">
        { view ?
          <React.Fragment>
            <h2>Results</h2>
            <p>Date: {assets.date}</p>
            <p>ID: {assets.id}</p>
            <p>URL: {assets.url}</p>
            <img src={assets.url} alt={assets.id}/>
          </React.Fragment>
          : null
        }
      </div>
    </React.Fragment>
  )
}

export default App;
