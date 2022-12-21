import type { NextPage, GetServerSideProps } from "next";
import { Typography, Box } from "@mui/material";

import { MedicsList } from "../../../components/medics";

import { dbMedics } from "../../../database";
import { IUser } from "../../../interfaces";
import { ContentLayout } from "../../../layouts/ContentLayout";
import NextLink from "next/link";

interface Props {
  isLoading: boolean;
  medics: IUser[];
  foundMedics: boolean;
  query: string;
}

const SearchPage: NextPage<Props> = ({
  medics,
  foundMedics,
  isLoading,
  query,
}) => {
  return (
    <ContentLayout
      title={"Teslo-Shop - Search"}
      pageDescription={"Encuentra los mejores productos de Teslo aquí"}
      queryType="medics"
    >
      <div className="mp__whitetext">
        <h4>Búsqueda de Médicos</h4>

        {foundMedics ? (
          <p>Término: {query}</p>
        ) : (
          <>
            <div>
              No encontramos ningún médico con el término{" "}
              <em>
                <b>{query}</b>
              </em>
            </div>
            <div>
              <NextLink
                href={`/medics`}
                passHref
                className="mp__whitelinks_under"
              >
                Volver al listado de médicos
              </NextLink>
            </div>
          </>
        )}
      </div>
      <MedicsList medics={medics} isLoading={isLoading} />
    </ContentLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = "" } = params as { query: string };

  if (query.length === 0) {
    return {
      redirect: {
        destination: "/medics",
        permanent: true,
      },
    };
  }

  let medics = await dbMedics.getMedicsByTerm(query);
  const foundMedics = medics.length > 0;

  if (!foundMedics) {
    medics = await dbMedics.getMedicsByTerm("shirt");
  }

  return {
    props: {
      medics,
      foundMedics,
      query,
    },
  };
};

export default SearchPage;
