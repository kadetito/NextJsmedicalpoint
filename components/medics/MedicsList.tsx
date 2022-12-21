import { FC } from "react";
import { Grid } from "@mui/material";

import { Row, Col } from "react-bootstrap";
import { MedicsCard } from "./MedicsCard";
import { IUser } from "../../interfaces/user";

interface Props {
  medics: IUser[];
  isLoading: boolean;
}

export const MedicsList: FC<Props> = ({ medics, isLoading }) => {
  return (
    <Row>
      <Col className="cards">
        {!isLoading &&
          medics.map((medic, index) => (
            <MedicsCard key={index} usemedic={medic} />
          ))}
      </Col>
    </Row>
  );
};
