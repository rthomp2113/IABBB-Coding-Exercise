import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from './components/Form';
import { Typography, Divider, ListItemText } from '@material-ui/core';
import './App.css';

function App() {
  const [locationData, setLocationData] = useState(undefined);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [search, setSearch] = useState(false);
  const [isValidator, setIsValidator] = useState(false);
  const [isClear, setIsClear] = useState(true);

  useEffect(() => { //API call to get pinball locations within 50 miles
    let isApiSubcribed = true;
    if(search === true && isApiSubcribed){
      axios.get("http://pinballmap.com///api/v1/locations/closest_by_lat_lon.json", {
        params: {lat: latitude, lon: longitude, send_all_within_distance: "50"},
      })
      .then(response => {
        const locationResponseData = response.data;
        setLocationData(locationResponseData);
      })
      return () => {
        isApiSubcribed = false;
      }
    };
  }, [latitude, longitude, search]);

  const getLocation = () => { //grabs user's current geolocation info
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(getPosition);
    }else{
      alert("No geolocation data available. Please enter geo-coordinates manually.");
    };
  };

  const getPosition = (position) => {//sets user's current geolocation info
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
    setIsValidator(false);
  };

  const searchHandler = () => {
    if(latitude && longitude){
      setSearch(true);
      setLatitude(latitude.toString());
      setLongitude(longitude.toString());
      setIsClear(false);
      setTimeout(() => setSearch(false), 1000);
    }else{
      setIsValidator(true);
    };
  };

  const clearHandler = () => {
    setLatitude('');
    setLongitude('');
    setIsValidator(false);
    setIsClear(true);
  };

  const clearListHandler = () => {
    setLocationData(undefined);
    setIsValidator(false);
    setIsClear(true);
  };

  const locationDataLength = locationData?.locations?.length;
  const validLatitude = (latitude > 90 || latitude < -90);
  const validLongitude = (longitude > 180 || longitude < -180);
 
  return (
    <React.Fragment>
      <div className="App"> 
        <i><Typography variant="h1"> Pinball Machine Locator </Typography></i>
        <div className="instructions">
          <Typography variant="h9"> - Use this tool to find the nearest pinball machines within 50 miles of entered coordinates </Typography>
          <br />
          <Typography variant="h9"> - Click <b>SEARCH</b> after entering latitude and longitude coordinates </Typography>
          <br />
          <Typography variant="h9"> - Click <b>NEAR ME</b> to auto-populate current geo-coordinates </Typography>
          <br />
          <Typography variant="h9"> - Click <b>CLEAR</b> to clear coordinate values </Typography>
          <br />
          <Typography variant="h9"> - Click <b>CLEAR LIST</b> to clear list results </Typography>
        </div>
      </div>
      <div className="form">
        <Form 
          searchHandler={searchHandler}
          clearHandler={clearHandler} 
          clearListHandler={clearListHandler}
          latitude={latitude} 
          longitude={longitude}
          setLatitude={setLatitude}
          setLongitude={setLongitude}
          getLocation={getLocation}
          locationData={locationData}
        />
        {isValidator && <Typography color="secondary"> Must Enter Latitude and Longitude Values</Typography>}
        { validLatitude && <Typography color="secondary"> Latitude Value Must be Between -90 and 90</Typography>}
        { validLongitude && <Typography color="secondary"> Longitude Value Must be Between -180 and 180</Typography>}
      </div>
      <div className="list">
        <Typography> Pinball Machines within 50 miles of entered coordinates</Typography>
        <br/>
        <Typography variant="h5"> {(typeof(locationDataLength) !== 'undefined' && locationDataLength > 1 ) && `${locationDataLength} Results`} </Typography>
        <Typography variant="h5"> {(typeof(locationDataLength) !== 'undefined' && locationDataLength === 1) && `${locationDataLength} Result`} </Typography>
        <Typography variant="h5"> {(typeof(locationDataLength) === 'undefined' && isClear === false) && "0 Results"} </Typography>
        <Typography variant="h5"> {(typeof(locationDataLength) === 'undefined' && isClear === true) && "Enter Search Parameters"} </Typography>
        <Divider /> 
        {(locationData && locationData?.locations) && (locationData?.locations).map((location, index) => {
          return <ListItemText key={index}> {`${index + 1}. ${location.name.toUpperCase()}   - ${location.street} ${location.city}, ${location.state}`} </ListItemText>
        })}
      </div>
    </React.Fragment>
  );
};

export default App;
