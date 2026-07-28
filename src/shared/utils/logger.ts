/**
 * Structured logging utility.
 *
 * @description `error` always logs with an `[ERROR]` prefix regardless of
 * environment. `warn` and `info` only log in development mode to reduce
 * noise in production.
 */
export const logger = {
  /**
   * Logs an error message with an optional error object.
   * Always outputs regardless of environment.
   *
   * @param message - Description of the error.
   * @param error - Optional error object for additional context.
   */
  error: (message: string, error?: unknown) => {
    console.error(`[ERROR] ${message}`, error);
  },

  /**
   * Logs a warning message. Only outputs in development mode.
   *
   * @param message - Warning description.
   * @param data - Optional contextual data.
   */
  warn: (message: string, data?: unknown) => {
    if (process.env.NODE_ENV === "development") {
      console.warn(`[WARN] ${message}`, data);
    }
  },

  /**
   * Logs an informational message. Only outputs in development mode.
   *
   * @param message - Info message description.
   * @param data - Optional contextual data.
   */
  info: (message: string, data?: unknown) => {
    if (process.env.NODE_ENV === "development") {
      console.info(`[INFO] ${message}`, data);
    }
  },
};
