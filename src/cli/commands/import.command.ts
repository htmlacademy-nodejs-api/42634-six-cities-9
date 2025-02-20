import {Command} from './commands.interface.js';
import {TsvFileReader} from '../../shared/libs/file-reader/tsv-file-reader.js';

export class ImportCommand implements Command {
  getName() {
    return '--import';
  }

  execute(...params: string[]) {
    const [filename] = params;
    const fileReader = new TsvFileReader(filename.trim());

    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (error) {
      if (!(error instanceof Error)) {
        throw error;
      }

      console.error(`Can't import data from file: ${filename}`);
      console.error(`Details: ${error.message}`);
    }
  }
}
