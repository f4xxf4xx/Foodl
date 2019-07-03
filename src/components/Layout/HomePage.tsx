import React, { PureComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { Typography, Box, Link } from '@material-ui/core';
import { Title } from './Styles/Sections';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { authConfig } from '../../config';
import * as firebase from 'firebase';
import * as userActions from './../User/userActions';
import { bindActionCreators, Dispatch, compose } from 'redux';
import { connect } from "react-redux";

type State = {
    signedIn: boolean;
}

type DispatchProps = {
    userSignIn: typeof userActions.userSignIn;
    userSignOut: typeof userActions.userSignOut;
};

type Props = RouteComponentProps & DispatchProps;

class HomePageBase extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            signedIn: false
        };
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(
            (user) => {
                if(user) {
                    this.setState({ signedIn: true })
                }
            }
        );
    }

    // Make sure we un-register Firebase observers when the component unmounts.
    componentWillUnmount() {
        //
    }

    render() {
        const user = firebase.auth().currentUser;
        const { signedIn } = this.state;

        return (
            <>
                <Title>Welcome on Foodl</Title>
                {signedIn &&
                    <>
                        {user ?
                            <div>
                                Welcome, {user.email}
                                <Link onClick={() => firebase.auth().signOut()}>Sign out</Link>
                            </div>
                            :
                            <StyledFirebaseAuth uiConfig={authConfig} firebaseAuth={firebase.auth()} />
                        }
                    </>
                }
                <Box width="50%">
                    <Typography paragraph align="justify">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        ultrices arcu at sagittis aliquet. Donec convallis, felis id viverra sagittis, diam libero volutpat nunc,
                        pretium orci augue sed urna. Ut in laoreet lectus, in luctus purus. Cras a quam turpis.
                        Cras scelerisque hendrerit erat. Maecenas iaculis venenatis augue, a rutrum ex.
                    </Typography>
                </Box>
                <Box width="50%">
                    <Typography paragraph align="justify">
                        Fusce vehicula urna molestie congue ultrices.
                        Suspendisse quis nulla nec risus varius pellentesque. Nullam efficitur sapien dolor,
                        uis tincidunt justo scelerisque ac. Fusce justo erat,
                        ullamcorper et justo quis, efficitur egestas tellus. Integer interdum fermentum lorem,
                        in placerat purus volutpat vitae.
                        Ut sodales cursus dolor eget molestie. Curabitur eget laoreet ligula. Aenean venenatis
                        lorem nisi, nec dignissim ipsum malesuada ac.
                        In id porta tellus.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Typography>
                </Box>
            </>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        userSignIn: bindActionCreators(userActions.userSignIn, dispatch),
        userSignOut: bindActionCreators(userActions.userSignOut, dispatch)
    };
};

const HomePage = compose(
    connect<{}, DispatchProps>(null, mapDispatchToProps)
)(withRouter(HomePageBase));

export default HomePage;