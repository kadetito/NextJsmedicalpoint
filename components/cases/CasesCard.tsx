import { FC, useContext, useEffect, useMemo, useState } from "react";

import { Row, Col, Card } from "react-bootstrap";
import NextLink from "next/link";
import { LockOpen, Lock } from "@mui/icons-material";

import useSWR from "swr";
import { ModalCases } from "../ui/ModalCases";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../../context/auth/AuthContext";
import dbgeneralApi from "../../apidatabase/dbgeneralApi";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Case from "../../models/Cases";
import { ICases, IApplicants } from "../../interfaces";
import { FullScreenLoading } from "../ui";
import { LittleScreenLoading } from "../ui/LittleScreenLoading";
import Swal from "sweetalert2";

interface Props {
  usecase: ICases;
}

export const CasesCard: FC<Props> = ({ usecase }) => {
  const router = useRouter();
  const { data, error } = useSWR<ICases[]>("/api/cases");
  const { user, isLoggedIn, logout } = useContext(AuthContext);

  const [isMyCase, setIsMyCase] = useState(false);
  const { number_col } = usecase.created_by;
  useEffect(() => {
    if (number_col === user?.number_col) {
      setIsMyCase(true);
    }
  }, []);

  const caseImage = useMemo(() => {
    return usecase.images[1];
  }, [usecase.images]);
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

  /**--------------------------------------------------------------------- */

  const [applicates, setApplicates] = useState(false);

  useEffect(() => {
    if (data) {
      data.map((apli: any) => {
        if (apli.applicants.length > 0) {
          apli.applicants.map((reapl: any) => {
            if (reapl._id === user?._id && usecase._id === apli._id) {
              setApplicates(true);
            } else {
              setApplicates(false);
            }
          });
        }
      });
    }
  }, [data, user, usecase]);

  const onRoleUpdated = async (
    caseId: string,
    userId: string,
    name: string,
    number_col: string
  ) => {
    try {
      Swal.fire({
        title: "Apply to this case?",
        text: "A continuación aplicará a este caso y apsará a la lista de candidatos para cubrir la tarea. En caso de ser designado, recibirá un mensaje de correo ",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, apply!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await dbgeneralApi.put("/cases", {
            caseId,
            userId,
            name,
            number_col,
          });
          setApplicates(true);
          Swal.fire(
            "Ha sido asigado a este caso",
            "Le comunicaremos en breve si es escogido.",
            "success"
          );
        }
      });
    } catch (error) {
      setApplicates(false);
      console.log(error);
      alert(error);
    }
  };

  const onRoleDeleteAssignation = async (
    caseId: string,
    userId: string,
    name: string,
    number_col: string
  ) => {
    try {
      Swal.fire({
        title: "Retirar la candidatura?",
        text: "A continuación se dispone a retirarse de la candidatura para cubrir esta tarea. Puede volver a optar por aplicar de nuevo.",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, desasignar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await dbgeneralApi.put("/cases", {
            caseId,
            userId,
            name: "",
            number_col: "",
          });

          setApplicates(false);
          Swal.fire(
            "Se ha retirado de este caso",
            "Si lo desea podrá volver a aplicar.",
            "success"
          );
        }
      });
    } catch (error) {
      setApplicates(true);
      console.log(error);
      alert(error);
    }
  };
  /**--------------------------------------------------------------------------------------------- */

  return data === null && !user && !usecase.isAssigned ? (
    <LittleScreenLoading />
  ) : (
    <Card className="mb-2 cardanimation">
      <Card.Body className={isMyCase ? `opacity-50` : `opacity-100`}>
        <div className="d-flex justify-content-between border-bottom mb-2 pb-2 border-dark border-opacity-25">
          <h5>{usecase.title}</h5>
          <div>
            <small>
              Creada por:{" "}
              <strong>
                <span data-testid="creator">{usecase.created_by.name}</span>
              </strong>
            </small>
          </div>
        </div>
        <Card.Text>{usecase.description.substring(0, 350)}</Card.Text>
        <div className="d-flex justify-content-between border-top mt-2 pt-2 border-dark border-opacity-25">
          <div>
            <small>
              Fecha cita:{" "}
              <strong>
                {usecase.dateReview} {usecase.hourReview}
              </strong>
            </small>
          </div>
          <div>
            {usecase.isAssigned === "true" ? (
              <div title="Assigned" className="d-inline ps-3">
                <Lock />
              </div>
            ) : (
              <div title="Not assigned" className="d-inline ps-3">
                <LockOpen />
              </div>
            )}

            <div className="d-inline ps-3">
              <small>
                Creada: <strong>{usecase.createdAt}</strong>
              </small>
            </div>
            <div className="d-inline ps-3">
              <Button
                name="1"
                disabled={isSearching}
                variant="primary"
                onClick={handleClick}
              >
                Open detail
              </Button>

              <NextLink
                href={`/cases/${usecase.slug}`}
                passHref
                prefetch={false}
              >
                <Button variant="primary">View All</Button>
              </NextLink>
            </div>

            {isMyCase ? null : (
              <div className="d-inline ps-3">
                {usecase.isAssigned === "true" ? null : applicates ? (
                  <>
                    <Button
                      variant="danger"
                      onClick={({ target }) =>
                        onRoleDeleteAssignation(
                          usecase._id,
                          user!._id,
                          user!.name,
                          user!.number_col
                        )
                      }
                    >
                      Desasignar
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="secondary"
                      onClick={({ target }) =>
                        onRoleUpdated(
                          usecase._id,
                          user!._id,
                          user!.name,
                          user!.number_col
                        )
                      }
                    >
                      Asignarme
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <ModalCases
          useCases={usecase}
          show={openmodal}
          close={handleClickClose}
        />
      </Card.Body>
    </Card>
  );
};
