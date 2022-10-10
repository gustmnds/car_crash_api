import { Server, ServerInjectOptions } from '@hapi/hapi';
import _ = require('lodash');
import { CreateServer } from '../app';
import { AppDataSource } from '../ormconfig';
import { userRepository } from '../Repository/user.repository';
import { userService } from '../Services/user.service';
import { CreateClient, CreateUser } from './tools/userFactory';

jest.setTimeout(30000);

let app: Server = null;
beforeAll(async () => {
  await AppDataSource.initialize();
  await AppDataSource.synchronize(true);
  app = await CreateServer();
});

describe('[POST] /user', () => {
  it('should be able to create a new user without client register', async () => {
    // setup
    const user = CreateUser();
    const request: ServerInjectOptions = {
      method: 'POST',
      url: '/user',
      payload: user,
    };

    // execute
    const response = await app.inject(request);
    const result = response.result as any;

    // verify
    expect(result).toMatchObject(user);
    expect(result).not.toHaveProperty('client');
  });

  it('should not be able to create a new user without client register when cpf already in use', async () => {
    // setup
    const user = CreateUser();
    await userRepository.create(_.cloneDeep(user));
    const request: ServerInjectOptions = {
      method: 'POST',
      url: '/user',
      payload: user,
    };

    // execute
    const response = await app.inject(request);
    const result = response.result as any;

    // verify
    expect(result).toMatchObject({
      statusCode: 400,
      message: 'user already registered',
    });
  });

  it('should be able to create a new user with client register', async () => {
    // setup
    const { client, ...user } = CreateUser(true);
    const request: ServerInjectOptions = {
      method: 'POST',
      url: '/user',
      payload: { client, ...user },
    };

    // execute
    const response = await app.inject(request);
    const result = response.result as any;

    // verify
    expect(result).toMatchObject(user);
    expect(result).toHaveProperty('client.email');
    expect(result).not.toHaveProperty('client.password');
    expect(result.client.email).toBe(client.email);
  });

  it('should not be able to create a new user with client register when email already in use', async () => {
    // setup
    const user = CreateUser(true);
    await userRepository.create(_.cloneDeep(user));
    const request: ServerInjectOptions = {
      method: 'POST',
      url: '/user',
      payload: user,
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

  it('should be able to create a new user with client when user already registred without client', async () => {
    // setup
    const user = CreateUser(true);
    const { client, ...userdata } = user;
    await userRepository.create(_.cloneDeep(userdata));
    const request: ServerInjectOptions = {
      method: 'POST',
      url: '/user',
      payload: { client, ...userdata },
    };

    // execute
    const response = await app.inject(request);
    const result = response.result as any;

    // verify
    expect(result).toMatchObject(userdata);
    expect(result).toHaveProperty('client.email');
    expect(result).not.toHaveProperty('client.password');
    expect(result.client.email).toBe(client.email);
  });
});

describe('[POST] /user/login', () => {
  it('should be able to login to user account with valid credentials', async () => {
    // setup
    const user = CreateUser(true);
    await userRepository.create(_.cloneDeep(user));
    const request: ServerInjectOptions = {
      method: 'POST',
      url: '/user/login',
      payload: user.client,
    };

    // execute
    const response = await app.inject(request);
    const result = response.result as any;

    // verify
    expect(result).toHaveProperty('jwt');
  });

  it('should not be able to login to user account with invalid credentials', async () => {
    // setup
    const user = CreateUser(true);
    const credentials = CreateClient();
    await userRepository.create(_.cloneDeep(user));
    const request: ServerInjectOptions = {
      method: 'POST',
      url: '/user/login',
      payload: credentials,
    };

    // execute
    const response = await app.inject(request);
    const result = response.result as any;

    // verify
    expect(result).toMatchObject({
      statusCode: 400,
      message: 'email or password invalid',
    });
  });
});

describe('[PUT] /user', () => {
  it('should be able to update user credentials if authenticated', async () => {
    // setup
    const user = CreateUser(true);
    const { phone, address, client } = CreateUser(true);
    const jwt = userService.CreateJWT(await userRepository.create(_.cloneDeep(user)));
    const request: ServerInjectOptions = {
      method: 'PUT',
      url: '/user',
      headers: {
        authorization: `Bearer ${jwt}`,
      },
      payload: { phone, address, client },
    };

    // execute
    const response = await app.inject(request);
    const result = response.result as any;

    // verify
    expect(result).toMatchObject({ phone, address });
    expect(result).toHaveProperty('client.email');
    expect(result).not.toHaveProperty('client.password');
    expect(result.client.email).toBe(client.email);
  });

  it('should not be able to update user credentials if not authenticated', async () => {
    // setup
    const user = CreateUser(true);
    await userRepository.create(_.cloneDeep(user));
    const { phone, address, client } = CreateUser(true);
    const request: ServerInjectOptions = {
      method: 'PUT',
      url: '/user',
      payload: { phone, address, client },
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

  it('should not be able to update user credentials if email already in use', async () => {
    // setup
    const user = CreateUser(true);
    const otherUser = CreateUser(true);

    await userRepository.create(_.cloneDeep(otherUser));
    const jwt = userService.CreateJWT(await userRepository.create(_.cloneDeep(user)));

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
});
