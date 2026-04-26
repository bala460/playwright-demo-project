/**
 * Logger - Centralized logging utility
 */
export class Logger {
  static INFO = '[INFO]';
  static WARN = '[WARN]';
  static ERROR = '[ERROR]';
  static DEBUG = '[DEBUG]';
  static SUCCESS = '[SUCCESS]';

  /**
   * Log info message
   */
  static info(message) {
    console.log(`${this.INFO} ${new Date().toISOString()} - ${message}`);
  }

  /**
   * Log warning message
   */
  static warn(message) {
    console.warn(`${this.WARN} ${new Date().toISOString()} - ${message}`);
  }

  /**
   * Log error message
   */
  static error(message, error = null) {
    console.error(`${this.ERROR} ${new Date().toISOString()} - ${message}`);
    if (error) console.error(error);
  }

  /**
   * Log debug message
   */
  static debug(message, data = null) {
    console.log(`${this.DEBUG} ${new Date().toISOString()} - ${message}`);
    if (data) console.log(JSON.stringify(data, null, 2));
  }

  /**
   * Log success message
   */
  static success(message) {
    console.log(`${this.SUCCESS} ${new Date().toISOString()} - ${message}`);
  }
}
