import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Form from './components/Form';
import List from './components/List';
import Validators from './components/Validators';
import { useGeolocated } from 'react-geolocated';
import axios from 'axios';
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
      axios.get("https://pinballmap.com/api/v1/locations/closest_by_lat_lon.json", {
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

  const { coords, isGeolocationAvailable } = useGeolocated({ positionOptions: { enableHighAccuracy: true } });

  const getLocation = () => { //grabs user's current geolocation info
    if(isGeolocationAvailable){
      getPosition()
    }else{
      alert("No geolocation data available. Please enter geo-coordinates manually.");
    };
  };

  const getPosition = () => {//sets user's current geolocation info
    setLatitude(coords.latitude);
    setLongitude(coords.longitude);
    setIsValidator(false);
  };

  const searchHandler = () => {
    if(latitude && longitude){
      setSearch(true);
      setLatitude(latitude.toString());
      setLongitude(longitude.toString());
      setIsClear(false);
      setIsValidator(false);
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
      <Header />
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
      <Validators 
        isValidator={isValidator} 
        validLatitude={validLatitude} 
        validLongitude={validLongitude}
      />
      <List 
        locationDataLength={locationDataLength} 
        locationData={locationData} 
        isClear={isClear}
      />
    </React.Fragment>
  );
};

export default App;
