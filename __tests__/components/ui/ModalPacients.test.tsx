import { IPacients } from "../../../interfaces/pacients";

import { render, screen } from "@testing-library/react";
import React from "react";
import { ModalPacients } from "../../../components/ui";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      replace: "../../search/medics/",
    };
  },
}));

const usepacient: IPacients = {
  _id: "111111",
  name: "Felisa Fuentes",
  dni: "45851245S",
  images: ["felisalafuente1.jpg", "felisalafuente2.jpg"],
  slug: "felisa_fuentes",
  birthDate: "1974-12-12",
  tags: ["ginecologia", "obstetricia"],
  hystorial: [],
  createdAt: "2022-12-13T23:41:14.933+00:00",
  updatedAt: "2022-12-13T23:41:14.933+00:00",
};

beforeEach(() =>
  render(<ModalPacients usepacient={usepacient} show={true} close={false} />)
);

describe("ModalPacients", () => {
  test("<ModalPacients /> debe hacer match con el snapshot", () => {
    expect(screen).toMatchSnapshot();
  });

  test("Debe haber un nombre en la cabecera de la ventana modal", () => {
    const label = screen.getByTestId("usetitle");
    expect(label).toBeInTheDocument();
    expect(screen.getByText(usepacient.name)).toBeInTheDocument();
  });

  test("Debe figurar un DNI", () => {
    const label = screen.getByTestId("dni");
    expect(label).toBeInTheDocument();
    expect(screen.getByText(usepacient.dni)).toBeInTheDocument();
  });

  test("Debe haber un boton cerrar ", () => {
    const detailBtn = screen.getByRole("button", { name: /close/i });
    expect(detailBtn).toBeInTheDocument();
  });
});
