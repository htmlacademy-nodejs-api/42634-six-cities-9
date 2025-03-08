import * as Mongoose from 'mongoose';
import {DatabaseClient} from './database-client.interface.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/component.enum.js';
import {Logger} from '../logger/logger.interface.js';


@injectable()
export class MongoDatabaseClient implements DatabaseClient {
  private mongoose: typeof Mongoose;
  private isConnected: boolean;

  constructor(@inject(Component.Logger) private readonly logger: Logger) {
    this.isConnected = false;
  }

  public isDatabaseConnected() {
    return this.isConnected;
  }

  public async connect(uri: string) {
    if (this.isDatabaseConnected()) {
      throw new Error('MongoDB client already connected');
    }

    this.logger.info('Trying to connect to MongoDB…');

    this.mongoose = await Mongoose.connect(uri);
    this.isConnected = true;

    this.logger.info('Database connection established.');
  }

  public async disconnect() {
    if (!this.isDatabaseConnected()) {
      throw new Error('Not connected to the database');
    }

    this.mongoose.disconnect?.();
    this.isConnected = false;

    this.logger.info('MongoDB client disconnected');
  }
}
