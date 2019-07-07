import React, { PureComponent } from 'react';
import { Typography } from '@material-ui/core';
import { compose } from "redux";
import { connect } from "react-redux";
import { ApplicationState } from '../..';
import { isAuthenticated } from '../../helpers/userHelper';
import { Title } from '../../layout/Styles/Sections';

type StateProps = {
    auth: any;
}

type Props = StateProps;

class HomePageBase extends PureComponent<Props> {
    render() {
        const { auth } = this.props;

        return (
            <>
                <Title>Welcome on Foodl</Title>
                {isAuthenticated(auth) &&
                    <Typography variant="h6">
                        Welcome, {auth.displayName}
                    </Typography>
                }
                <Typography paragraph align="justify">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    ultrices arcu at sagittis aliquet. Donec convallis, felis id viverra sagittis, diam libero volutpat nunc,
                    pretium orci augue sed urna. Ut in laoreet lectus, in luctus purus. Cras a quam turpis.
                    Cras scelerisque hendrerit erat. Maecenas iaculis venenatis augue, a rutrum ex.
                </Typography>
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
            </>
        );
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    auth: state.firebase.auth
});


const HomePage = compose(
    connect<StateProps>(mapStateToProps)
)(HomePageBase);

export default HomePage;