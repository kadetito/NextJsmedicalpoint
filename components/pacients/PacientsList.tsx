import { FC } from "react";
import { Grid } from "@mui/material";

import { Row, Col } from "react-bootstrap";
import { PacientsCard } from "./PacientsCard";
import { IPacients } from "../../interfaces/pacients";

interface Props {
  pacients: IPacients[];
  isLoading: boolean;
}

export const PacientsList: FC<Props> = ({ pacients, isLoading }) => {
  return (
    <Row>
      <Col className="cards">
        {!isLoading &&
          pacients.map((pacient, index) => (
            <PacientsCard key={index} usepacient={pacient} />
          ))}
      </Col>
    </Row>
  );
};
