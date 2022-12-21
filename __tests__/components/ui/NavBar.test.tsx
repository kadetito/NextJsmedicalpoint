import { NavBar } from "@/components/ui";
import singletonRouter, { useRouter } from "next/router";
import mockRouter from "next-router-mock";
import {
  render,
  screen,
  act,
  fireEvent,
  waitFor,
  renderHook,
} from "@testing-library/react";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      replace: "../../search/medics/",
    };
  },
}));

beforeEach(() => render(<NavBar />));

describe("NavBar", () => {
  it("<NavBar /> debe hacer match con el snapshot", () => {
    expect(screen).toMatchSnapshot();
  });

  it("Debe mostrar un link en el brand", () => {
    expect(
      screen.getByRole("link", { name: "brand" }).closest("a")
    ).toHaveAttribute("href", "/");
  });

  it("Debe mostrar boton 'casos abiertos'", () => {
    expect(
      screen.getByRole("button", { name: /casos abiertos/i })
    ).toBeInTheDocument();
  });

  it("Debe mostrar boton 'pacientes'", () => {
    expect(
      screen.getByRole("button", { name: /pacientes/i })
    ).toBeInTheDocument();
  });

  it("Debe mostrar boton 'medicos'", () => {
    expect(
      screen.getByRole("button", { name: /casos abiertos/i })
    ).toBeInTheDocument();
  });

  it("Debe mostrar un link dropdown ", () => {
    expect(
      screen.getByRole("button", { name: /nombre y apellidos/i })
    ).toBeInTheDocument();
  });

  it("debe haber un input de busqeuda", () => {
    expect(screen.getByLabelText("searchinput")).toBeInTheDocument();
  });

  it("debe haber un search Button", () => {
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  it("el termino de busqueda tiene una longitud de 0", async () => {
    const inputElement = screen.getByTestId("searchinput");
    const buttonElement = screen.getByRole("button", { name: /search/i });
    fireEvent.change(inputElement, {
      target: { value: "" },
    });
    fireEvent.click(buttonElement);
    await waitFor(() => {
      expect(inputElement).toHaveValue("");
    });
  });

  // it('must show a empty state message "You search has no results"', async () => {
  //   fireEvent.change(screen.getByTestId("searchinput"), {
  //     target: { name: "name", value: "electronic" },
  //   });

  //   fireEvent.click(screen.getByRole("button", { name: /search/i }));

  //   await waitFor(() =>
  //     fireEvent.click(screen.getByRole("button", { name: /search/i }))
  //   );

  //   await waitFor(() =>
  //     expect(
  //       screen.getByText(/no encontramos ningun caso con el termino/i)
  //     ).toBeInTheDocument()
  //   );
  // });
});
