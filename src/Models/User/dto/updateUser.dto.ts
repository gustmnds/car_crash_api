import * as Joi from 'joi';
import { UpdateAddressDTO, UpdateAddressJOI } from '../../Address/dto';
import { UpdateClientDTO, UpdateClientJOI } from '../../Client/dto';

export class UpdateUserDTO {
  phone: string;

  address?: UpdateAddressDTO;

  client?: UpdateClientDTO;
}

export const UpdateUserJOI = Joi.object({
  phone: Joi.string()
    .max(15)
    .pattern(/^\d+$/),

  address: UpdateAddressJOI,

  client: UpdateClientJOI,
});
