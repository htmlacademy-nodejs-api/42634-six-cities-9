export interface Logger {
  info: (message: string, ...params: unknown[]) => void,
  warn: (message: string, ...params: unknown[]) => void,
  error: (message: string, error: Error, ...params: unknown[]) => void,
  debug: (message: string, ...params: unknown[]) => void,
}
