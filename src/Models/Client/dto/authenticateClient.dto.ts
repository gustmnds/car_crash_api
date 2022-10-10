import * as Joi from 'joi';

export class AuthenticateClientDTO {
  email: string;

  password: string;
}

export const AuthenticateClientJOI = Joi.object({
  email: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .min(8)
    .max(30)
    .required(),
});
