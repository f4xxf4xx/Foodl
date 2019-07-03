import React, { PureComponent } from 'react';
import { Typography, Box } from '@material-ui/core';
import { Title } from './Styles/Sections';
import * as firebase from 'firebase';
import { compose } from "redux";
import { connect } from "react-redux";
import { ApplicationState } from '../..';

type StateProps = {
    signedIn: boolean;
}

type Props = StateProps;

class HomePageBase extends PureComponent<Props> {
    render() {
        const { signedIn } = this.props;
        const user = firebase.auth().currentUser;

        return (
            <>
                <Title>Welcome on Foodl</Title>
                {signedIn && user &&
                    <div>
                        Welcome, {user.email}
                    </div>
                }
                <Box>
                    <Typography paragraph align="justify">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        ultrices arcu at sagittis aliquet. Donec convallis, felis id viverra sagittis, diam libero volutpat nunc,
                        pretium orci augue sed urna. Ut in laoreet lectus, in luctus purus. Cras a quam turpis.
                        Cras scelerisque hendrerit erat. Maecenas iaculis venenatis augue, a rutrum ex.
                    </Typography>
                </Box>
                <Box>
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

const mapStateToProps = (state: ApplicationState) => ({
    signedIn: state.users.signedIn
});


const HomePage = compose(
    connect<StateProps>(mapStateToProps)
)(HomePageBase);

export default HomePage;