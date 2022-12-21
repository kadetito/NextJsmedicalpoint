import type { NextApiRequest, NextApiResponse } from "next";
import { db, seedDatabase } from "../../database";
import { Case, Pacient, User } from "../../models";

type Data = { message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === "production") {
    return res.status(401).json({ message: "No tiene acceso a este API" });
  }

  await db.connect();

  await User.deleteMany();
  await User.insertMany(seedDatabase.initialData.users);

  await Case.deleteMany();
  await Case.insertMany(seedDatabase.initialData.cases);

  await Pacient.deleteMany();
  await Pacient.insertMany(seedDatabase.initialData.pacients);

  await db.disconnect();

  res.status(200).json({ message: "Proceso realizado correctamente" });
}
