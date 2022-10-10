import * as Joi from 'joi';

export class CreateClientDTO {
  email: string;

  password: string;
}

export const CreateClientJOI = Joi.object({
  email: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .min(8)
    .max(30)
    .required(),
});
