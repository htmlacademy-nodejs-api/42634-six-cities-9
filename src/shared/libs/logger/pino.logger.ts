import {Logger} from './logger.interface.js';
import {Logger as PinoInstance, pino, transport} from 'pino';
import {getCurrentModuleDirectoryPath} from '../../helpers/getCurrentModuleDirectoryPath.js';
import {resolve, dirname} from 'node:path';
import {mkdir} from 'node:fs/promises';

export class PinoLogger implements Logger {
  private readonly logger: PinoInstance;

  constructor() {
    const modulePath = getCurrentModuleDirectoryPath();
    const logFilePath = 'logs/rest.log';
    const destination = resolve(modulePath, '../../../', logFilePath);
    const logDir = dirname(destination);

    // Создаем каталог для логов, если он не существует
    mkdir(logDir, { recursive: true })
      .catch((err) => this.logger.error('Ошибка создания каталога для логов:', err));

    const multiTransport = transport({
      targets: [
        {
          target: 'pino/file',
          options: { destination },
          level: 'debug'
        },
        {
          target: 'pino/file',
          options: {},
          level: 'info'
        }
      ]
    });

    this.logger = pino({}, multiTransport);
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
