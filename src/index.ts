import { CreateServer } from './app';
import { AppDataSource } from './ormconfig';

async function main() {
  await AppDataSource.initialize();

  const server = await CreateServer();
  await server.start();

  console.log('listening...');
}

main();
