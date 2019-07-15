import { createMuiTheme } from "@material-ui/core/styles";
import { green, orange } from "@material-ui/core/colors";

const muiBaseTheme = createMuiTheme();

export default createMuiTheme({
    palette: {
        primary: {
          main: "#217fff",
          light: "#43adff"
        },
    },
    typography: {
        h6: {

        },
    },
    overrides: {
        MuiPaper: {
            elevation16: {
                width: "240px",
            },
        },
    },
});
