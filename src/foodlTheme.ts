import { createMuiTheme } from "@material-ui/core/styles";
import {  } from "@material-ui/core/colors";

export default createMuiTheme({
    palette: {
        primary: {
          main: "#217fff",
          light: "#43adff"
        },
        secondary: {
            main: "rgba(0, 0, 0, 0.87)"
        }
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
        },
        MuiButton: {
            root: {
                textTransform: "none"
            }
        }
    },
});
