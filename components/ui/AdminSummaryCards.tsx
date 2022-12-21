import { Row, Col, Card } from "react-bootstrap";
import { FC } from "react";

interface Props {
  title: string | number;
  subTitle: string;
  desc: string;
  icon: JSX.Element;
}

export const AdminSummaryCards: FC<Props> = ({
  title,
  subTitle,
  desc,
  icon,
}) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{subTitle}</Card.Title>
        <Row>
          <Col xs="2">{icon}</Col>
          <Col>
            <h1>{title}</h1>
          </Col>
        </Row>
        {desc}
      </Card.Body>
    </Card>
  );
};
