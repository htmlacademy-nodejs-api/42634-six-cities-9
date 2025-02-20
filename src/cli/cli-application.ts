import {Command} from './commands/commands.interface.js';

type CommandCollection = Record<string, Command>;

export class CliApplication {
  private commands: CommandCollection = {};

  public registerCommand(commandList: Command[]) {
    commandList.forEach((command) => {
      if (Object.hasOwn(this.commands, command.getName())) {
        throw new Error(`Command ${command.getName()} is already registered`);
      }

      this.commands[command.getName()] = command;
    });
  }
}
