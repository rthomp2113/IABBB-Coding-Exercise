import React from 'react';
import { Button, TextField } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import '../App.css';

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
        locationData,
    } = props;

    const isClearDisabled = latitude === "" && longitude === "";
    const isClearListDisabled = locationData === undefined || locationData.errors === 'No locations within 50 miles.';
    
    return (
        <div className="form">
            <Box>
                <span className="entry">
                    <TextField 
                        label="Latitude"
                        type="number"
                        id="latitude" 
                        name="latitude" 
                        inputProps={{ max: 90, min: -90, step: 0.0001 }}
                        value={latitude}
                        onChange={(event) => setLatitude(event.target.value)}
                    />
                </span>
                <span className="entry">
                    <TextField 
                        label="Longitude"
                        type="number" 
                        
                        inputProps={{ max: 180, min: -180, step: 0.0001}}
                        id="longitude" 
                        name="longitude" 
                        value={longitude}
                        onChange={(event) => setLongitude(event.target.value)}
                    />
                </span>
                <Button onClick={clearHandler} variant="outlined" color="inherit" disabled={isClearDisabled}> Clear </Button>
            </Box>
            <br />
            <span className="entry">
                <Button onClick={searchHandler}  variant="outlined" color="primary" > Search </Button>
            </span>
            <Button onClick={getLocation} variant="outlined" color="inherit"> Near Me </Button>
            <span className="entry">
                <Button onClick={clearListHandler} variant="outlined" color="secondary" disabled={isClearListDisabled}> Clear List </Button>    
            </span> 
        </div>
    )
}

export default Form;