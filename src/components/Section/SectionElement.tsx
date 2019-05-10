import React from "react";
import {
    Card, Row, Col,
} from "reactstrap";
import SectionTitleElement from "./SectionTitleElement";

type Props = {
    title?: string;
    button?: any;
    col: string;
    marginTop?: string;
}

class SectionElement extends React.Component<Props> {
    render() {
        const { title, children, col, button, marginTop } = this.props;

        return (
            <Row className={`mt-${marginTop || 5}`}>
                <Col className="mb-5 mb-xl-0" xl={col}>
                    <Card className="shadow">
                        {title &&
                            <SectionTitleElement title={title} button={button} />
                        }
                        {children}
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default SectionElement;
