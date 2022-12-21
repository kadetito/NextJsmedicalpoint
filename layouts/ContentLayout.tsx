import { FC } from "react";
import Head from "next/head";
import { Container } from "react-bootstrap";
import { NavBar } from "../components/ui/NavBar";
import Footer from "../components/ui/Footer";

interface Props {
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
  children: JSX.Element | JSX.Element[];
  queryType: string;
}

export const ContentLayout: FC<Props> = ({
  title,
  pageDescription,
  imageFullUrl,
  children,
  queryType,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>

        <meta name="description" content={pageDescription} />

        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />

        {imageFullUrl && <meta name="og:image" content={imageFullUrl} />}
      </Head>

      <nav>
        <NavBar queryType={queryType} />
      </nav>

      <main
        style={{
          margin: "80px auto",
          maxWidth: "1440px",
          padding: "0px 30px",
        }}
      >
        <Container>{children}</Container>
      </main>

      <footer>
        <Container fluid>
          <Footer />
        </Container>
      </footer>
    </>
  );
};
