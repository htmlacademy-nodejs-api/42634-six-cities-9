import {Command} from './commands.interface.js';
import chalk from 'chalk';

export class HelpCommand implements Command {
  public getName() {
    return '--help';
  }

  public execute() {
    console.info(chalk.green(`
        Программа для подготовки данных для REST API сервера.
        Пример:
            cli.js --<command> [--arguments]
        Команды:
            ${chalk.blue('--version')}:                   ${chalk.gray('# выводит номер версии')}
            ${chalk.blue('--help')}:                      ${chalk.gray('# печатает этот текст')}
            ${chalk.blue('--import <path>')}:             ${chalk.gray('# импортирует данные из TSV')}
            ${chalk.blue('--generate <n> <path> <url>')}:  ${chalk.gray('# генерирует произвольное количество тестовых данных')}
    `));
  }
}
