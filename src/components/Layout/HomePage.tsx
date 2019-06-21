import React, { PureComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { Typography, Box } from '@material-ui/core';
import { Title } from './Styles/Sections';

type Props = RouteComponentProps;

class HomePage extends PureComponent<Props> {
    render() {
        return (
            <>
                <Title>Welcome on Foodl</Title>
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

                {/* <HeaderStatistics /> */}
            </>
        );
    }
}

export default withRouter(HomePage);