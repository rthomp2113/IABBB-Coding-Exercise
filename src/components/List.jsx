import { Typography, Divider, ListItemText } from "@material-ui/core";

const List = (props) => {
    const { 
        locationDataLength, 
        isClear, 
        locationData
    } = props;

    return (
        <div className="list">
        <Typography> Pinball Machines within 50 miles of entered coordinates</Typography>
        <br/>
        <Typography variant="h5"> {(typeof(locationDataLength) !== 'undefined' && locationDataLength > 1 ) && `${locationDataLength} Results`} </Typography>
        <Typography variant="h5"> {(typeof(locationDataLength) !== 'undefined' && locationDataLength === 1) && `${locationDataLength} Result`} </Typography>
        <Typography variant="h5"> {(typeof(locationDataLength) === 'undefined' && isClear === false) && "0 Results"} </Typography>
        <Typography variant="h5"> {(typeof(locationDataLength) === 'undefined' && isClear === true) && "Enter Search Parameters"} </Typography>
        <Divider /> 
        { (locationData && locationData?.locations) && (locationData?.locations).map((location, index) => {
          return <ListItemText key={index}> {`${index + 1}. ${location.name.toUpperCase()}   - ${location.street} ${location.city}, ${location.state}`} </ListItemText>
        }) }
      </div>
    )
}

export default List;