import { FC } from "react";
import { Grid } from "@mui/material";
import { ICases } from "../../interfaces";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Row, Col, Button } from "react-bootstrap";
import { CasesCard } from "./CasesCard";
import { Add } from "@mui/icons-material";
import { useRouter } from "next/router";

interface Props {
  cases: ICases[];
  isLoading: boolean;
}

export const CasesList: FC<Props> = ({ cases, isLoading }) => {
  const router = useRouter();
  const navigateTo = (url: string) => {
    router.push(url);
  };

  return (
    <Row>
      <Col className="cards">
        <div className="mp__floatingbutton">
          {["top"].map((placement) => (
            <OverlayTrigger
              key={placement}
              overlay={
                <Tooltip id={`tooltip-${placement}`}>Create a New case</Tooltip>
              }
            >
              <Button onClick={() => navigateTo(`/cases/managecase/new`)}>
                <Add />
              </Button>
            </OverlayTrigger>
          ))}
        </div>
        {!isLoading &&
          cases.map((caso, index) => <CasesCard key={index} usecase={caso} />)}
      </Col>
    </Row>
  );
};
