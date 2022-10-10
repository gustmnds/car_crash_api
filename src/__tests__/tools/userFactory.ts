import { faker } from '@faker-js/faker';

export function CreateClient(): any {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(10, true),
  };
}

export function CreateUser(client: boolean = false): any {
  const user = {
    name: faker.name.fullName(),
    cpf: faker.datatype.number({ min: 10000000000, max: 99999999999 }).toString(),
    birthdate: faker.date.past(),
    phone: faker.phone.number('#############'),
    address: {
      zip: parseInt(faker.address.zipCode(), 10),
      street: faker.address.street(),
      city: faker.address.city(),
      state: faker.address.state(),
      country: faker.address.country(),
    },
  };

  if (client) {
    Object.assign(user, {
      client: CreateClient(),
    });
  }

  return user;
}

export function CreateAccident(third = CreateUser()) {
  return {
    description: faker.lorem.words(5),
    thirds: [{
      name: third.name,
      cpf: third.cpf,
    }],
    vehicle: {
      model: faker.vehicle.model(),
      brand: faker.vehicle.manufacturer(),
      licensePlate: faker.vehicle.vrm(),
      color: faker.color.human(),
      chassi: faker.vehicle.type(),
    },
  };
}
