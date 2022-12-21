import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

import { dbPacients } from "../../database";

import { ContentLayout } from "../../layouts/ContentLayout";
import { Col, Row, Card, Nav, Button, Tab, Tabs } from "react-bootstrap";
import { IPacients } from "../../interfaces/pacients";
import { useState } from "react";
import { BreadCrumb } from "../../components/ui/BreadCrumb";

interface Props {
  registro: IPacients;
}

const PacientsPage: NextPage<Props> = ({ registro }) => {
  const router = useRouter();

  return (
    <ContentLayout
      queryType="pacients"
      title={registro.name}
      pageDescription={registro.dni}
    >
      <Row>
        <Col className="mb-3">
          <BreadCrumb
            titleURL="Pacients"
            thisPageUrl="pacients"
            thisPageTitle={registro.name}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h3">{registro.name}</Card.Title>
            </Card.Header>
            <Card.Body>
              <Tabs>
                <Tab eventKey="first" title="Home">
                  <p>HOMEE</p>
                </Tab>
                <Tab eventKey="second" title="Second">
                  <p>SECOND</p>
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </ContentLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const registroSlugs = await dbPacients.getAllPacientsSlugs();

  return {
    paths: registroSlugs.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = "" } = params as { slug: string };
  const registro = await dbPacients.getPacientsBySlug(slug);

  if (!registro) {
    return {
      redirect: {
        destination: "/pacients",
        permanent: false,
      },
    };
  }

  return {
    props: {
      registro,
    },
    revalidate: 60 * 60 * 24,
  };
};

export default PacientsPage;
