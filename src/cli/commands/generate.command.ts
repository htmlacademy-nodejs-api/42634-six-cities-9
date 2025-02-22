import {Command} from './commands.interface.js';
import {MockServerData} from '../../shared/types/mock-server-data.type.js';
import got from 'got';
import {TsvOfferGenerator} from '../../shared/libs/offer-generator/tsv-offer-generator.js';
import {appendFile} from 'node:fs/promises';

export class GenerateCommand implements Command {
  private initialData: MockServerData;

  private async load(url: string) {
    try {
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  private async write(filepath: string, offerCount: number) {
    const tsvGenerator = new TsvOfferGenerator(this.initialData);

    for (let i = 0; i < offerCount; i++) {
      await appendFile(filepath, `${tsvGenerator.generate()}\n`, { encoding: 'utf8' });
    }
  }

  public getName() {
    return '--generate';
  }

  public async execute(...params: string[]) {
    const [count, filePath, url] = params;
    const offerCount = Number(count);

    try {
      await this.load(url);
      await this.write(filePath, offerCount);
      console.info(`File ${filePath} was created!`);
    } catch (error: unknown) {
      console.error('Can\'t generate data');

      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
