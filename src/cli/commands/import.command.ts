import {Command} from './commands.interface.js';

export class ImportCommand implements Command {
  getName() {
    return '--import';
  }

  execute(...params: string[]) {

  }
}
