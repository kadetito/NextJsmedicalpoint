import React from "react";
import Swal from "sweetalert2";
import dbgeneralApi from "../apidatabase/dbgeneralApi";
import { useState } from "react";

const [applicatesR, setApplicatesR] = useState(false);

export const onRoleUpdated = async (
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
    }).then(async (result: { isConfirmed: any }) => {
      if (result.isConfirmed) {
        await dbgeneralApi.put("/cases", {
          caseId,
          userId,
          name,
          number_col,
        });

        Swal.fire(
          "Ha sido asigado a este caso",
          "Le comunicaremos en breve si es escogido.",
          "success"
        );
        setApplicatesR(true);
      }
    });
  } catch (error) {
    setApplicatesR(false);
    console.log(error);
    alert(error);
  }
};

export const onRoleDeleteAssignation = async (
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

        setApplicatesR(false);
        Swal.fire(
          "Se ha retirado de este caso",
          "Si lo desea podrá volver a aplicar.",
          "success"
        );
      }
    });
  } catch (error) {
    setApplicatesR(true);
    console.log(error);
    alert(error);
  }
};

export const useOnRoleUpdated = () => {
  return applicatesR;
};
