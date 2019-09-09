import React from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink, withRouter, RouteComponentProps } from "react-router-dom";
import { ApplicationState } from "..";
import { StyledAppBar } from "./Styles/StyledAppBar";
import { Toolbar, Link } from "@material-ui/core";
import { StyledMenuIcon } from "./Styles/StyledMenuIcon";
import { isAuthenticated } from "../helpers/userHelper";
import { Menu as MenuIcon } from "@material-ui/icons";
import { StyledSpacer } from "./Styles/StyledSpacer";
import { ButtonSecondary } from "./Styles/Buttons";
import { firebase } from "./../config"

type OwnProps = {
    toggleDrawer: () => void;
}

type Props = RouteComponentProps & OwnProps;

const Header = (props: Props) => {
    const auth = useSelector((state: ApplicationState) => state.firebase.auth);
    const firebase2 = useSelector((state: ApplicationState) => state.firebase);

    console.log(firebase2);
    
    const onSignOutClick = () => {
        firebase.auth().signOut();
        props.history.push("/");
    }

    const redirectToLogin = () => {
        props.history.push("/login")
    }

    return (
        <StyledAppBar position="fixed">
            <Toolbar>
                <StyledMenuIcon onClick={props.toggleDrawer}>
                    {isAuthenticated(auth) &&
                        <MenuIcon />
                    }
                </StyledMenuIcon>
                <Link to="/" component={RouterLink} variant="h6" noWrap={true}>
                    Foodl
                </Link>
                <StyledSpacer />
                {isAuthenticated(auth) ?
                    <ButtonSecondary width="80" onClick={onSignOutClick}>Sign out</ButtonSecondary>
                    :
                    <ButtonSecondary width="80" onClick={redirectToLogin}>Login</ButtonSecondary>
                }
            </Toolbar>
        </StyledAppBar >
    );
}

export default withRouter(Header);
