import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";

import { IconButton, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export const SearchHeader = (queryType: any) => {
  const { replace } = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [rutaPath, setRutaPath] = useState("");

  const typeQUery = queryType.queryType.queryType;

  useEffect(() => {
    setRutaPath(`../../search/${typeQUery}/`);
  }, [queryType]);

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;

    return replace(`${rutaPath}${searchTerm}`);
  };

  return (
    <>
      <TextField
        sx={{ input: { color: "white" }, border: { color: "white" } }}
        hiddenLabel
        id="filled-hidden-label-small"
        variant="filled"
        size="small"
        className="ms-3"
        color="warning"
        focused
        inputProps={{ "data-testid": "searchinput" }}
        aria-label="searchinput"
        placeholder="Search..."
        autoFocus
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={(e) => (e.key === "Enter" ? onSearchTerm() : null)}
        type="text"
      />

      <IconButton
        onClick={(e) => onSearchTerm()}
        aria-label="search"
        sx={{ color: "white" }}
        size="large"
      >
        <Search />
      </IconButton>
    </>
  );
};
