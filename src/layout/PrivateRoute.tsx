import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { Loader } from "semantic-ui-react";
import { ApplicationState } from "..";

const PrivateRoute = (props) => {
    const auth = useSelector((state: ApplicationState) => state.firebase.auth);

    return (
        auth.isLoaded ?
            <>
                {auth.isEmpty ?
                    <Redirect to="/login" />
                    :
                    <Route {...props} />
                }
            </>
            :
            <Loader active={true} inline="centered" />
    );
}

export default PrivateRoute;
