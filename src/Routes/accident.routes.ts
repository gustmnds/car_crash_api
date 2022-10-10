import { Server } from '@hapi/hapi';
import { accidentController } from '../Controllers/accident.controller';
import { createAccidentJOI, idAccidentJOI } from '../Models/Accident/dto';

export const accidentRoutes = {
  name: 'accident',
  version: '1.0.0',
  async register(server: Server) {
    server.route([{
      method: 'POST',
      path: '/accident',
      handler: accidentController.CreateAccident.bind(accidentController),
      options: {
        validate: {
          payload: createAccidentJOI,
        },
        auth: 'jwt',
      },
    },
    {
      method: 'DELETE',
      path: '/accident/{accidentId}',
      handler: accidentController.DeleteAccident.bind(accidentController),
      options: {
        validate: {
          params: idAccidentJOI,
        },
        auth: 'jwt',
      },
    },
    {
      method: 'GET',
      path: '/accident/{accidentId}',
      handler: accidentController.ViewAccident.bind(accidentController),
      options: {
        validate: {
          params: idAccidentJOI,
        },
        auth: 'jwt',
      },
    },
    {
      method: 'GET',
      path: '/accident',
      handler: accidentController.ListAccidents.bind(accidentController),
      options: {
        auth: 'jwt',
      },
    }]);
  },
};
