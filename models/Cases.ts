import mongoose, { Schema, model, Model } from "mongoose";
import { ICases } from "../interfaces";

const caseSchema = new Schema(
  {
    title: { type: String, required: true, default: "" },
    description: { type: String, required: true, default: "" },
    images: [{ type: String }],
    slug: { type: String, required: true, unique: true },
    dateReview: { type: String, required: true, default: "" },
    hourReview: { type: String, required: true, default: "" },
    isAssigned: { type: String, default: "false" },
    tags: [{ type: String }],
    applicants: [
      {
        _id: { type: String },
        name: { type: String },
        number_col: { type: String },
      },
    ],
    created_by: {
      name: { type: String },
      number_col: { type: String },
    },
    assignedTo: {
      name: { type: String },
      number_col: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

caseSchema.index({ title: "text", tags: "text" });

const Case: Model<ICases> = mongoose.models.Case || model("Case", caseSchema);

export default Case;
