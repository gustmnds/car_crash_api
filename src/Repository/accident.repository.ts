import _ = require('lodash');
import { Repository } from 'typeorm';
import { Accident } from '../Models/Accident/accident.model';
import { CreateAccidentDTO } from '../Models/Accident/dto';
import { User } from '../Models/User/user.model';
import { AppDataSource } from '../ormconfig';

export class AccidentRepository {
  // eslint-disable-next-line no-useless-constructor, no-unused-vars, no-empty-function
  constructor(private readonly accidentRepo: Repository<Accident>) {}

  public async FindByClientId(clientId: number) {
    return this.accidentRepo.find({
      where: { clientId },
      relations: {
        thirds: {
          user: true,
        },
        client: true,
      },
    });
  }

  public async FindById(id: number) {
    return this.accidentRepo.findOne({
      where: { id },
      relations: {
        thirds: {
          user: true,
        },
        client: true,
      },
    });
  }

  public async Create(clientId: number, createAccident: CreateAccidentDTO, thirds: User[]) {
    const accident = this.accidentRepo.create(
      _.assign(createAccident, {
        clientId,
        thirds: thirds.map((third) => ({ userId: third.id })),
      }),
    );

    return this.accidentRepo.save(accident);
  }

  public async Delete(accidentId: number) {
    return this.accidentRepo.delete({ id: accidentId });
  }
}

export const accidentRepository = new AccidentRepository(AppDataSource.getRepository(Accident));
