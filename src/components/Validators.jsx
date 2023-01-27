import { Typography } from '@material-ui/core';

const Validators = (props) => {
    const { isValidator, validLatitude, validLongitude } = props;

    return (
        <div className="validator">
            { isValidator && <Typography color="secondary"> Must Enter Latitude and Longitude Values </Typography> }
            { validLatitude && <Typography color="secondary"> Latitude Value Must be Between -90 and 90 </Typography> }
            { validLongitude && <Typography color="secondary"> Longitude Value Must be Between -180 and 180 </Typography> }
        </div>
    )
}

export default Validators;