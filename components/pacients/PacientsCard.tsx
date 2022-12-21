import { FC, useMemo, useState } from "react";

import { Row, Col, Card, Image } from "react-bootstrap";
import NextLink from "next/link";
import { LockOpen, Lock } from "@mui/icons-material";

import { IPacients } from "../../interfaces";
import { ModalPacients } from "../ui/ModalPacients";
import Button from "react-bootstrap/Button";

interface Props {
  usepacient: IPacients;
}

export const PacientsCard: FC<Props> = ({ usepacient }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const pacientImage = useMemo(() => {
    return usepacient.images[0];
  }, [isImageLoaded, usepacient.images]);
  const [isSearching, setIsSearching] = useState(false);
  const [openmodal, setOpenModal] = useState(false);

  const handleClick = () => {
    setIsSearching(true);
    setOpenModal(true);
  };

  const handleClickClose = () => {
    setIsSearching(false);
    setOpenModal(false);
  };

  // tags

  return (
    <Card className="mb-2 cardanimation">
      <Card.Body>
        <Row>
          <Col xs={12} sm={12} md={1}>
            <Image
              className="fadeIn mb-1"
              fluid={true}
              roundedCircle={true}
              src={pacientImage}
              alt={usepacient.name}
              onLoad={() => setIsImageLoaded(true)}
            />
          </Col>
          <Col>
            <div className="d-flex justify-content-between  mb-2 pb-2 ">
              <h5>{usepacient.name}</h5>
              <div>
                <div className="d-inline ps-3">
                  DNI: <strong data-testid="dni">{usepacient.dni}</strong>
                </div>
                <div className="d-inline ps-3">
                  Birth date: <strong>{usepacient.birthDate}</strong>
                </div>
                <div className="d-inline ps-3">
                  <Button
                    disabled={isSearching}
                    variant="primary"
                    onClick={handleClick}
                  >
                    View Resume
                  </Button>

                  <NextLink
                    href={`/pacients/${usepacient.slug}`}
                    passHref
                    prefetch={false}
                  >
                    <Button variant="primary">View History</Button>
                  </NextLink>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <ModalPacients
          usepacient={usepacient}
          show={openmodal}
          close={handleClickClose}
        />
      </Card.Body>
    </Card>
  );
};
