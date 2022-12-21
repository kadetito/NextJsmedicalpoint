import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { SearchHeader } from "./SearchHeader";
import NextLink from "next/link";
import { useContext } from "react";
import { AuthContext } from "../../context/auth/AuthContext";
import { useRouter } from "next/router";

export const NavBar = (queryType: any) => {
  const router = useRouter();
  const { user, isLoggedIn, logout } = useContext(AuthContext);

  const navigateTo = (url: string) => {
    router.push(url);
  };

  return (
    <Navbar key="sm" bg="dark" variant="dark" expand="sm" className="mb-3">
      <Container fluid>
        <Navbar.Brand>
          <NextLink
            aria-label="brand"
            href="/"
            className="mp__whitelinks"
            passHref
          >
            Medical Point
          </NextLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-$"sm"`}
          aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
              Medical Point
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {isLoggedIn ? (
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav className="ms-2 mt-1">
                  <NextLink href="/cases" passHref>
                    <Button
                      variant={
                        queryType.queryType === "cases"
                          ? "secondary"
                          : "outline-secondary"
                      }
                    >
                      Casos Abiertos
                    </Button>
                  </NextLink>
                </Nav>

                {user?.role === "admin" && (
                  <Nav className="ms-2 mt-1">
                    <NextLink href="/pacients" passHref>
                      <Button
                        variant={
                          queryType.queryType === "pacients"
                            ? "secondary"
                            : "outline-secondary"
                        }
                      >
                        Pacientes
                      </Button>
                    </NextLink>
                  </Nav>
                )}
                {user?.role === "admin" && (
                  <Nav className="ms-2 mt-1">
                    <NextLink href="/medics" passHref>
                      <Button
                        variant={
                          queryType.queryType === "medics"
                            ? "secondary"
                            : "outline-secondary"
                        }
                      >
                        Médicos
                      </Button>
                    </NextLink>
                  </Nav>
                )}
                {user?.role === "admin" && (
                  <Nav className="ms-2 mt-1">
                    <Button
                      onClick={() => navigateTo("/admin/")}
                      variant={
                        queryType.queryType === "administrator"
                          ? "danger"
                          : "outline-danger"
                      }
                    >
                      Admin panel
                    </Button>
                  </Nav>
                )}

                <SearchHeader queryType={queryType} />

                <NavDropdown
                  aria-label="perfil"
                  title={user?.name}
                  id={`offcanvasNavbarDropdown-expand-sm`}
                >
                  <NavDropdown.Item>
                    <Button
                      onClick={() => navigateTo(`/profileuser/${user?.slug}`)}
                      variant={"outline-secondary"}
                    >
                      Perfil
                    </Button>
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Button
                  onClick={() => navigateTo(`/auth/login?p=${router.asPath}`)}
                  variant="outline-secondary"
                >
                  Login
                </Button>
              </Nav>
            )}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};
