import React, { SyntheticEvent, useContext, useEffect, useState } from "react";

import { AdminLayout } from "../../layouts/AdminLayout";
import { Row, Col, Card } from "react-bootstrap";
import { AuthContext } from "../../context/auth/AuthContext";
import { useRouter } from "next/router";
import { FullScreenLoading } from "@/components/ui/FullScreenLoading";

import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { DesktopAdmin } from "../../components/admin/DeskTopAdmin";
import { ListadoUsuarios } from "../../components/admin/ListadoUsuarios";
import UsersPage from "./users";

const DashboardAdmin = () => {
  const router = useRouter();
  const { user, isLoggedIn, logout } = useContext(AuthContext);

  const [value, setValue] = useState("1");
  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (isLoggedIn) {
      if (user?.role !== "admin") {
        router.push("/auth/login");
      }
    }
  }, [isLoggedIn, user]);

  return isLoggedIn && user?.role === "admin" ? (
    <AdminLayout
      title="administrador"
      subTitle="administrador"
      queryType="administrator"
    >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "#f5f7f6" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Desktop" value="1" />
            <Tab label="Lista de médicos" value="2" />
            <Tab label="Lista de Pacientes" value="3" />
            <Tab label="Lista de Casos" value="34" />
          </TabList>
        </Box>
        <TabPanel value="1" className="m-0 p-0 mt-4">
          <DesktopAdmin />
        </TabPanel>
        <TabPanel value="2" className="m-0 p-0 mt-4">
          {/* <UsersPage /> para página unica de usuarios*/}
          <ListadoUsuarios />
        </TabPanel>
        <TabPanel value="3" className="m-0 p-0 mt-4">
          Item Three
        </TabPanel>
        <TabPanel value="4" className="m-0 p-0 mt-4">
          cuatro Three
        </TabPanel>
      </TabContext>
    </AdminLayout>
  ) : (
    <FullScreenLoading />
  );
};

export default DashboardAdmin;
