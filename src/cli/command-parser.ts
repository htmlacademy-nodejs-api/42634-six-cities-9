
type ParsedCommand = Record<string, string[]>

export class CommandParser {
  static parse(cliArguments: string[]): ParsedCommand {
    const COMMAND_PREFIX = '--';
    const parsedCommand: ParsedCommand = {};
    let currentCommand = '';

    for (const cliArgument of cliArguments) {
      if (cliArgument.startsWith(COMMAND_PREFIX)) {
        parsedCommand[cliArgument] = [];
        currentCommand = cliArgument;
      } else if (cliArgument && currentCommand) {
        parsedCommand[currentCommand].push(cliArgument);
      }
    }


    return parsedCommand;
  }
}
