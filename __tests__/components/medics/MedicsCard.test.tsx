import { MedicsCard } from "../../../components/medics/MedicsCard";
import { IUser } from "../../../interfaces/user";
import { LockOpen, Lock } from "@mui/icons-material";

import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";

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

beforeEach(() => render(<MedicsCard usemedic={usemedic} />));

describe("MedicsCard", () => {
  test("<MedicsCard /> debe hacer match con el snapshot", () => {
    expect(screen).toMatchSnapshot();
  });

  test("Debe haber un nombre de médico en un <h5>", () => {
    expect(
      screen.getByRole("heading", { name: usemedic.name })
    ).toBeInTheDocument();
  });

  test("Debe figurar la especialidad del médico", () => {
    const label = screen.getByTestId("expertis");
    expect(label).toBeInTheDocument();
    expect(screen.getByText(usemedic.expertise)).toBeInTheDocument();
  });

  test("Debe figurar el numero de colegiado del médico", () => {
    const label = screen.getByTestId("numcol");
    expect(label).toBeInTheDocument();
    expect(screen.getByText(usemedic.number_col)).toBeInTheDocument();
  });

  test("Debe haber un boton detalle ", () => {
    const detailBtn = screen.getByRole("button", { name: /view profile/i });
    expect(detailBtn).toBeInTheDocument();
  });

  test("El botón detalle debe abrir la ventana modal (cambia el estado del boton a disabled)", async () => {
    const detailBtn = screen.getByRole("button", { name: /view profile/i });
    fireEvent.click(detailBtn);
    expect(detailBtn).toBeDisabled();
  });
});
