import React from "react";
import {
  Card, CardHeader, CardBody, Row, Col, Button, Table
} from "reactstrap";

type Props = {
  title?: string;
  col: string;
}

class CardElement extends React.Component<Props> {
  render() {
    const { title, children, col } = this.props;

    return (
      <Col className="mb-5 mb-xl-0" xl={col}>
        <Card className="shadow">
          {title &&
            <CardHeader className="border-0">
              <Row className="align-items-center">
                <div className="col">
                  <h3 className="mb-0">{title}</h3>
                </div>
                <div className="col text-right">
                  <Button
                    color="primary"
                    onClick={e => e.preventDefault()}
                    size="sm"
                  >
                    See all
                </Button>
                </div>
              </Row>
            </CardHeader>
          }
          {children}
        </Card>
      </Col>
    );
  }
}

export default CardElement;
