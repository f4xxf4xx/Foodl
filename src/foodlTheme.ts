import { createMuiTheme } from "@material-ui/core/styles";

const muiBaseTheme = createMuiTheme();

export default createMuiTheme({
    typography: {
        h6: {
            
        }
    },
    overrides: {
        MuiButton: {
            root: {
                backgroundColor: "red",
                margin: "10px",
            }
        }
    }
});