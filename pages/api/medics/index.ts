import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { User } from "../../../models";
import { IUser } from "../../../interfaces";

type Data = { message: string } | IUser[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getMedics(req, res);

    default:
      return res.status(400).json({
        message: "Bad request",
      });
  }
}

const getMedics = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const medics = await User.find().select("-_id").lean();

  await db.disconnect();

  const updatedMedics = medics.map((medic) => {
    medic.images = medic.images.map((image) => {
      return image.includes("http")
        ? image
        : `${process.env.HOST_NAME}medics/${image}`;
    });

    return medic;
  });

  return res.status(200).json(updatedMedics);
};
