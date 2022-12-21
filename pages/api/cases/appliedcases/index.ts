import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../database";
import { Case } from "../../../../models";

import { isValidObjectId } from "mongoose";
import { ICases } from "../../../../interfaces/cases";
import { useContext } from "react";
import { AuthContext } from "../../../../context/auth/AuthContext";

type Data = { message: string } | ICases[] | ICases;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getCasesIHaveApplied(req, res);

    default:
      return res.status(400).json({
        message: "Bad request",
      });
  }
}

const getCasesIHaveApplied = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  await db.connect();

  console.log("HOLA", req);
  const cases = await Case.find().lean();
  //   {
  //     $text: { $search: req.body.aplicacion },
  //   }
  //   //   {
  //   //   applicants: {
  //   //     number_col: req.body.aplicacion,
  //   //   },
  //   // }
  // ).lean();
  await db.disconnect();
  return res.status(200).json(cases);
};
