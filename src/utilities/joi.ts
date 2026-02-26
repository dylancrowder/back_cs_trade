import Joi from "joi"

export const createSkinJoi = Joi.object({
  name: Joi.string().trim().max(150).required(),

  weapon: Joi.string().trim().required(),

  condition: Joi.string()
    .valid(
      "Factory New",
      "Minimal Wear",
      "Field-Tested",
      "Well-Worn",
      "Battle-Scarred"
    )
    .required(),

  float: Joi.number()
    .min(0)
    .max(1)
    .required(),

  purchasePrice: Joi.number()
    .min(0)
    .required(),

  profitMargin: Joi.number()
    .min(0)
    .default(30),

  notes: Joi.string()
    .allow("")
    .trim()
    .optional(),
})