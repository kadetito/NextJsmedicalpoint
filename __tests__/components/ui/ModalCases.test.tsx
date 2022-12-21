import { ICases } from "../../../interfaces/cases";
import { LockOpen, Lock } from "@mui/icons-material";

import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { ModalCases } from "../../../components/ui";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      replace: "../../search/medics/",
    };
  },
}));

const usecase: ICases = {
  title: "Dummie title",
  _id: "123456789",
  description: "Dummie description",
  images: ["felisalafuente1.jpg", "felisalafuente2.jpg"],
  slug: "dummie_title",
  created_by: {
    _id: "11111",
    name: "Dummie creator",
    number_col: "DRDS456784",
  },
  dateReview: "2020-05-05",
  hourReview: "18:45",
  assignedTo: {
    _id: "2222222",
    name: "Dummie assigned",
    number_col: "DDS787458",
  },
  tags: ["dummie", "tags", "for", "testing"],
  isAssigned: "false",
  createdAt: "2022-12-13T23:41:14.933+00:00",
  updatedAt: "2022-12-13T23:41:14.933+00:00",
};

beforeEach(() =>
  render(<ModalCases useCases={usecase} show={true} close={false} />)
);

describe("ModalCases", () => {
  test("<ModalCases /> debe hacer match con el snapshot", () => {
    expect(screen).toMatchSnapshot();
  });

  test("Debe haber un titulo en la cabecera de la ventana modal", () => {
    const label = screen.getByTestId("usetitle");
    expect(label).toBeInTheDocument();
    expect(screen.getByText(usecase.title)).toBeInTheDocument();
  });

  test("Debe figurar una descripcion del caso", () => {
    const label = screen.getByTestId("description");
    expect(label).toBeInTheDocument();
    expect(screen.getByText(usecase.description)).toBeInTheDocument();
  });

  test("Debe figurar una fecha de la cita", () => {
    const label = screen.getByTestId("datedata");
    expect(label).toBeInTheDocument();
    expect(screen.getByText(usecase.dateReview)).toBeInTheDocument();
  });

  test("Debe figurar una hora de la cita", () => {
    const label = screen.getByTestId("hourdata");
    expect(label).toBeInTheDocument();
    expect(screen.getByText(usecase.hourReview)).toBeInTheDocument();
  });

  test("Debe haber un boton cerrar ", () => {
    const detailBtn = screen.getByRole("button", { name: /close/i });
    expect(detailBtn).toBeInTheDocument();
  });
});
