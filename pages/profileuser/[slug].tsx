import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

import { getSession } from "next-auth/react";
import { dbMedics } from "../../database";

import { ContentLayout } from "../../layouts/ContentLayout";
import { Col, Row, Card, Nav, Button, Tab, Tabs } from "react-bootstrap";

import { useEffect, useState, useContext } from "react";
import { BreadCrumb } from "../../components/ui/BreadCrumb";
import { IUser } from "../../interfaces/user";

import { AuthContext } from "../../context/auth/AuthContext";
import { PersonalInfo } from "../../components/profileuser/PersonalInfo";
import { ActivityUser } from "../../components/profileuser/ActivityUser";
import { FullScreenLoading } from "@/components/ui";

interface Props {
  registro: IUser;
}

const UserProfilePage: NextPage<Props> = ({ registro }) => {
  const { user, isLoggedIn, logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [calledPush, setCalledPush] = useState(false);
  const { replace } = useRouter();

  useEffect(() => {
    if (isLoggedIn && user?._id === registro._id) {
      setLoading(false);
    } else {
      if (calledPush) {
        return;
      }
      //replace("/");
      setCalledPush(true);
    }
  }, [user, isLoggedIn]);

  return loading ? (
    <FullScreenLoading />
  ) : (
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
              <Tab.Container
                id="left-tabs-example"
                defaultActiveKey="personalinfo"
              >
                <Row>
                  <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link eventKey="personalinfo">
                          Personal info
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="activityuser">Activity</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={9}>
                    <Tab.Content>
                      <Tab.Pane
                        style={{ height: "750px" }}
                        eventKey="personalinfo"
                      >
                        <PersonalInfo />
                      </Tab.Pane>
                      <Tab.Pane
                        style={{ height: "750px" }}
                        eventKey="activityuser"
                      >
                        <ActivityUser />
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </ContentLayout>
  );
};

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   const session: any = await getSession({ req });
//   console.log(session);

//   if (session.user._id !== req.registro._id) {
//     return {
//       redirect: {
//         destination: "/auth/login?p=/orders/history",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// };

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

export default UserProfilePage;
