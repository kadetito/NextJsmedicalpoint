import { IUser } from "interfaces";
import { isValidObjectId } from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import User from "../../../models/User";

type Data =
  | {
      message: string;
    }
  | IUser[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getUsers(req, res);
    case "PUT":
      return updateUsers(req, res);
    default:
      return res.status(400).json({ message: "Bad request" });
  }
}
const getUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const users = await User.find().select("-password").lean();
  await db.disconnect();
  return res.status(400).json(users);
};

const updateUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { userId = "", role = "" } = req.body;

  if (!isValidObjectId(userId)) {
    return res.status(400).json({ message: "No existe usuario con ese id" });
  }

  const validRoles = ["admin", "client"];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: "Rol no permitido" });
  }

  await db.connect();
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "No existe usuario" });
  }
  user.role = role;
  await user.save();

  await db.disconnect();
  return res.status(200).json({ message: "Usuario modificado" });
};
