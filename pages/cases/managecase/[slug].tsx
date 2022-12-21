import React, { useEffect, useState } from "react";
import { ICases, ICreatedBy } from "interfaces";
import { useRouter } from "next/navigation";
import { GetServerSideProps } from "next";
import { Row, Col, Card, Button } from "react-bootstrap";
import { ContentLayout } from "../../../layouts/ContentLayout";
import TextField from "@mui/material/TextField";
import { SaveOutlined } from "@mui/icons-material";
import { dbCases } from "database";
import { FC } from "react";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import { Chip } from "@mui/material";
import dbgeneralApi from "../../../apidatabase/dbgeneralApi";
import { Case } from "models";
import { useContext } from "react";
import { AuthContext } from "../../../context/auth/AuthContext";

interface FormData {
  _id?: string;
  title: string;
  description: string;
  slug: string;
  dateReview: string;
  hourReview: string;
  tags: string[];
  isAssigned: string;
  created_by: ICreatedBy;
}

interface Props {
  usecasos: ICases;
}

const ManageCase: FC<Props> = ({ usecasos }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm<FormData>({ defaultValues: usecasos });

  const router = useRouter();
  const { user } = useContext(AuthContext);

  const [newTagValue, setNewTagValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  //automatic slug
  useEffect(() => {
    const regex = /[^a-zA-Z0-9_]/gi;
    const subscription = watch((value, { name, type }) => {
      if (name === "title") {
        const newSlug =
          value.title
            ?.trim()
            .replaceAll(" ", "_")
            .replaceAll(regex, "")
            .toLocaleLowerCase() || "";

        setValue("slug", newSlug);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  const onDeleteTag = (tag: string) => {
    const updatedTags = getValues("tags").filter((t) => t !== tag);
    setValue("tags", updatedTags, { shouldValidate: true });
  };

  const onNewTag = () => {
    const newTag = newTagValue.trim().toLocaleLowerCase();
    setNewTagValue("");
    const currentTags = getValues("tags");
    if (currentTags.includes(newTag)) {
      return;
    }
    currentTags.push(newTag);
  };

  const onSubmit = async (form: FormData) => {
    setIsSaving(true);

    if (!form.created_by) {
      form.created_by = {
        _id: user!._id,
        name: user!.name,
        number_col: user!.number_col,
      };
    }

    try {
      const { data } = await dbgeneralApi({
        url: "/cases/managecase",
        method: form._id ? "PUT" : "POST",
        data: form,
      });
      if (!form._id) {
        setIsSaving(false);
        router.replace(`/cases/managecase/${form.slug}`);
      } else {
        setIsSaving(false);
      }
    } catch (error) {
      console.log(error);
      setIsSaving(false);
    }
  };

  return (
    <ContentLayout
      title="New Case"
      pageDescription="New case page "
      queryType="cases"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <Card.Body>
            <Card.Title>
              {/* {!form._id ? <>Nuevo caso</> : <>Editando</>} {usecasos.title} */}
            </Card.Title>
            <Card.Text>
              Para crear un nuevo caso, debe rellenar el siguiente formulario
              con los datos solicitados. A continuación debe guardarlo y
              aparecerá en el listado de casos para que los candidatos puedan
              aplicar.
            </Card.Text>

            <Row className="mb-4">
              <Col md="6">
                <TextField
                  id="standard-basic"
                  label="Title"
                  fullWidth
                  {...register("title", {
                    required: "Este campo es requerido",
                    minLength: { value: 2, message: "Mínimo 2 caracteres" },
                  })}
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              </Col>
              <Col md="6">
                <TextField
                  id="standard-basic"
                  label="Slug"
                  fullWidth
                  inputProps={{ readOnly: true }}
                  {...register("slug", {
                    required: "Este campo es requerido",
                    validate: (val) =>
                      val.trim().includes(" ")
                        ? "No se premiten espacios en blanco para el slug"
                        : undefined,
                  })}
                  error={!!errors.slug}
                  helperText={errors.slug?.message}
                />
              </Col>
            </Row>
            <Row className="mb-4">
              <Col md="3">
                {/* <DesktopDatePicker
                  label="Date Review"
                  inputFormat="MM/DD/YYYY"
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                /> */}

                <TextField
                  id="date"
                  label="Date Review"
                  type="date"
                  sx={{ width: 220 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("dateReview", {
                    required: "Este campo es requerido",
                  })}
                  error={!!errors.dateReview}
                  helperText={errors.dateReview?.message}
                />
              </Col>

              <Col md="3">
                {/* <TimePicker
                  label="Hour Review"
                  value={value}
                  ampm={false}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                  
                /> */}

                <TextField
                  id="time"
                  label="Hour Review"
                  type="time"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ width: 150 }}
                  {...register("hourReview", {
                    required: "Este campo es requerido",
                  })}
                  error={!!errors.hourReview}
                  helperText={errors.hourReview?.message}
                />
              </Col>
            </Row>
            <Row className="mb-4">
              <Col md="4">
                <TextField
                  label="Etiquetas"
                  fullWidth
                  sx={{ mb: 1 }}
                  helperText="Presiona [spacebar] para agregar"
                  value={newTagValue}
                  onChange={({ target }) => setNewTagValue(target.value)}
                  onKeyUp={({ code }) =>
                    code === "Space" ? onNewTag() : undefined
                  }
                />

                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    listStyle: "none",
                    p: 0,
                    m: 0,
                  }}
                  component="ul"
                >
                  {getValues("tags").map((tag) => {
                    return (
                      <Chip
                        key={tag}
                        label={tag}
                        onDelete={() => onDeleteTag(tag)}
                        color="primary"
                        size="small"
                        sx={{ ml: 1, mt: 1 }}
                      />
                    );
                  })}
                </Box>
              </Col>
              <Col md="8">
                <TextField
                  id="standard-basic"
                  label="Description"
                  fullWidth
                  rows={6}
                  multiline
                  {...register("description", {
                    required: "Este campo es requerido",
                  })}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              </Col>
            </Row>
            <Row className="mt-5">
              <Col></Col>
              <Col className="d-grid gap-2">
                <Button
                  disabled={isSaving}
                  size="lg"
                  color="secondary"
                  type="submit"
                >
                  <SaveOutlined /> Guardar
                </Button>
              </Col>
              <Col></Col>
            </Row>
          </Card.Body>
        </Card>
      </form>
    </ContentLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug = "" } = query;

  let usecasos: ICases | null;
  if (slug === "new") {
    const tempCaso = JSON.parse(JSON.stringify(new Case()));
    delete tempCaso._id;
    usecasos = tempCaso;
  } else {
    usecasos = await dbCases.getCasesBySlug(slug.toString());
  }

  if (!usecasos) {
    return {
      redirect: {
        destination: "/cases",
        permanent: false,
      },
    };
  }

  return {
    props: {
      usecasos,
    },
  };
};

export default ManageCase;
