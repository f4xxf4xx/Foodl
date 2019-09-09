import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { ApplicationState } from "..";
import { Loader } from "semantic-ui-react";

const GuessRoute = (props) => {
    const auth = useSelector((state: ApplicationState) => state.firebase.auth);

    return (
        auth.isLoaded ?
            <>
                {auth.isEmpty ?
                    <Route {...props} />
                    :
                    <Redirect to="/" />
                }
            </>
            :
            <Loader active={true} inline="centered" />
    );
}

export default GuessRoute;
