import { useState, FC, useEffect, useMemo } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { IPacients } from "../../interfaces";
import { Row, Col, Image } from "react-bootstrap";

interface Props {
  usepacient: IPacients;
  show: any;
  close: any;
}

export const ModalPacients: FC<Props> = ({ usepacient, show, close }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const pacientImage = useMemo(() => {
    return usepacient.images;
  }, [isImageLoaded, usepacient.images]);

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
          <Modal.Title data-testid="usetitle">{usepacient.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={12} sm={12} md={3}>
              <div>
                <Image
                  fluid={true}
                  thumbnail={true}
                  className="fadeIn mb-1"
                  src={pacientImage[0]}
                  alt={usepacient.name}
                  onLoad={() => setIsImageLoaded(true)}
                />
                <Image
                  fluid={true}
                  thumbnail={true}
                  className="fadeIn"
                  src={pacientImage[1]}
                  alt={usepacient.name}
                  onLoad={() => setIsImageLoaded(true)}
                />
              </div>
            </Col>
            <Col>
              <Row>
                <Col>
                  <ul>
                    <li>
                      DNI: <strong data-testid="dni">{usepacient.dni}</strong>
                    </li>
                    <li>
                      Birth date: <strong>{usepacient.birthDate}</strong>
                    </li>
                  </ul>
                </Col>
              </Row>
              <Row>
                <Col>{usepacient.tags}</Col>
              </Row>
              <Row>
                <Col>
                  <ul>
                    {usepacient.hystorial.map((hysto, index) => (
                      <li key={index}>
                        <strong>{hysto.dateCase}</strong> - {hysto.description}
                      </li>
                    ))}
                  </ul>
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
