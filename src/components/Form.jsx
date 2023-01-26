const Form = (props) => {
    const { 
        searchHandler,
        clearHandler, 
        latitude, 
        longitude, 
        setLatitude, 
        setLongitude, 
        getLocation 
    } = props;

    return (
        <form>
            <label> Latitude </label>
            <input 
                type="number" 
                id="latitude" 
                name="latitude" 
                value={latitude}
                onChange={(event) => setLatitude(event.target.value)}
                />
            <br />
            <label> Longitude </label>
            <input 
                type="number" 
                id="longitude" 
                name="longitude" 
                value={longitude}
                onChange={(event) => setLongitude(event.target.value)}
                />
            <br />
            <input type="button" value="Near Me" onClick={getLocation}/>
            <input type="button" value="Search" onClick={searchHandler}/>
            <input type="button" value="Clear" onClick={clearHandler}/>
        </form>
    )
}

export default Form;