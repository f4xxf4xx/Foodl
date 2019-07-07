import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { RouteProps } from "react-router-dom";
import { compose } from "redux";
import { ApplicationState } from "..";

type StateProps = {
    auth: any;
};

type Props = StateProps & RouteProps;

class GuessRouteBase extends PureComponent<Props> {
    render() {
        const { auth } = this.props;

        return (
            (auth.isLoaded && auth.isEmpty) ?
                <Route {...this.props} />
                :
                <Redirect to="/" />
        );
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    auth: state.firebase.auth
});


const GuessRoute = compose(
    connect<StateProps>(mapStateToProps)
)(GuessRouteBase);

export default GuessRoute;