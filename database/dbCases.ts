import { db } from ".";
import { Case } from "../models";
import { ICases } from "../interfaces";

export const getCasesBySlug = async (slug: string): Promise<ICases | null> => {
  await db.connect();

  const caso = await Case.findOne({ slug }).lean();
  await db.disconnect();

  if (!caso) {
    return null;
  }

  caso.images = caso.images.map((image) => {
    return image.includes("http")
      ? image
      : `${process.env.HOST_NAME}cases/${image}`;
  });

  return JSON.parse(JSON.stringify(caso));
};

interface CasesSlug {
  slug: string;
}

export const getAllCasesSlugs = async (): Promise<CasesSlug[]> => {
  await db.connect();
  const slugs = await Case.find().select("slug -_id").lean();
  await db.disconnect();

  return slugs;
};

export const getCasessByTerm = async (term: string): Promise<ICases[]> => {
  term = term.toString().toLowerCase();

  await db.connect();
  const casos = await Case.find({
    $text: { $search: term },
  })
    .select("-createdAt -updatedAt -_id")
    .lean();

  await db.disconnect();

  const updatedCasess = casos.map((caso) => {
    caso.images = caso.images.map((image) => {
      return image.includes("http")
        ? image
        : `${process.env.HOST_NAME}cases/${image}`;
    });

    return caso;
  });

  return updatedCasess;
};

export const getAllCasess = async (): Promise<ICases[]> => {
  await db.connect();
  const casos = await Case.find().sort({ dateReview: -1 }).lean();
  await db.disconnect();

  const updatedCasess = casos.map((caso) => {
    caso.images = caso.images.map((image) => {
      return image.includes("http")
        ? image
        : `${process.env.HOST_NAME}cases/${image}`;
    });
    return caso;
  });

  return JSON.parse(JSON.stringify(updatedCasess));
};
