import * as Joi from 'joi';

export class UpdateClientDTO {
  email?: string;

  password?: string;
}

export const UpdateClientJOI = Joi.object({
  email: Joi.string()
    .email(),

  password: Joi.string()
    .min(8)
    .max(30),
});
