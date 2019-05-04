import React from "react";
import {
    Button, Card, CardHeader, Progress, Table,
    Container, Row, Col
} from "reactstrap";
import TopNavbar from "../Layout/TopNavbar";
import Header from "../Layout/Header";
import SectionHeaderElement from "../Section/SectionHeaderElement";
import SectionElement from "../Section/SectionElement";

class Index extends React.Component {
    state = {
        activeNav: 1,
        chartExample1Data: "data1"
    };

    render() {
        return (
            <>
                <TopNavbar />
                <Header />
                <Container className="mt--7" fluid>
                    <SectionHeaderElement
                        title={"Sales value"}
                        subtitle={"Overview"}
                        col="12"
                    >
                        <p className="text-light">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            ultrices arcu at sagittis aliquet. Donec convallis, felis id viverra sagittis, diam libero volutpat nunc,
                            pretium orci augue sed urna. Ut in laoreet lectus, in luctus purus. Cras a quam turpis.
                            Cras scelerisque hendrerit erat. Maecenas iaculis venenatis augue, a rutrum ex. Fusce vehicula urna molestie congue ultrices.
                            Suspendisse quis nulla nec risus varius pellentesque. Nullam efficitur sapien dolor, quis tincidunt justo scelerisque ac. Fusce justo erat,
                            ullamcorper et justo quis, efficitur egestas tellus. Integer interdum fermentum lorem, in placerat purus volutpat vitae.
                            Ut sodales cursus dolor eget molestie. Curabitur eget laoreet ligula. Aenean venenatis lorem nisi, nec dignissim ipsum malesuada ac.
                            In id porta tellus.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </p>
                    </SectionHeaderElement>
                    <SectionElement
                        title="Sales"
                        col="12"
                    >
                        <Table className="align-items-center table-flush" responsive>
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Page name</th>
                                    <th scope="col">Visitors</th>
                                    <th scope="col">Unique users</th>
                                    <th scope="col">Bounce rate</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">/argon/</th>
                                    <td>4,569</td>
                                    <td>340</td>
                                    <td>
                                        <i className="fas fa-arrow-up text-success mr-3" />{" "}
                                        46,53%
                                        </td>
                                </tr>
                                <tr>
                                    <th scope="row">/argon/index.html</th>
                                    <td>3,985</td>
                                    <td>319</td>
                                    <td>
                                        <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                                        46,53%
                                        </td>
                                </tr>
                                <tr>
                                    <th scope="row">/argon/charts.html</th>
                                    <td>3,513</td>
                                    <td>294</td>
                                    <td>
                                        <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                                        36,49%
                                        </td>
                                </tr>
                                <tr>
                                    <th scope="row">/argon/tables.html</th>
                                    <td>2,050</td>
                                    <td>147</td>
                                    <td>
                                        <i className="fas fa-arrow-up text-success mr-3" />{" "}
                                        50,87%
                                        </td>
                                </tr>
                                <tr>
                                    <th scope="row">/argon/profile.html</th>
                                    <td>1,795</td>
                                    <td>190</td>
                                    <td>
                                        <i className="fas fa-arrow-down text-danger mr-3" />{" "}
                                        46,53%
                                        </td>
                                </tr>
                            </tbody>
                        </Table>
                    </SectionElement>
                </Container>
            </>
        );
    }
}

export default Index;
