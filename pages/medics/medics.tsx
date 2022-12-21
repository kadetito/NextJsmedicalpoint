import { Row, Col, Card } from "react-bootstrap";
import { useMedics } from "../../hooks/useMedics";
import { ContentLayout } from "../../layouts/ContentLayout";
import { FC, useEffect, useRef, useState } from "react";
import { MedicsList } from "../../components/medics/MedicsList";

const Medics: FC = () => {
  const { medics, isLoading } = useMedics("/medics");

  return (
    <ContentLayout
      title="Medical Point - Medics"
      pageDescription="Medics description"
      queryType="medics"
    >
      <Row>
        <Col>
          <MedicsList medics={medics} isLoading={isLoading} />
        </Col>
      </Row>
    </ContentLayout>
  );
};

export default Medics;
