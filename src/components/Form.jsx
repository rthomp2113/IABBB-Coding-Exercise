import React from 'react';
import { Button, TextField } from '@material-ui/core';

const Form = (props) => {
    const { 
        searchHandler,
        clearHandler,
        clearListHandler, 
        latitude, 
        longitude, 
        setLatitude, 
        setLongitude, 
        getLocation,
        locationData
    } = props;

    const isClearDisabled = latitude === "" && longitude === "";
    const isClearListDisabled = locationData === undefined || locationData.errors === 'No locations within 50 miles.';
    
    return (
        <React.Fragment>
            <TextField 
                label="Latitude"
                type="number"
                id="latitude" 
                name="latitude" 
                inputProps={{ max: 90, min: -90 }}
                value={latitude}
                onChange={(event) => setLatitude(event.target.value)}
            />
            <br />
            <TextField 
                label="Longitude"
                type="number" 
                inputProps={{ max: 180, min: -180 }}
                id="longitude" 
                name="longitude" 
                value={longitude}
                onChange={(event) => setLongitude(event.target.value)}
            />
            <br />
            <Button onClick={clearHandler} variant="outlined" color="inherit" disabled={isClearDisabled}> Clear </Button>
            <br />
            <Button onClick={searchHandler}  variant="outlined" color="primary" > Search </Button>
            <Button onClick={getLocation} variant="outlined" color="inherit"> Near Me </Button>
            <Button onClick={clearListHandler} variant="outlined" color="secondary" disabled={isClearListDisabled}> Clear List </Button>     
        </React.Fragment>
    )
}

export default Form;