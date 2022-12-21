import bcrypt from "bcryptjs";

import { User } from "../models";
import { db } from "./";

export const checkUserEmailPassword = async (
  email: string,
  password: string
) => {
  await db.connect();
  const user = await User.findOne({ email });
  await db.disconnect();

  if (!user) {
    return null;
  }

  if (!bcrypt.compareSync(password, user.password!)) {
    return null;
  }

  const { role, slug, name, number_col, _id } = user;

  return {
    _id,
    email: email.toLocaleLowerCase(),
    slug,
    number_col,
    role,
    name,
  };
};

// Esta función crea o verifica el usuario de OAuth
export const oAUthToDbUser = async (oAuthEmail: string, oAuthName: string) => {
  await db.connect();
  const user = await User.findOne({ email: oAuthEmail });

  if (user) {
    await db.disconnect();
    const { _id, name, slug, email, role, number_col } = user;
    return { _id, name, slug, email, role, number_col };
  }

  const newUser = new User({
    email: oAuthEmail,
    name: oAuthName,
    slug: "client",
    password: "@",
    role: "client",
    number_col: "DDF123",
  });
  await newUser.save();
  await db.disconnect();

  const { _id, name, email, slug, role, number_col } = newUser;
  return { _id, name, email, slug, role, number_col };
};
