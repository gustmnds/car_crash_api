import { Server, ServerInjectOptions } from '@hapi/hapi';
import _ = require('lodash');
import { CreateServer } from '../app';
import { AppDataSource } from '../ormconfig';
import { accidentRepository } from '../Repository/accident.repository';
import { userRepository } from '../Repository/user.repository';
import { vehicleRepository } from '../Repository/vehicle.repository';
import { userService } from '../Services/user.service';
import { CreateAccident, CreateUser } from './tools/userFactory';

jest.setTimeout(30000);

let app: Server = null;
beforeAll(async () => {
  await AppDataSource.initialize();
  app = await CreateServer();
});

describe('[POST] /accident', () => {
  it('should be able to create a accident register if authenticated', async () => {
    // setup
    const user = CreateUser(true);
    const third = CreateUser();
    const accident = CreateAccident(third);
    const thirdRegister = await userRepository.create(_.cloneDeep(third));
    const expected = _.assign(_.cloneDeep(accident), {
      thirds: [{
        userId: thirdRegister.id,
      }],
    });
    const jwt = userService.CreateJWT(await userRepository.create(_.cloneDeep(user)));

    const request: ServerInjectOptions = {
      method: 'POST',
      url: '/accident',
      headers: {
        authorization: `Bearer ${jwt}`,
      },
      payload: accident,
    };

    // execute
    const response = await app.inject(request);
    const result = response.result as any;

    // verify
    expect(result).toMatchObject(expected);
  });

  it('should not be able to create a accident register if not authenticated', async () => {
    // setup
    const user = CreateUser(true);
    const third = CreateUser();
    const accident = CreateAccident(third);
    await userRepository.create(_.cloneDeep(third));
    await userRepository.create(_.cloneDeep(user));

    const request: ServerInjectOptions = {
      method: 'POST',
      url: '/accident',
      payload: accident,
    };

    // execute
    const response = await app.inject(request);
    const result = response.result as any;

    // verify
    expect(result).toMatchObject({
      statusCode: 401,
      message: 'Missing authentication',
    });
  });
});

describe('[DELETE] /accident/{id}', () => {
  it('should be able to delete a accident register if athenticated and owner of register', async () => {
    // setup
    const user = CreateUser(true);
    const third = CreateUser();
    const accident = CreateAccident(third);
    accident.vehicle = await vehicleRepository.Create(_.cloneDeep(accident.vehicle));
    const userRegister = await userRepository.create(_.cloneDeep(user));
    const thirdRegister = await userRepository.create(_.cloneDeep(third));
    const accidentRegister = await accidentRepository.Create(userRegister.id, accident, [
      thirdRegister,
    ]);
    const jwt = userService.CreateJWT(userRegister);

    const request: ServerInjectOptions = {
      method: 'DELETE',
      url: `/accident/${accidentRegister.id}`,
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    };

    // execute
    const response = await app.inject(request);
    const result = response.result as any;

    // verify
    expect(result).toEqual({});
  });
});

/*

it('should be able to create a accident register if athenticated', async () => {
    // setup
    const user = CreateUser(true);
    const third = CreateUser();
    const accident = CreateAccident(third);
    const userRegister = await userRepository.create(_.cloneDeep(user));
    const thirdRegister = await userRepository.create(_.cloneDeep(third));
    await accidentRepository.Create(userRegister.id, accident, [thirdRegister]);

    const jwt = userService.CreateJWT(userRegister);

    const { client } = otherUser;
    const request: ServerInjectOptions = {
      method: 'PUT',
      url: '/user',
      headers: {
        authorization: `Bearer ${jwt}`,
      },
      payload: { client },
    };

    // execute
    const response = await app.inject(request);
    const result = response.result as any;

    // verify
    expect(result).toMatchObject({
      statusCode: 400,
      message: 'email already registered',
    });
  });

*/

/*
method: 'POST',
path: '/accident',

method: 'DELETE',
path: '/accident/{accidentId}',

method: 'GET',
path: '/accident/{accidentId}',

method: 'GET',
path: '/accident',

*/
