import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../database";
import { Case } from "../../../../models";

import { isValidObjectId } from "mongoose";
import { ICases } from "../../../../interfaces/cases";

type Data = { message: string } | ICases[] | ICases;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getCases(req, res);
    case "POST":
      return createNewCase(req, res);
    case "PUT":
      return updateCases(req, res);
    default:
      return res.status(400).json({
        message: "Bad request",
      });
  }
}

const getCases = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const cases = await Case.find().sort({ updatedAt: -1 }).lean();
  await db.disconnect();
  const updatedCases = cases.map((caso) => {
    caso.images = caso.images.map((image) => {
      return image.includes("http")
        ? image
        : `${process.env.HOST_NAME}cases/${image}`;
    });
    return caso;
  });
  return res.status(200).json(updatedCases);
};

const updateCases = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { _id = "" } = req.body as ICases;

  if (!isValidObjectId(_id)) {
    return res.status(400).json({ message: "No existe caso con ese id" });
  }

  try {
    await db.connect();

    const caso = await Case.findById(_id);
    if (!caso) {
      await db.disconnect();
      return res.status(400).json({ message: "No existe caso con ese id" });
    }

    await caso.updateOne(req.body);

    await db.disconnect();

    return res.status(200).json(caso);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(400).json({ message: "Revisar consola servidor" });
  }
};

const createNewCase = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  try {
    await db.connect();

    const caseInDB = await Case.findOne({ slug: req.body.slug });
    if (caseInDB) {
      await db.disconnect();
      return res.status(400).json({ message: "El slug ya existe" });
    }
    const caso = new Case(req.body);
    await caso.save();
    await db.disconnect();
    return res.status(201).json(caso);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(400).json({ message: "Revisar consola servidor" });
  }
};
