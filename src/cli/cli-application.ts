import {Command} from './commands/commands.interface.js';
import {CommandParser} from './command-parser.js';

type CommandCollection = Record<string, Command>;

export class CliApplication {
  private commands: CommandCollection = {};

  constructor(private readonly defaultCommand = '--help') {}

  public getDefaultCommand(): Command | never {
    if (!this.commands[this.defaultCommand]) {
      throw new Error(`The default command (${this.defaultCommand}) is not registered.`);
    }

    return this.commands[this.defaultCommand];
  }

  public getCommand(commandName: string) {
    return this.commands[commandName] ?? this.getDefaultCommand();
  }

  public registerCommand(commandList: Command[]) {
    commandList.forEach((command) => {
      if (Object.hasOwn(this.commands, command.getName())) {
        throw new Error(`Command ${command.getName()} is already registered`);
      }

      this.commands[command.getName()] = command;
    });
  }

  public processCommand(argv: string[]) {
    const parsedCommand = CommandParser.parse(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArguments = parsedCommand[commandName] ?? [];

    command.execute(...commandArguments);
  }
}
