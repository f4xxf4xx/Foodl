import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { RouteProps } from "react-router-dom";
import { compose } from "redux";
import { ApplicationState } from "../..";
import { isAuthenticated } from "../../helpers/userHelper";

type StateProps = {
    auth: any;
};

type Props = StateProps & RouteProps;

class PrivateRouteBase extends PureComponent<Props> {
    render() {
        const { auth } = this.props;

        return (
            isAuthenticated(auth) ?
                <Route {...this.props} />
                :
                <Redirect to="/login" />
        );
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    auth: state.firebase.auth
});


const PrivateRoute = compose(
    connect<StateProps>(mapStateToProps)
)(PrivateRouteBase);

export default PrivateRoute;