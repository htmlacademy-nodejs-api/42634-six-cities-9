import {FileWriter} from './file-writer.interface.js';
import {createWriteStream, WriteStream} from 'node:fs';

export class TsvFileWriter implements FileWriter {
  private stream: WriteStream;

  constructor(filename: string) {
    this.stream = createWriteStream(filename, {
      flags: 'w',
      encoding: 'utf8',
      autoClose: true,
    });
  }

  public async write(row: string) {
    const writeSuccess = this.stream.write(`${row}\n`);

    if (!writeSuccess) {
      return new Promise((resolve) => {
        this.stream.once('drain', () => resolve(true));
      });
    }

    return Promise.resolve();
  }
}
