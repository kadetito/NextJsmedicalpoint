import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Case } from "../../../models";

import { isValidObjectId } from "mongoose";
import { ICases } from "../../../interfaces/cases";

type Data = { message: string } | ICases[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getCases(req, res);
    // case "POST":
    //   return createApplicantCase(req, res);
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
  const { caseId = "", userId = "", name = "", number_col = "" } = req.body;

  if (!isValidObjectId(caseId)) {
    return res.status(400).json({ message: "No existe caso con ese id" });
  }

  await db.connect();
  const caso = await Case.findById(caseId);

  if (!caso) {
    return res.status(404).json({ message: "No existe caso" });
  }

  if (userId && name === "" && number_col === "") {
    await Case.findOneAndUpdate(
      { _id: caseId },
      {
        $pull: {
          applicants: {
            _id: userId,
          },
        },
      }
    );

    await db.disconnect();
    return res.status(200).json({ message: "Caso modificado" });
  }

  if (userId === "" && name === "" && number_col === "") {
    await Case.findOneAndUpdate(
      { _id: caseId },
      {
        $pull: {
          applicants: {
            _id: userId,
          },
        },
      }
    );

    await db.disconnect();
    return res.status(200).json({ message: "Caso modificado" });
  }

  await Case.findOneAndUpdate(
    { _id: caseId },
    {
      $push: {
        applicants: {
          _id: userId,
          name,
          number_col,
        },
      },
    }
  );

  await db.disconnect();
  return res.status(200).json({ message: "Caso modificado" });
};
