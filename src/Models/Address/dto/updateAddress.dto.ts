import * as Joi from 'joi';

export class UpdateAddressDTO {
  zip?: number;

  street?: string;

  city?: string;

  state?: string;

  country?: string;
}

export const UpdateAddressJOI = Joi.object({
  zip: Joi.number(),

  street: Joi.string()
    .max(100)
    .min(3),

  city: Joi.string()
    .max(50)
    .min(3),

  state: Joi.string()
    .max(100)
    .min(3),

  country: Joi.string()
    .max(100)
    .min(3),
});
