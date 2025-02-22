import {generateRandomNumber} from './generateRandomValue.js';

export function getRandomItem<T>(items: T[]): T {
  return items[generateRandomNumber(0, items.length - 1)];
}
