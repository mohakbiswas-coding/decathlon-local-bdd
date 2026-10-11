//logger.ts
import fs from 'fs';
import path from 'path';

export class Logger {
  private static logFilePath = path.join(
    process.cwd(),
    'logs',
    'execution-log.json'
  );

  private static getTimestamp(): string {
    return new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(new Date()) + ' IST';
  }

  private static writeLog(level: string, message: string): void {
    const logEntry = {
      timestamp: this.getTimestamp(),
      level,
      message
    };

    const logsDir = path.dirname(this.logFilePath);

    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }

    let existingLogs = [];

    if (fs.existsSync(this.logFilePath)) {
      existingLogs = JSON.parse(
        fs.readFileSync(this.logFilePath, 'utf-8')
      );
    }

    existingLogs.push(logEntry);

    fs.writeFileSync(
      this.logFilePath,
      JSON.stringify(existingLogs, null, 2)
    );

    console.log(
      `[${logEntry.timestamp}] [${level}] ${message}`
    );
  }

  static info(message: string): void {
    this.writeLog('INFO', message);
  }

  static warn(message: string): void {
    this.writeLog('WARN', message);
  }

  static error(message: string): void {
    this.writeLog('ERROR', message);
  }

  static debug(message: string): void {
    this.writeLog('DEBUG', message);
  }
}
 