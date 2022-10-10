import Joi = require('joi');
import { CreateVehicleDTO, createVehicleJOI } from '../../Vehicle/dto/createVehicle.dto';

export class CreateAccidentDTO {
  description: string;

  vehicle: CreateVehicleDTO;

  thirds: Array<{ name: string, cpf: string }>;
}

export const createAccidentJOI = Joi.object({
  description: Joi.string()
    .min(10)
    .required(),

  vehicle: createVehicleJOI.required(),

  thirds: Joi.array()
    .items(
      Joi.object({
        name: Joi.string()
          .max(255)
          .min(3)
          .required(),

        cpf: Joi.string()
          .length(11)
          .required(),
      }),
    )
    .required(),
});
