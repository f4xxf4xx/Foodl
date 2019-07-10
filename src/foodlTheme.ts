import { createMuiTheme } from "@material-ui/core/styles";

const muiBaseTheme = createMuiTheme();

export default createMuiTheme({
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
