import {Logger} from '../shared/libs/logger/logger.interface.js';
import {Config} from '../shared/libs/config/config.interface.js';

export class RestApplication {
  constructor(private readonly logger: Logger, private readonly config: Config) {}

  public async init() {
    this.logger.info('RestApplication initialized.');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
  }
}
