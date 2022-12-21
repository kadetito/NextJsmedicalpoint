import useSWR from "swr";

import { Row, Col } from "react-bootstrap";

import { DashBoardSummary } from "interfaces";
import { AdminSummaryCards } from "../../components/ui";
import { AccessTime, ArrowCircleRight } from "@mui/icons-material";
import { useEffect, useState } from "react";

export const DesktopAdmin = () => {
  const { data, error } = useSWR<DashBoardSummary>("/api/admin/dashboard", {
    refreshInterval: 30 * 1000,
  });

  const [refreshIn, setRefreshIn] = useState(30);
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshIn((refreshIn) => (refreshIn > 0 ? refreshIn - 1 : 30));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  if (!error && !data) {
    return <></>;
  }

  if (error) {
    console.log(error);
    return <>Error al cargar la información</>;
  }

  const {
    numberOfMedics,
    numberOfCases,
    numberOfCasesAssigned,
    numberOfCasesUnAssigned,
    numberOfPacients,
  } = data!;

  return (
    <>
      <Row className="mb-4">
        <Col md="4" sm="12">
          <AdminSummaryCards
            title={numberOfMedics}
            subTitle="Number of Medics"
            desc="Incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
            icon={<ArrowCircleRight sx={{ fontSize: 50 }} />}
          />
        </Col>
        <Col md="4" sm="12">
          <AdminSummaryCards
            title={numberOfCases}
            subTitle="Number of Cases"
            desc="Labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
            icon={<ArrowCircleRight sx={{ fontSize: 50 }} />}
          />
        </Col>
        <Col md="4" sm="12">
          <AdminSummaryCards
            title={numberOfCasesAssigned}
            subTitle="Number of Cases Assigned"
            desc="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
            icon={<ArrowCircleRight sx={{ fontSize: 50 }} />}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md="4" sm="12">
          <AdminSummaryCards
            title={numberOfCasesUnAssigned}
            subTitle="Number of Cases Unassigned"
            desc="Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
            icon={<ArrowCircleRight sx={{ fontSize: 50 }} />}
          />
        </Col>
        <Col md="4" sm="12">
          <AdminSummaryCards
            title={numberOfPacients}
            subTitle="Number of Pacients"
            desc="Magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
            icon={<ArrowCircleRight sx={{ fontSize: 50 }} />}
          />
        </Col>

        <Col md="4" sm="12">
          <AdminSummaryCards
            title={refreshIn}
            subTitle="Actualizando información en:"
            desc=""
            icon={<AccessTime sx={{ fontSize: 50 }} />}
          />
        </Col>
      </Row>
    </>
  );
};
