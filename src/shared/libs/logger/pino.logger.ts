import {Logger} from './logger.interface.js';
import { Logger as PinoInstance, pino } from 'pino';

export class PinoLogger implements Logger {
  private readonly logger: PinoInstance;

  constructor() {
    this.logger = pino();
  }

  info(message: string, ...params: unknown[]) {
    this.logger.info(message, ...params);
  }

  warn(message: string, ...params: unknown[]) {
    this.logger.warn(message, ...params);
  }

  error(message: string, error: Error, ...params: unknown[]) {
    this.logger.error(error, message, ...params);
  }

  debug(message: string, ...params: unknown[]) {
    this.logger.debug(message, ...params);
  }
}
