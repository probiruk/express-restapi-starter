import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const logFormat = format.printf(
  ({ level, message, timestamp, stack }) =>
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/strict-boolean-expressions
    `${timestamp} ${level}: ${stack || message}`
);

const transport = new DailyRotateFile({
  filename: "./logs/server-%DATE%.log",
  datePattern: "YYYY-MM-DD-HH",
  maxSize: "20m",
  maxFiles: "14d",
  zippedArchive: true,
});

const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }),
    logFormat
  ),
  transports: [transport, new transports.Console()],
});

export default logger;
