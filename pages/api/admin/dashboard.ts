import { db } from "../../../database";
import type { NextApiRequest, NextApiResponse } from "next";

import User from "../../../models/User";
import Case from "../../../models/Cases";
import Pacient from "../../../models/Pacients";

type Data = {
  numberOfMedics: number;
  numberOfCases: number;
  numberOfCasesAssigned: number;
  numberOfCasesUnAssigned: number;
  numberOfPacients: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await db.connect();

  const [
    numberOfMedics,
    numberOfCases,
    numberOfCasesAssigned,
    numberOfCasesUnAssigned,
    numberOfPacients,
  ] = await Promise.all([
    User.count(),
    Case.count(),
    Case.find({ isAssigned: "true" }).count(),
    Case.find({
      isAssigned: "false",
    }).count(),
    Pacient.count(),
  ]);

  await db.disconnect();
  res.status(200).json({
    numberOfMedics,
    numberOfCases,
    numberOfCasesAssigned,
    numberOfCasesUnAssigned,
    numberOfPacients,
  });
}
