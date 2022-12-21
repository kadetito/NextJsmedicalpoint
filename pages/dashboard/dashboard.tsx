import { Row, Col } from "react-bootstrap";
import { ContentLayout } from "../../layouts/ContentLayout";
import { FC, useContext } from "react";
import { AuthContext } from "../../context/auth/AuthContext";

const Dashboard: FC = () => {
  const { user, isLoggedIn, logout } = useContext(AuthContext);

  return (
    <ContentLayout
      title="Medical Point - Dashboard"
      pageDescription="Homepage description"
      queryType="cases"
    >
      {user?.role === "admin" ? (
        <Row>
          <Col>You're logged as Administrator</Col>
        </Row>
      ) : user?.role === "client" ? (
        <Row>
          <Col>You're logged as Guess</Col>
        </Row>
      ) : (
        <Row>
          <Col>You're not logged, goto to the authentication</Col>
        </Row>
      )}
    </ContentLayout>
  );
};

export default Dashboard;
