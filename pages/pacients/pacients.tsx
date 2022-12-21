import { Row, Col, Card } from "react-bootstrap";
import { usePacients } from "../../hooks/usePacients";
import { ContentLayout } from "../../layouts/ContentLayout";
import { FC } from "react";
import { PacientsList } from "../../components/pacients/PacientsList";

const Pacients: FC = () => {
  const { pacients, isLoading } = usePacients("/pacients");

  return (
    <ContentLayout
      title="Medical Point - Pacients"
      pageDescription="Pacients description"
      queryType="pacients"
    >
      <Row>
        <Col>
          <PacientsList pacients={pacients} isLoading={isLoading} />
        </Col>
      </Row>
    </ContentLayout>
  );
};

export default Pacients;
