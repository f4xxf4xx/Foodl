import { createMuiTheme } from "@material-ui/core/styles";
import {  } from "@material-ui/core/colors";

const muiBaseTheme = createMuiTheme();

export default createMuiTheme({
    palette: {
        primary: {
          main: "#217fff",
          light: "#43adff"
        },
    },
    typography: {
        h3: {
        
        },
        h6: {

        },
    },
    overrides: {
        MuiPaper: {
            elevation16: {
                width: "240px",
            },
        },
        MuiTypography: {
            h3: {
                marginBottom: "12px !important"
            },
            subtitle2: {
                color: "white"
            }
        }
    },
});
