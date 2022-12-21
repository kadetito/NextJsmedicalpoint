import { PacientsCard } from "../../../components/pacients/PacientsCard";
import { IPacients } from "../../../interfaces/pacients";
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

beforeEach(() => render(<PacientsCard usepacient={usepacient} />));

describe("PacientsCard", () => {
  test("<PacientsCard /> debe hacer match con el snapshot", () => {
    expect(screen).toMatchSnapshot();
  });

  test("Debe haber un nombre del paciente en un <h5>", () => {
    expect(
      screen.getByRole("heading", { name: usepacient.name })
    ).toBeInTheDocument();
  });

  test("Debe figurar el DNI del paciente", () => {
    const label = screen.getByTestId("dni");
    expect(label).toBeInTheDocument();
    expect(screen.getByText(usepacient.dni)).toBeInTheDocument();
  });

  test("Debe haber un boton detalle ", () => {
    const detailBtn = screen.getByRole("button", { name: /view resume/i });
    expect(detailBtn).toBeInTheDocument();
  });

  test("El botón detalle debe abrir la ventana modal (cambia el estado del boton a disabled)", async () => {
    const detailBtn = screen.getByRole("button", { name: /view resume/i });
    fireEvent.click(detailBtn);
    expect(detailBtn).toBeDisabled();
  });
});
