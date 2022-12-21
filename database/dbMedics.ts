import { db } from ".";
import { User } from "../models";
import { IUser } from "../interfaces";

export const getMedicsBySlug = async (slug: string): Promise<IUser | null> => {
  await db.connect();
  const medico = await User.findOne({ slug }).lean();
  await db.disconnect();

  if (!medico) {
    return null;
  }

  medico.images = medico.images.map((image) => {
    return image.includes("http")
      ? image
      : `${process.env.HOST_NAME}medics/${image}`;
  });

  return JSON.parse(JSON.stringify(medico));
};

interface MedicsSlug {
  slug: string;
}

export const getAllMedicsSlugs = async (): Promise<MedicsSlug[]> => {
  await db.connect();
  const slugs = await User.find().select("slug  -_id").lean();
  await db.disconnect();

  return slugs;
};

export const getMedicsByTerm = async (term: string): Promise<IUser[]> => {
  term = term.toString().toLowerCase();

  await db.connect();
  const medicos = await User.find({
    $text: { $search: term },
  })
    .select("-createdAt -updatedAt -_id")
    .lean();

  await db.disconnect();

  const updatedMedics = medicos.map((medico) => {
    medico.images = medico.images.map((image) => {
      return image.includes("http")
        ? image
        : `${process.env.HOST_NAME}medics/${image}`;
    });

    return medico;
  });

  return updatedMedics;
};

export const getAllMedics = async (): Promise<IUser[]> => {
  await db.connect();
  const medicos = await User.find().lean();
  await db.disconnect();

  const updatedMedics = medicos.map((medico) => {
    medico.images = medico.images.map((image) => {
      return image.includes("http")
        ? image
        : `${process.env.HOST_NAME}medics/${image}`;
    });
    return medico;
  });

  return JSON.parse(JSON.stringify(updatedMedics));
};
