import { db } from ".";
import { Pacient } from "../models";
import { IPacients } from "../interfaces";

export const getPacientsBySlug = async (
  slug: string
): Promise<IPacients | null> => {
  await db.connect();
  const paciente = await Pacient.findOne({ slug }).lean();
  await db.disconnect();

  if (!paciente) {
    return null;
  }

  paciente.images = paciente.images.map((image) => {
    return image.includes("http")
      ? image
      : `${process.env.HOST_NAME}pacients/${image}`;
  });

  return JSON.parse(JSON.stringify(paciente));
};

interface PacientsSlug {
  slug: string;
}

export const getAllPacientsSlugs = async (): Promise<PacientsSlug[]> => {
  await db.connect();
  const slugs = await Pacient.find().select("slug  -_id").lean();
  await db.disconnect();

  return slugs;
};

export const getPacientsByTerm = async (term: string): Promise<IPacients[]> => {
  term = term.toString().toLowerCase();

  await db.connect();
  const pacientes = await Pacient.find({
    $text: { $search: term },
  })
    .select("-createdAt -updatedAt -_id")
    .lean();

  await db.disconnect();

  const updatedPacients = pacientes.map((paciente) => {
    paciente.images = paciente.images.map((image) => {
      return image.includes("http")
        ? image
        : `${process.env.HOST_NAME}pacients/${image}`;
    });

    return paciente;
  });

  return updatedPacients;
};

export const getAllPacients = async (): Promise<IPacients[]> => {
  await db.connect();
  const pacientes = await Pacient.find().lean();
  await db.disconnect();

  const updatedPacients = pacientes.map((paciente) => {
    paciente.images = paciente.images.map((image) => {
      return image.includes("http")
        ? image
        : `${process.env.HOST_NAME}pacients/${image}`;
    });
    return paciente;
  });

  return JSON.parse(JSON.stringify(updatedPacients));
};
