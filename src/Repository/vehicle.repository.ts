import { Repository } from 'typeorm';
import { CreateVehicleDTO } from '../Models/Vehicle/dto/createVehicle.dto';
import { Vehicle } from '../Models/Vehicle/vehicle.model';
import { AppDataSource } from '../ormconfig';

export class VehicleRepository {
  // eslint-disable-next-line no-useless-constructor, no-unused-vars, no-empty-function
  constructor(private readonly vehicleRepo: Repository<Vehicle>) {}

  public async Create(createVehicle: CreateVehicleDTO) {
    return this.vehicleRepo.save(createVehicle);
  }

  public async FindByLicensePlate(licensePlate: string) {
    return this.vehicleRepo.findOne({
      where: { licensePlate },
    });
  }
}

export const vehicleRepository = new VehicleRepository(AppDataSource.getRepository(Vehicle));
