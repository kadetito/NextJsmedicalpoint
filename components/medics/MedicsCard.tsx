import { FC, useMemo, useState } from "react";

import { Row, Col, Card, Image } from "react-bootstrap";
import NextLink from "next/link";
import { LockOpen, Lock } from "@mui/icons-material";

import { IUser } from "../../interfaces";
import { ModalMedics } from "../ui/ModalMedics";
import Button from "react-bootstrap/Button";

interface Props {
  usemedic: IUser;
}

export const MedicsCard: FC<Props> = ({ usemedic }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const medicImage = useMemo(() => {
    return usemedic.images[0];
  }, [isImageLoaded, usemedic.images]);
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

  return (
    <Card className="mb-2 cardanimation">
      <Card.Body>
        <Row>
          <Col xs={12} sm={12} md={1}>
            <Image
              className="fadeIn mb-1"
              fluid={true}
              thumbnail={true}
              src={medicImage}
              alt={usemedic.name}
              onLoad={() => setIsImageLoaded(true)}
            />
          </Col>
          <Col>
            <div className="d-flex justify-content-between  mb-2 pb-2 ">
              <div>
                <h5>{usemedic.name}</h5>
                <p>
                  Número de colegiado:{" "}
                  <strong data-testid="numcol">{usemedic.number_col}</strong>
                </p>
              </div>
              <div>
                <div className="d-inline ps-3">
                  Especialidad:{" "}
                  <strong data-testid="expertis">{usemedic.expertise}</strong>
                </div>
                <div className="d-inline ps-3">
                  Birth date: <strong>{usemedic.birthDate}</strong>
                </div>
                <div className="d-inline ps-3">
                  <Button
                    disabled={isSearching}
                    variant="primary"
                    onClick={handleClick}
                  >
                    View profile
                  </Button>

                  <NextLink
                    href={`/medics/${usemedic.slug}`}
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
        <ModalMedics
          usemedic={usemedic}
          show={openmodal}
          close={handleClickClose}
        />
      </Card.Body>
    </Card>
  );
};
