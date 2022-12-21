import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Pacient } from "../../../models";
import { IPacients } from "../../../interfaces";

type Data = { message: string } | IPacients[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getPacients(req, res);

    default:
      return res.status(400).json({
        message: "Bad request",
      });
  }
}

const getPacients = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const pacients = await Pacient.find().select("-_id").lean();

  await db.disconnect();

  const updatedPacients = pacients.map((pacient) => {
    pacient.images = pacient.images.map((image) => {
      return image.includes("http")
        ? image
        : `${process.env.HOST_NAME}pacients/${image}`;
    });

    return pacient;
  });

  return res.status(200).json(updatedPacients);
};
