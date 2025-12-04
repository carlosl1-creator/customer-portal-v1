/**
 * Centralized logging utility
 * Replace console.log statements with this for better control and consistency
 */

type LogLevel = "debug" | "info" | "warn" | "error";

interface Logger {
  debug: (...args: unknown[]) => void;
  info: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
}

class LoggerImpl implements Logger {
  private isDevelopment = import.meta.env.DEV;

  debug(...args: unknown[]): void {
    if (this.isDevelopment) {
      console.debug("[DEBUG]", ...args);
    }
  }

  info(...args: unknown[]): void {
    if (this.isDevelopment) {
      console.info("[INFO]", ...args);
    }
  }

  warn(...args: unknown[]): void {
    console.warn("[WARN]", ...args);
  }

  error(...args: unknown[]): void {
    console.error("[ERROR]", ...args);
  }
}

export const logger = new LoggerImpl();

/**
 * For production, you might want to send logs to a service
 * Example:
 * 
 * export const logger = {
 *   debug: (...args) => sendToLogService('debug', args),
 *   info: (...args) => sendToLogService('info', args),
 *   warn: (...args) => sendToLogService('warn', args),
 *   error: (...args) => sendToLogService('error', args),
 * };
 */

