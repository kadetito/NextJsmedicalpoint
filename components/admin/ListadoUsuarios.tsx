import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { IUser } from "../../interfaces";
import useSWR from "swr";
import { Grid, MenuItem, Select } from "@mui/material";
import dbgeneralApi from "../../apidatabase/dbgeneralApi";
import { useEffect, useState } from "react";

export const ListadoUsuarios = () => {
  const { data, error } = useSWR<IUser[]>("/api/admin/users");
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  if (!error && !data) {
    return <></>;
  }

  const onRoleUpdated = async (userId: string, newRole: string) => {
    const previeusUsers = users.map((user) => ({ ...user }));

    const updatedUsers = users.map((user) => ({
      ...user,
      role: userId === user._id ? newRole : user.role,
    }));

    setUsers(updatedUsers);
    try {
      await dbgeneralApi.put("/admin/users", { userId, role: newRole });
    } catch (error) {
      setUsers(previeusUsers);
      console.log(error);
      alert(error);
    }
  };

  const columns: GridColDef[] = [
    { field: "email", headerName: "E-mail", width: 250 },
    { field: "name", headerName: "Nombre", width: 350 },
    { field: "number_col", headerName: "Nº colegiado", width: 150 },
    { field: "expertise", headerName: "Especialidad", width: 200 },
    {
      field: "role",
      headerName: "Rol",
      width: 150,
      renderCell: ({ row }: GridRenderCellParams) => {
        return (
          <Select
            value={row.role}
            label="Rol"
            onChange={({ target }) => onRoleUpdated(row.id, target.value)}
            sx={{ width: "150px" }}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="client">Client</MenuItem>
          </Select>
        );
      },
    },
  ];

  const rows = users.map((user) => ({
    id: user._id,
    email: user.email,
    name: user.name,
    number_col: user.number_col,
    expertise: user.expertise,
    role: user.role,
  }));

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{ backgroundColor: "#ffffff", height: 650, width: "100%" }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </Grid>
    </Grid>
  );
};
