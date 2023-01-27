import { createTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';


const theme = createTheme({
    palette: {
        primary: green,
        secondary: red,
    },
})

export default theme;