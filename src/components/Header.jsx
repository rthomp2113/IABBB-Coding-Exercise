import { Typography } from '@material-ui/core';

const Header = () => {
    return (
        <div className="App"> 
        <i><Typography variant="h1"> Pinball Machine Locator </Typography></i>
        <div className="instructions">
          <Typography> - Use this tool to find the nearest pinball machines within 50 miles of entered coordinates </Typography>
          <br />
          <Typography> - Click <b>SEARCH</b> after entering latitude and longitude coordinates </Typography>
          <br />
          <Typography> - Click <b>NEAR ME</b> to auto-populate current geo-coordinates </Typography>
          <br />
          <Typography> - Click <b>CLEAR</b> to clear coordinate values </Typography>
          <br />
          <Typography> - Click <b>CLEAR LIST</b> to clear list results </Typography>
        </div>
      </div>
    )
}

export default Header;