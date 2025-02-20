import {Command} from './commands.interface.js';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {isPackageJSONConfig} from './utils/isPackageJSONConfig.js';
import chalk from 'chalk';

export class VersionCommand implements Command {
  constructor(private readonly filePath: string = 'package.json') {}

  public getName() {
    return '--version';
  }

  private readVersion(): string {
    const jsonContent = readFileSync(resolve(this.filePath), { encoding: 'utf8' });
    const parsedContent: unknown = JSON.parse(jsonContent);

    if (!isPackageJSONConfig(parsedContent)) {
      throw new Error('Failed to parse json content.');
    }

    return parsedContent.version;
  }

  public async execute() {
    try {
      const version = this.readVersion();
      console.log(chalk.cyan(version));
    } catch (error: unknown) {
      console.error(chalk.red(`Failed to read version from ${this.filePath}`));

      if (error instanceof Error) {
        console.error(chalk.red(error.message));
      }
    }
  }
}
