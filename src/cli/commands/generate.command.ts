import {Command} from './commands.interface.js';
import {MockServerData} from '../../shared/types/mock-server-data.type.js';
import got from 'got';
import {TsvOfferGenerator} from '../../shared/libs/offer-generator/tsv-offer-generator.js';
import {TsvFileWriter} from '../../shared/libs/file-writer/tsv-file-writer.js';
import {getErrorMessage} from '../../shared/helpers/getErrorMessage.js';

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
    const tsvOfferGenerator = new TsvOfferGenerator(this.initialData);
    const tsvFileWriter = new TsvFileWriter(filepath);

    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(tsvOfferGenerator.generate());
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

      console.error(getErrorMessage(error));
    }
  }
}
