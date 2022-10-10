import _ = require('lodash');
import JWT = require('jsonwebtoken');
import Boom = require('@hapi/boom');
import bcryptjs = require('bcryptjs');

import { User } from '../Models/User/user.model';
import { JWT_SECRET } from '../configs';
import { CreateUserDTO } from '../Models/User/dto';
import { UpdateUserDTO } from '../Models/User/dto/updateUser.dto';
import { AuthenticateClientDTO } from '../Models/Client/dto';
import { userRepository, UserRepository } from '../Repository/user.repository';

export class UserService {
  // eslint-disable-next-line no-useless-constructor, no-unused-vars, no-empty-function, no-shadow
  constructor(private readonly userRepository: UserRepository) {}

  public async CreateUser(createUser: CreateUserDTO): Promise<User> {
    if (createUser.client != null) {
      _.assign(createUser.client, {
        password: bcryptjs.hashSync(createUser.client.password),
      });
    }

    // verifica se o email ja esta sendo utilizado por outro usuario
    if (createUser.client != null) {
      const emailExists = await this.userRepository.findByEmail(createUser.client.email);
      if (emailExists != null) {
        throw Boom.badRequest('email already registered');
      }
    }

    // verificar se ja existe o cadastro na base de dados
    const userExists = await this.userRepository.findByCpf(createUser.cpf);
    if (userExists == null) {
      return this.userRepository.create(createUser);
    }

    // usuario ja foi cadastrado como cliente ou estão faltando as credenciais
    if (createUser.client == null || userExists.client != null) {
      throw Boom.badRequest('user already registered');
    }

    // atualiza os dados do usuario.
    return this.userRepository.update(
      _.merge(userExists, createUser),
    );
  }

  public async UpdateUser(userId: number, UpdateUser: UpdateUserDTO): Promise<User> {
    // busca o usuario pelo id
    const user = await this.userRepository.findById(userId);
    if (user == null) {
      throw Boom.notFound('user not found');
    }

    if (UpdateUser.client && UpdateUser.client.email) {
      const emailExists = await this.userRepository.findByEmail(UpdateUser.client.email);
      if (emailExists != null) {
        throw Boom.badRequest('email already registered');
      }
    }

    // criptografa a senha se existir
    const secureClient = { client: undefined };
    if (UpdateUser.client?.password != null) {
      secureClient.client = {
        password: bcryptjs.hashSync(UpdateUser.client.password),
      };
    }

    // atualiza as informações do usuario
    const updatedUser = _.merge(user, UpdateUser, secureClient);
    return this.userRepository.update(updatedUser);
  }

  public async AuthenticateUser(authenticateClient: AuthenticateClientDTO) {
    // busca o usuario pelo email
    const user = await this.userRepository.findByEmail(authenticateClient.email);
    if (user == null) {
      throw Boom.badRequest('email or password invalid');
    }

    // verifica se as senhas são iguais
    if (!user.client.comparePassword(authenticateClient.password)) {
      throw Boom.badRequest('email or password invalid');
    }

    // cria um jwt
    return this.CreateJWT(user);
  }

  public CreateJWT(user: User) {
    return JWT.sign({ id: user.id, clientId: user.client.id }, JWT_SECRET, { expiresIn: '1d' });
  }
}

export const userService = new UserService(userRepository);
