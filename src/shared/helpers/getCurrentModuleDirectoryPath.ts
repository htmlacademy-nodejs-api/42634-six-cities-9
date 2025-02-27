import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

/**
 * Возвращает путь к каталогу текущего модуля (файла), в котором вызвана эта функция.
 *
 * @returns {string} Путь к каталогу текущего модуля.
 */
export function getCurrentModuleDirectoryPath() {
  const filepath = fileURLToPath(import.meta.url);
  return dirname(filepath);
}
