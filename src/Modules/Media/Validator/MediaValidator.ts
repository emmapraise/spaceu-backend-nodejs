import { body } from "express-validator";
import Validator from "../../../Libs/Middleware/Validator";

const mediaRule = [
  body("title").notEmpty().withMessage("Title must not be empty"),
  body("description").notEmpty().withMessage("Description must not be empty"),
];

export const mediaRequest = Validator(mediaRule);