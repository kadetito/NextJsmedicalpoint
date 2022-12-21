import { useState, FC, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { ICases, IPacients, IUser } from "../../interfaces";
import { Row, Col } from "react-bootstrap";

interface Props {
  useCases: ICases;
  show: any;
  close: any;
}

export const ModalCases: FC<Props> = ({ useCases, show, close }) => {
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
          <Modal.Title data-testid="usetitle">{useCases.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col data-testid="description">{useCases.description}</Col>
          </Row>
          <Row>
            <Col>
              Fecha cita:{" "}
              <span data-testid="datedata">{useCases.dateReview}</span>{" "}
              <span data-testid="hourdata">{useCases.hourReview}</span>
            </Col>
            <Col>Creada por: {useCases.created_by.name}</Col>
          </Row>
          <Row>
            <Col>Está asignada?: {useCases.isAssigned} </Col>
          </Row>
          <Row>
            <Col>{useCases.tags}</Col>
          </Row>
          <Row>
            <Col>Creada: {useCases.createdAt}</Col>
            <Col>Actualizada: {useCases.updatedAt}</Col>
          </Row>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};
