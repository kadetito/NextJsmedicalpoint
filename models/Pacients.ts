import mongoose, { Schema, model, Model } from "mongoose";
import { IPacients } from "../interfaces";

const pacientSchema = new Schema(
  {
    name: { type: String, required: true, default: "" },
    dni: { type: String, required: true, default: "" },
    images: [{ type: String }],
    birthDate: { type: String, default: "" },
    tags: [{ type: String }],
    slug: { type: String, required: true, default: "" },
    hystorial: [
      {
        uid: { type: String },
        description: { type: String },
        dateCase: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

pacientSchema.index({ name: "text", tags: "text" });

const Pacient: Model<IPacients> =
  mongoose.models.Pacient || model("Pacient", pacientSchema);

export default Pacient;
