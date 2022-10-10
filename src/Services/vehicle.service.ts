import _ = require('lodash');
import { CreateAccidentDTO } from '../Models/Accident/dto';
import { CreateUserDTO } from '../Models/User/dto';
import { userRepository } from '../Repository/user.repository';
import { accidentRepository, AccidentRepository } from '../Repository/accident.repository';
import { vehicleRepository, VehicleRepository } from '../Repository/vehicle.repository';
import { CreateVehicleDTO } from '../Models/Vehicle/dto/createVehicle.dto';

export class VehicleService {
  // eslint-disable-next-line no-useless-constructor, no-unused-vars, no-empty-function, no-shadow
  constructor(private readonly vehicleRepo: VehicleRepository) {}

  public async CreateVehicle(createVehicle: CreateVehicleDTO) {
    const vehicleExists = await this.vehicleRepo.FindByLicensePlate(createVehicle.licensePlate);
    if (vehicleExists != null) {
      return vehicleExists;
    }

    return this.vehicleRepo.Create(createVehicle);
  }
}

export const vehicleService = new VehicleService(vehicleRepository);
