import * as Joi from 'joi';
import { CreateAddressDTO, CreateAddressJOI } from '../../Address/dto';
import { CreateClientDTO, CreateClientJOI } from '../../Client/dto';

export class CreateUserDTO {
  name: string;

  cpf: string;

  birthdate: Date;

  phone: string;

  address?: CreateAddressDTO;

  client?: CreateClientDTO;
}

export const CreateUserJOI = Joi.object({
  name: Joi.string()
    .max(255)
    .min(3)
    .required(),

  cpf: Joi.string()
    .length(11)
    .required(),

  birthdate: Joi.date()
    .required(),

  phone: Joi.string()
    .max(15)
    .pattern(/^\d+$/)
    .required(),

  address: CreateAddressJOI,

  client: CreateClientJOI,
});
