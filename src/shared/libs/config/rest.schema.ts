import convict from 'convict';
import validator from 'convict-format-with-validator';

export type RestSchema = {
  PORT: number;
  DB_HOST: string;
  SALT: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_PORT: string;
  ME_CONFIG_MONGODB_ADMINUSERNAME: string;
  ME_CONFIG_MONGODB_PASSWORD: string;
}

convict.addFormats(validator);

export const configRestSchema = convict<RestSchema>({
  PORT: {
    doc: 'Port for incoming connections',
    format: 'port',
    env: 'PORT',
    default: 4000,
  },
  DB_HOST: {
    doc: 'IP address of the database server (MongoDB)',
    format: 'ipaddress',
    env: 'DB_HOST',
    default: '127.0.0.1',
  },
  SALT: {
    doc: 'Salt for password has',
    format: String,
    env: 'SALT',
    default: null,
  },
  DB_USERNAME: {
    doc: 'Username of the database server',
    format: String,
    env: 'DB_USERNAME',
    default: null,
  },
  DB_PASSWORD: {
    doc: 'Password of the database server',
    format: String,
    env: 'DB_PASSWORD',
    default: null,
  },
  DB_PORT: {
    doc: 'Port for incoming database connections',
    format: String,
    env: 'DB_PORT',
    default: '27017',
  },
  ME_CONFIG_MONGODB_ADMINUSERNAME: {
    doc: 'Username of the MONGODB database server',
    format: String,
    env: 'ME_CONFIG_MONGODB_ADMINUSERNAME',
    default: null,
  },
  ME_CONFIG_MONGODB_PASSWORD: {
    doc: 'Password of the MONGODB database server',
    format: String,
    env: 'ME_CONFIG_MONGODB_PASSWORD',
    default: null,
  }
});
