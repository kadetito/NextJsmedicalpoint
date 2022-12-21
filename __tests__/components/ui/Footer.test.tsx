import { render, screen } from "@testing-library/react";
import { Footer } from "../../../components/ui";

beforeEach(() => render(<Footer />));

describe("Footer", () => {
  it("<Footer />", () => {
    expect(screen).toMatchSnapshot();
  });

  it("<Footer /> debe contener el texto de copyright rafapenya.com", () => {
    expect(screen.getByText(/rafapenya.com/i)).toBeInTheDocument();
  });
});
