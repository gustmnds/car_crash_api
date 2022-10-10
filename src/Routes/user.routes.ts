import { Server } from '@hapi/hapi';
import { userController } from '../Controllers/user.controller';
import { AuthenticateClientJOI } from '../Models/Client/dto';
import { CreateUserJOI } from '../Models/User/dto';
import { UpdateUserJOI } from '../Models/User/dto/updateUser.dto';

export const userRoutes = {
  name: 'user',
  version: '1.0.0',
  async register(server: Server) {
    server.route([{
      method: 'POST',
      path: '/user',
      handler: userController.CreateUser.bind(userController),
      options: {
        validate: {
          payload: CreateUserJOI,
        },
      },
    },
    {
      method: 'POST',
      path: '/user/login',
      handler: userController.AuthenticateUser.bind(userController),
      options: {
        validate: {
          payload: AuthenticateClientJOI,
        },
      },
    }, {
      method: 'PUT',
      path: '/user',
      handler: userController.UpdateUser.bind(userController),
      options: {
        auth: 'jwt',
        validate: {
          payload: UpdateUserJOI,
        },
      },
    }]);
  },
};
