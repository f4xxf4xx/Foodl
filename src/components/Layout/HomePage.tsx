import React, { PureComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import HeaderStatistics from './HeaderStatistics';


type Props = RouteComponentProps;

class HomePage extends PureComponent<Props> {
    render() {
        return (
            <>
                <Typography variant="h2">Welcome on Foodl</Typography>
                <Typography variant="body2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    ultrices arcu at sagittis aliquet. Donec convallis, felis id viverra sagittis, diam libero volutpat nunc,
                    pretium orci augue sed urna. Ut in laoreet lectus, in luctus purus. Cras a quam turpis.
                    Cras scelerisque hendrerit erat. Maecenas iaculis venenatis augue, a rutrum ex.
                    Fusce vehicula urna molestie congue ultrices.
                    Suspendisse quis nulla nec risus varius pellentesque. Nullam efficitur sapien dolor,
                    uis tincidunt justo scelerisque ac. Fusce justo erat,
                    ullamcorper et justo quis, efficitur egestas tellus. Integer interdum fermentum lorem,
                    in placerat purus volutpat vitae.
                    Ut sodales cursus dolor eget molestie. Curabitur eget laoreet ligula. Aenean venenatis
                    lorem nisi, nec dignissim ipsum malesuada ac.
                    In id porta tellus.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Typography>
                <HeaderStatistics />
            </>
        );
    }
}

export default withRouter(HomePage);