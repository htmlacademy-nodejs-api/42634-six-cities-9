import {generateRandomNumber} from './generateRandomValue.js';

export function getRandomItems<T>(items: T[]): T[] {
  const startPosition = generateRandomNumber(0, items.length - 1);
  const endPosition = startPosition + generateRandomNumber(startPosition, items.length);

  return items.slice(startPosition, endPosition);
}
