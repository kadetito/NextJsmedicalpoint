import React from "react";
import { AdminLayout } from "../../layouts/AdminLayout";
import { ListadoUsuarios } from "../../components/admin/ListadoUsuarios";

const UsersPage = () => {
  return (
    <AdminLayout
      title={"Usuarios"}
      subTitle={"Mantenimiento de usuarios"}
      queryType={"admin"}
    >
      <ListadoUsuarios />
    </AdminLayout>
  );
};

export default UsersPage;
