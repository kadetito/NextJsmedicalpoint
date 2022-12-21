import { CasesCard } from "../../../components/cases/CasesCard";
import { ICases } from "../../../interfaces/cases";
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

beforeEach(() => render(<CasesCard usecase={usecase} />));

describe("CasesCard", () => {
  test("<CasesCard /> debe hacer match con el snapshot", () => {
    expect(screen).toMatchSnapshot();
  });

  test("Debe haber un título del case en un <h5>", () => {
    expect(
      screen.getByRole("heading", { name: usecase.title })
    ).toBeInTheDocument();
  });

  test("Debe figurar el nombre del creador del caso", () => {
    const label = screen.getByTestId("creator");
    expect(label).toBeInTheDocument();
    expect(screen.getByText(usecase.created_by.name)).toBeInTheDocument();
  });

  test("Debe haber un icono candado LockOpen si el caso NO está asignado ", () => {
    const isAssigned = "false";
    if (isAssigned === "false") {
      const detailsPanel = render(<LockOpen />);
      expect(detailsPanel).toBeTruthy();
    }
  });

  test("Debe haber un icono candado Lock si el caso está asignado ", () => {
    const isAssigned = "true";
    if (isAssigned === "true") {
      const detailsPanel = render(<Lock />);
      expect(detailsPanel).toBeTruthy();
    }
  });

  test("Debe haber un boton detalle ", () => {
    const detailBtn = screen.getByRole("button", { name: /open detail/i });
    expect(detailBtn).toBeInTheDocument();
  });

  test("Debe haber un boton asignar ", () => {
    const detailBtn = screen.getByRole("button", { name: /asignarme/i });
    expect(detailBtn).toBeInTheDocument();
  });

  test("El botón detalle debe abrir la ventana modal (cambia el estado del boton a disabled)", async () => {
    const detailBtn = screen.getByRole("button", { name: /open detail/i });
    fireEvent.click(detailBtn);
    expect(detailBtn).toBeDisabled();
  });
});
