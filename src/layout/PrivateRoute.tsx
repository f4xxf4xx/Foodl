import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { RouteProps } from "react-router-dom";
import { compose } from "redux";
import { Loader } from "semantic-ui-react";
import { ApplicationState } from "..";

type StateProps = {
    auth: any;
};

type Props = StateProps & RouteProps;

class PrivateRouteBase extends PureComponent<Props> {
    render() {
        const { auth } = this.props;

        return (
            auth.isLoaded ?
                <>
                    {auth.isEmpty ?
                        <Redirect to="/login" />
                        :
                        <Route {...this.props} />
                    }                    
                </>
                :
                <Loader active inline='centered' />
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