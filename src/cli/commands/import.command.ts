import {Command} from './commands.interface.js';
import {TsvFileReader} from '../../shared/libs/file-reader/tsv-file-reader.js';
import {Offer} from '../../shared/types/offer.type.js';
import {getErrorMessage} from '../../shared/helpers/getErrorMessage.js';

export class ImportCommand implements Command {
  private onImportedOffer(offer: Offer) {
    console.info(offer);
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
  }

  public getName() {
    return '--import';
  }

  public async execute(...params: string[]) {
    const [filename] = params;
    const fileReader = new TsvFileReader(filename.trim());

    fileReader.on('line', this.onImportedOffer);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {
      if (!(error instanceof Error)) {
        throw error;
      }

      console.error(`Can't import data from file: ${filename}`);
      console.error(getErrorMessage(error));
    }
  }
}
