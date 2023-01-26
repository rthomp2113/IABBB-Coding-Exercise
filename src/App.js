import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from './components/Form';
import './App.css';

function App() {
  const [locationData, setLocationData] = useState();
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [search, setSearch] = useState(false);

  useEffect(() => { //API call to get pinball locations within 50 miles
    const source = axios.CancelToken.source();
    if(search === true){
      axios.get("http://pinballmap.com///api/v1/locations/closest_by_lat_lon.json", {
        params: {lat: latitude, lon: longitude, send_all_within_distance: "50"},
      })
      .then(response => {
        const locationResponseData = response.data;
        setLocationData(locationResponseData);
      })
      return () => {
        source.cancel()
      }
    }
  }, [latitude, longitude, search])

  const getLocation = () => { //grabs user's current geolocation info
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(getPosition)
    }else{
      alert("No geolocation data available.")
    }
  }

  const getPosition = (position) => {//sets user's current geolocation info
    setLatitude(position.coords.latitude)
    setLongitude(position.coords.longitude)
  }

  const searchHandler = () => {
    if(latitude && longitude){
      setSearch(true);
      setLatitude(latitude.toString())
      setLongitude(longitude.toString())
      setTimeout(() => setSearch(false), 1000)
    }else{
      alert("Fill in longitude and longitude")
    }
  }

  const clearHandler = () => {
    setLatitude('');
    setLongitude('');
  }
 
  return (
    <div className="App">
      <h1> Pinball Machine Locator </h1>
      <Form 
        searchHandler={searchHandler}
        clearHandler={clearHandler} 
        latitude={latitude} 
        longitude={longitude}
        setLatitude={setLatitude}
        setLongitude={setLongitude}
        getLocation={getLocation}
        />
      <h1> Machines within 50 Miles of Coordinates </h1>
      <h1>{(typeof(locationData?.locations?.length) !== 'undefined' && locationData?.locations?.length > 1) && `${locationData?.locations?.length} Results`}</h1>
      <h1>{(typeof(locationData?.locations?.length) !== 'undefined' && locationData?.locations?.length === 1) && `${locationData?.locations?.length} Result`}</h1>
      {locationData && locationData?.locations ? (locationData?.locations).map((location, index) => {
        return <h6 key={index}>{`${index + 1}. ${location.name}   - ${location.street} ${location.city}, ${location.state}`}</h6>
      }) : <h1> No Results </h1>}
      {(!locationData || (typeof locationData?.locations) === 'undefined') && "No results displayed"}
    </div>
  );
}

export default App;
