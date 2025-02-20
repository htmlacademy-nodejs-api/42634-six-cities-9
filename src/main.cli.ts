import {CliApplication} from './cli/cli-application.js';
import {VersionCommand} from './cli/commands/version.command.js';
import {HelpCommand} from './cli/commands/help.command.js';

function bootstrap() {
  const cliApplication = new CliApplication();

  cliApplication.registerCommands([
    new VersionCommand(),
    new HelpCommand(),
  ]);

  cliApplication.processCommand(process.argv);
}

bootstrap();
