import { Schema, model, HydratedDocument } from "mongoose"

export type SkinCondition =
  | "Factory New"
  | "Minimal Wear"
  | "Field-Tested"
  | "Well-Worn"
  | "Battle-Scarred"

export interface SkinDTO {
  name: string
  weapon: string
  condition: SkinCondition
  float: number
  purchasePrice: number
  profitMargin: number
  notes: string
}

export type SkinDocument = HydratedDocument<SkinDTO>

const SkinSchema = new Schema<SkinDTO>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    weapon: {
      type: String,
      required: true,
      trim: true,
    },

    condition: {
      type: String,
      required: true,
      enum: [
        "Factory New",
        "Minimal Wear",
        "Field-Tested",
        "Well-Worn",
        "Battle-Scarred",
      ],
    },

    float: {
      type: Number,
      required: true,
      min: 0,
      max: 1,
    },

    purchasePrice: {
      type: Number,
      required: true,
      min: 0,
    },

    profitMargin: {
      type: Number,
      required: true,
      default: 30,
      min: 0,
    },

    notes: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
)

const SkinModel = model<SkinDTO>("Skin", SkinSchema)

export default SkinModel