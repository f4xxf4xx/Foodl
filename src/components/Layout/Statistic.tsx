import React from "react";

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

type Props = {
    name: string;
    value: number;
    icon: string;
    bgColor: string;
    col: string;
}

class Statistic extends React.Component<Props> {
    render() {
        const { name, value, icon, bgColor, col } = this.props;
        return (
            <Col lg={col} xl={col}>
                <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                        <Row>
                            <div className="col">
                                <CardTitle
                                    tag="h5"
                                    className="text-uppercase text-muted mb-0"
                                >
                                    {name}
                                </CardTitle>
                                <span className="h2 font-weight-bold mb-0">
                                    {value}
                                </span>
                            </div>
                            <Col className="col-auto">
                                <div className={`icon icon-shape ${bgColor} text-white rounded-circle shadow`}>
                                    <i className={`fas ${icon}`} />
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}

export default Statistic;
