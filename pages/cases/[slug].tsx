import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

import { dbCases } from "../../database";

import { ContentLayout } from "../../layouts/ContentLayout";
import { Col, Row, Card, Nav, Button, Tab, Tabs } from "react-bootstrap";

import { BreadCrumb } from "../../components/ui/BreadCrumb";
import { ICases } from "../../interfaces/cases";

interface Props {
  registro: ICases;
}

const CasesPage: NextPage<Props> = ({ registro }) => {
  const router = useRouter();

  return (
    <ContentLayout
      queryType="cases"
      title={registro.title}
      pageDescription={registro.description}
    >
      <Row>
        <Col className="mb-3">
          <BreadCrumb
            titleURL="Cases"
            thisPageUrl="cases"
            thisPageTitle={registro.title}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h3">{registro.title}</Card.Title>
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
  const registroSlugs = await dbCases.getAllCasesSlugs();

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
  const registro = await dbCases.getCasesBySlug(slug);

  if (!registro) {
    return {
      redirect: {
        destination: "/cases",
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

export default CasesPage;
