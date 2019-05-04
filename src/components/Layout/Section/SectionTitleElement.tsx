import React from "react";
import {
    Card, CardHeader, CardBody, Row, Col, Button, Table
} from "reactstrap";

type Props = {
    title?: string;
    button?: any;
}

class SectionTitleElement extends React.Component<Props> {
    render() {
        const { title, button } = this.props;

        return (
            <CardHeader className="border-0">
                <Row className="align-items-center">
                    <div className="col">
                        <h3 className="mb-0">{title}</h3>
                    </div>
                    <div className="col text-right">
                        {button}
                    </div>
                </Row>
            </CardHeader>
        );
    }
}

export default SectionTitleElement;
