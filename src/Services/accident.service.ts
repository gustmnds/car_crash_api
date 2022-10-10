import _ = require('lodash');
import Boom = require('@hapi/boom');
import { CreateAccidentDTO } from '../Models/Accident/dto';
import { CreateUserDTO } from '../Models/User/dto';
import { userRepository } from '../Repository/user.repository';
import { accidentRepository, AccidentRepository } from '../Repository/accident.repository';
import { vehicleService } from './vehicle.service';

export class AccidentService {
  // eslint-disable-next-line no-useless-constructor, no-unused-vars, no-empty-function, no-shadow
  constructor(private readonly accidentRepository: AccidentRepository) {}

  public async CreateAccident(clientId: number, createAccident: CreateAccidentDTO) {
    // busca os usuarios que não possuem cadastro no banco de dados pelo cpf
    const cpfs = _.map(createAccident.thirds, (third) => third.cpf);
    const users = await userRepository.findByCpfs(cpfs);
    const usersCpf = _.map(users, (user) => user.cpf);
    const newUsers = _.filter(createAccident.thirds, (third) => usersCpf.indexOf(third.cpf) === -1);

    // cria os novos usuarios e adiciona eles devolta a listagem
    users.push(...await userRepository.createMany(
      newUsers as unknown as CreateUserDTO[],
    ));

    // puxa / cria o registro do veiculo no banco da dados
    const vehicle = await vehicleService.CreateVehicle(createAccident.vehicle);
    _.assign(createAccident, { vehicle });

    // cria o registro do acidente
    return this.accidentRepository.Create(clientId, createAccident, users);
  }

  public async DeleteAccident(clientId: number, accidentId: number) {
    // procura o acidente no banco de dados
    const accident = await this.accidentRepository.FindById(accidentId);
    if (accident == null) {
      throw Boom.notFound('accident not found');
    }

    // verifica se o usuario é o criador do registro
    if (accident.clientId !== clientId) {
      throw Boom.forbidden("you don't have permission to delete this accident");
    }

    // deleta o registro do acidente
    await this.accidentRepository.Delete(accidentId);
  }

  public async ViewAccident(accidentId: number) {
    // procura o acidente no banco de dados
    const accident = await this.accidentRepository.FindById(accidentId);
    if (accident == null) {
      throw Boom.notFound('accident not found');
    }

    return accident;
  }

  public async ListAccidents(clientId: number) {
    // busta todos os acidentes vinculados ao id do cliente
    return this.accidentRepository.FindByClientId(clientId);
  }
}

export const accidentService = new AccidentService(accidentRepository);
