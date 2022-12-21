import type { NextPage, GetServerSideProps } from "next";
import { Typography, Box } from "@mui/material";

import { PacientsList } from "../../../components/pacients";

import { dbPacients } from "../../../database";
import { IPacients } from "../../../interfaces";
import { ContentLayout } from "../../../layouts/ContentLayout";
import NextLink from "next/link";

interface Props {
  isLoading: boolean;
  pacients: IPacients[];
  foundPacients: boolean;
  query: string;
}

const SearchPage: NextPage<Props> = ({
  pacients,
  foundPacients,
  isLoading,
  query,
}) => {
  return (
    <ContentLayout
      title={"Teslo-Shop - Search"}
      pageDescription={"Encuentra los mejores productos de Teslo aquí"}
      queryType="pacients"
    >
      <div className="mp__whitetext">
        <h4>Búsqueda de Pacientes</h4>

        {foundPacients ? (
          <p>Término: {query}</p>
        ) : (
          <>
            <div>
              No encontramos ningún paciente con el término{" "}
              <em>
                <b>{query}</b>
              </em>
            </div>
            <div>
              <NextLink
                href={`/pacients`}
                passHref
                className="mp__whitelinks_under"
              >
                Volver al listado de pacientes
              </NextLink>
            </div>
          </>
        )}
      </div>
      <PacientsList pacients={pacients} isLoading={isLoading} />
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
        destination: "/pacients",
        permanent: true,
      },
    };
  }

  let pacientss = await dbPacients.getPacientsByTerm(query);

  const foundPacients = pacientss.length > 0;
  const pacients = JSON.parse(JSON.stringify(pacientss));

  if (!foundPacients) {
    pacientss = await dbPacients.getPacientsByTerm("shirt");
  }

  return {
    props: {
      pacients,
      foundPacients,
      query,
    },
  };
};

export default SearchPage;
