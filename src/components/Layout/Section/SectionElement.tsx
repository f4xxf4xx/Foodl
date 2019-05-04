import React from "react";
import {
    Card, CardHeader, CardBody, Row, Col, Button, Table
} from "reactstrap";
import SectionTitleElement from "./SectionTitleElement";

type Props = {
    title?: string;
    button?: any;
    col: string;
}

class SectionElement extends React.Component<Props> {
    render() {
        const { title, children, col, button } = this.props;

        return (
            <Col className="mb-5 mb-xl-0" xl={col}>
                <Card className="shadow">
                    {title &&
                        <SectionTitleElement title={title} button={button} />
                    }
                    {children}
                </Card>
            </Col>
        );
    }
}

export default SectionElement;
