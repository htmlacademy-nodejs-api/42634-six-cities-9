import convict from 'convict';
import validator from 'convict-format-with-validator';

export type RestSchema = {
  PORT: number;
  DB_HOST: string;
  SALT: string;
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
  }
});
