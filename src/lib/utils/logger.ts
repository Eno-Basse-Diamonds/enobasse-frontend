export const logger = {
  error: (message: string, error?: unknown) => {
    if (process.env.NODE_ENV === 'development') {
      console.error(`[ERROR] ${message}`, error);
    }
    // TODO: Implement production logging service
  },
  warn: (message: string, data?: unknown) => {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[WARN] ${message}`, data);
    }
  },
  info: (message: string, data?: unknown) => {
    if (process.env.NODE_ENV === 'development') {
      console.info(`[INFO] ${message}`, data);
    }
  }
};
