import * as Joi from 'joi';

export class CreateAddressDTO {
  zip: number;

  street: string;

  city: string;

  state: string;

  country: string;
}

export const CreateAddressJOI = Joi.object({
  zip: Joi.number()
    .required(),

  street: Joi.string()
    .max(100)
    .min(3)
    .required(),

  city: Joi.string()
    .max(50)
    .min(3)
    .required(),

  state: Joi.string()
    .max(100)
    .min(3)
    .required(),

  country: Joi.string()
    .max(100)
    .min(3)
    .required(),
});
