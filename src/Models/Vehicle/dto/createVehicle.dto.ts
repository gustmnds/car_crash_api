import Joi = require('joi');

export class CreateVehicleDTO {
  model: string;

  brand: string;

  licensePlate: string;

  color: string;

  chassi: string;
}

export const createVehicleJOI = Joi.object({
  model: Joi.string()
    .min(3)
    .max(255)
    .required(),

  brand: Joi.string()
    .min(3)
    .max(255)
    .required(),

  licensePlate: Joi.string()
    .min(2)
    .max(10)
    .required(),

  color: Joi.string()
    .min(2)
    .max(10)
    .required(),

  chassi: Joi.string()
    .min(2)
    .max(255)
    .required(),
});
