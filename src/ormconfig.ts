import 'dotenv/config';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import {
  DATABASE_DB,
  DATABASE_HOST,
  DATABASE_PASSWORD,
  DATABASE_USER,
  DEV_DATABASE_HOST,
  DEV_DATABASE_USER,
  DEV_DATABASE_PASSWORD,
  DEV_DATABASE_DB,
} from './configs';

const connectionConfig = {
  type: 'postgres',
  host: DATABASE_HOST,
  port: 5432,
  username: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_DB,
  entities: [`${__dirname}/Models/**/*.model.{js,ts}`],
  migrations: [`${__dirname}/Migrations/*.{js,ts}`],
};

const developmentConfig = {
  host: DEV_DATABASE_HOST,
  username: DEV_DATABASE_USER,
  password: DEV_DATABASE_PASSWORD,
  database: DEV_DATABASE_DB,
};

if (process.env.NODE_ENV !== 'production') {
  Object.assign(connectionConfig, developmentConfig);
}

export const AppDataSource: DataSource = new DataSource(connectionConfig as DataSourceOptions);
