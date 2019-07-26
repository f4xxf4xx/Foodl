import { Typography, Grid } from "@material-ui/core";
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { ApplicationState } from "../..";
import { isAuthenticated } from "../../helpers/userHelper";
import { Icon } from "@material-ui/core";

interface StateProps {
    auth: any;
}

type Props = StateProps;

class HomePageBase extends PureComponent<Props> {
    public render() {
        const { auth } = this.props;

        return (
            <>
                {isAuthenticated(auth) ?
                    <Typography variant="h6">
                        Welcome, {auth.displayName}
                    </Typography>
                    :
                    <>
                    <Typography variant="h3" align="center">Foodl</Typography>
                    <Typography variant="h6" align="center">
                        An app for foodies
                    </Typography>
                    <Grid container={true} spacing={5}>
                        <Grid item={true} xs={12} sm={4} lg={4}>
                            <Typography align="center">
                                <Icon>library_books</Icon>
                            </Typography>
                            <Typography paragraph={true} align="justify">
                                Manage your own cookbook by creating recipes, and share the recipes to the people you love.
                            </Typography>
                        </Grid>
                        <Grid item={true} xs={12} sm={4} lg={4}>
                            <Typography align="center">
                                <Icon>shopping_cart</Icon>
                            </Typography>
                            <Typography paragraph={true} align="justify">
                                Keep track of food you need to buy to make recipes, or for ingredients you are running low of.
                            </Typography>
                        </Grid>
                        <Grid item={true} xs={12} sm={4} lg={4}>
                            <Typography align="center">
                                <Icon>restaurant</Icon>
                            </Typography>
                            <Typography paragraph={true} align="justify">
                                Share restaurants you suggest to your friends and keep a bucket list of restaurants you want to go to.
                            </Typography>
                        </Grid>
                    </Grid>
                    </>
                }
            </>
        );
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    auth: state.firebase.auth,
});

const HomePage = compose(
    connect<StateProps>(mapStateToProps),
)(HomePageBase);

export default HomePage;
