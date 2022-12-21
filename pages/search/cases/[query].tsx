import type { NextPage, GetServerSideProps } from "next";
import { Typography, Box } from "@mui/material";

import { CasesList } from "../../../components/cases";

import { dbCases } from "../../../database";
import { ICases } from "../../../interfaces";
import { ContentLayout } from "../../../layouts/ContentLayout";
import NextLink from "next/link";

interface Props {
  isLoading: boolean;
  cases: ICases[];
  foundCases: boolean;
  query: string;
}

const SearchPage: NextPage<Props> = ({
  cases,
  foundCases,
  isLoading,
  query,
}) => {
  return (
    <ContentLayout
      title={"Teslo-Shop - Search"}
      pageDescription={"Encuentra los mejores productos de Teslo aquí"}
      queryType="cases"
    >
      <div className="mp__whitetext">
        <h4>Búsqueda de Médicos</h4>

        {foundCases ? (
          <p>Término: {query}</p>
        ) : (
          <>
            <div>
              No encontramos ningún caso con el término{" "}
              <em>
                <b>{query}</b>
              </em>
            </div>
            <div>
              <NextLink href={`/`} passHref className="mp__whitelinks_under">
                Volver al listado de casos
              </NextLink>
            </div>
          </>
        )}
      </div>
      <CasesList cases={cases} isLoading={isLoading} />
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
        destination: "/cases",
        permanent: true,
      },
    };
  }

  let cases = await dbCases.getCasessByTerm(query);
  const foundCases = cases.length > 0;

  if (!foundCases) {
    cases = await dbCases.getCasessByTerm("shirt");
  }

  return {
    props: {
      cases,
      foundCases,
      query,
    },
  };
};

export default SearchPage;
