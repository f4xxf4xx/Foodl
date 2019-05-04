import React from "react";
import {
    Card, CardHeader, CardBody, Row, Col
} from "reactstrap";

type Props = {
    title: string;
    subtitle?: string;
    col: string;
}

class SectionHeaderElement
    extends React.Component<Props> {
    render() {
        const { title, subtitle, children, col } = this.props;

        return (
            <Row>
                <Col className="mb-5 mb-xl-0" xl={col}>
                    <Card className="bg-gradient-default shadow">
                        <CardHeader className="bg-transparent">
                            <Row className="align-items-center">
                                <div className="col">
                                    <h6 className="text-uppercase text-light ls-1 mb-1">
                                        {subtitle}
                                    </h6>
                                    <h2 className="text-white mb-0">{title}</h2>
                                </div>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            {children}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default SectionHeaderElement;
