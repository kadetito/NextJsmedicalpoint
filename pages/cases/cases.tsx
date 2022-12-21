import { Row, Col, Card } from "react-bootstrap";
import { useCases } from "../../hooks/useCases";
import { ContentLayout } from "../../layouts/ContentLayout";
import { FC } from "react";
import { CasesList } from "../../components/cases/CasesList";

const Cases: FC = () => {
  const { cases, isLoading } = useCases("/cases");

  return (
    <ContentLayout
      title="Medical Point - Cases"
      pageDescription="Homepage description"
      queryType="cases"
    >
      <Row>
        <Col>
          <CasesList cases={cases} isLoading={isLoading} />
        </Col>
      </Row>
    </ContentLayout>
  );
};

export default Cases;
