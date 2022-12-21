import { useState, FC, useEffect, useMemo } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { IUser } from "../../interfaces";
import { Row, Col, Image } from "react-bootstrap";

interface Props {
  usemedic: IUser;
  show: any;
  close: any;
}

export const ModalMedics: FC<Props> = ({ usemedic, show, close }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const medicImage = useMemo(() => {
    return usemedic.images;
  }, [isImageLoaded, usemedic.images]);

  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={close}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title data-testid="usetitle">{usemedic.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={12} sm={12} md={3}>
              <div>
                <Image
                  fluid={true}
                  thumbnail={true}
                  className="fadeIn mb-1"
                  src={medicImage[0]}
                  alt={usemedic.name}
                  onLoad={() => setIsImageLoaded(true)}
                />
                {/* <Image
                  fluid={true}
                  thumbnail={true}
                  className="fadeIn"
                  src={medicImage[1]}
                  alt={usemedic.name}
                  onLoad={() => setIsImageLoaded(true)}
                /> */}
              </div>
            </Col>
            <Col>
              <Row>
                <Col>
                  <h5 data-testid="expertise">{usemedic.expertise}</h5>
                  <ul>
                    <li>
                      Número colegiado:{" "}
                      <strong data-testid="numbercol">
                        {usemedic.number_col}
                      </strong>
                    </li>
                    <li>
                      Birth date: <b>{usemedic.birthDate}</b>
                    </li>
                  </ul>
                </Col>
              </Row>
              <Row>
                <Col>{usemedic.tags}</Col>
              </Row>
              <Row>
                <Col>
                  {/* <ul>
                    {usemedic.hystorial.map((hysto, index) => (
                      <li key={index}>
                        <strong>{hysto.dateCase}</strong> - {hysto.description}
                      </li>
                    ))}
                  </ul> */}
                </Col>
              </Row>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};
