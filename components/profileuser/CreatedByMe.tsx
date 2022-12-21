import NextLink from "next/link";
import { AddOutlined, CategoryOutlined } from "@mui/icons-material";
import { Box, Button, CardMedia, Grid, Link } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import useSWR from "swr";

import { ICases } from "../../interfaces";
import { useContext, FC } from "react";
import { AuthContext } from "../../context/auth/AuthContext";
import { ICreatedBy } from "../../interfaces/cases";

const columns: GridColDef[] = [
  //   {
  //     field: "img",
  //     headerName: "Foto",
  //     renderCell: ({ row }: GridValueGetterParams) => {
  //       return (
  //         <a href={`/product/${row.slug}`} target="_blank" rel="noreferrer">
  //           <CardMedia
  //             component="img"
  //             alt={row.title}
  //             className="fadeIn"
  //             image={row.img}
  //           />
  //         </a>
  //       );
  //     },
  //   },

  {
    field: "title",
    headerName: "Title",
    width: 250,
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <NextLink
          href={`/cases/managecases/${row.slug}`}
          passHref
          legacyBehavior
        >
          <Link underline="always">{row.title}</Link>
        </NextLink>
      );
    },
  },
  { field: "dateReview", headerName: "Date Review" },
  { field: "hourReview", headerName: "Hour Review" },
  { field: "isAssigned", headerName: "is assigned" },
];

interface Props {
  createdBy: string;
}
const CreatedByMe: FC<Props> = ({ createdBy }) => {
  const { data, error } = useSWR<ICases[]>("/api/cases");

  if (!data && !error) return <></>;

  const rows = data!
    .filter((ft: any) => ft.created_by.number_col === createdBy)
    .map((caso) => ({
      id: caso._id,
      title: caso.title,
      dateReview: caso.dateReview,
      hourReview: caso.hourReview,
      isAssigned: caso.isAssigned,
    }));
  console.log(rows);
  return (
    <Grid container className="fadeIn">
      <Grid item xs={12} sx={{ height: "650px", width: "100%" }}>
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

export default CreatedByMe;
