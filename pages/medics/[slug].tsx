import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

import { dbMedics } from "../../database";

import { ContentLayout } from "../../layouts/ContentLayout";
import { Col, Row, Card, Nav, Button, Tab, Tabs } from "react-bootstrap";

import { BreadCrumb } from "../../components/ui/BreadCrumb";
import { IUser } from "../../interfaces/user";

interface Props {
  registro: IUser;
}

const MedicsPage: NextPage<Props> = ({ registro }) => {
  const router = useRouter();

  return (
    <ContentLayout
      queryType="medics"
      title={registro.name}
      pageDescription={registro.number_col}
    >
      <Row>
        <Col className="mb-3">
          <BreadCrumb
            titleURL="Medics"
            thisPageUrl="medics"
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
  const registroSlugs = await dbMedics.getAllMedicsSlugs();

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
  const registro = await dbMedics.getMedicsBySlug(slug);

  if (!registro) {
    return {
      redirect: {
        destination: "/medics",
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

export default MedicsPage;
