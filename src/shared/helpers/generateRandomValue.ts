/**
 * Генерирует случайное число в диапазоне от min до max с указанным количеством знаков после запятой.
 *
 * @param min Минимальное значение
 * @param max Максимальное значение
 * @param numAfterDigit Количество знаков после запятой (по умолчанию 0)
 */
export function generateRandomNumber(min: number, max: number, numAfterDigit = 0): number {
  return Number((Math.random() * (max - min) + min).toFixed(numAfterDigit));
}
