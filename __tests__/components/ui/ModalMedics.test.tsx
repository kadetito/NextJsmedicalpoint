import { IUser } from "../../../interfaces/user";

import { render, screen } from "@testing-library/react";
import React from "react";
import { ModalMedics } from "../../../components/ui";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      replace: "../../search/medics/",
    };
  },
}));

const usemedic: IUser = {
  _id: "123465",
  name: "Doctor Dummie",
  number_col: "3534sdfgd",
  images: ["felisalafuente1.jpg", "felisalafuente2.jpg"],
  slug: "doctor_dummie",
  birthDate: "1974-12-12",
  expertise: "ginecologia",
  tags: ["ginecologia", "obstetricia"],
  createdAt: "2022-12-13T23:41:14.933+00:00",
  updatedAt: "2022-12-13T23:41:14.933+00:00",
  email: "hola@hola.com",
  role: "admin",
};

beforeEach(() =>
  render(<ModalMedics usemedic={usemedic} show={true} close={false} />)
);

describe("ModalMedics", () => {
  test("<ModalMedics /> debe hacer match con el snapshot", () => {
    expect(screen).toMatchSnapshot();
  });

  test("Debe haber un nombre en la cabecera de la ventana modal", () => {
    const label = screen.getByTestId("usetitle");
    expect(label).toBeInTheDocument();
    expect(screen.getByText(usemedic.name)).toBeInTheDocument();
  });

  test("Debe figurar un Numero de colegiado", () => {
    const label = screen.getByTestId("numbercol");
    expect(label).toBeInTheDocument();
    expect(screen.getByText(usemedic.number_col)).toBeInTheDocument();
  });

  test("Debe figurar un expertise", () => {
    const label = screen.getByTestId("expertise");
    expect(label).toBeInTheDocument();
    expect(screen.getByText(usemedic.expertise)).toBeInTheDocument();
  });

  test("Debe haber un boton cerrar ", () => {
    const detailBtn = screen.getByRole("button", { name: /close/i });
    expect(detailBtn).toBeInTheDocument();
  });
});
