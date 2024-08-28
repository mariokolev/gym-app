import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const { printf, timestamp, combine, errors } = format;
const logFormat = printf(({ level, message, timestamp, stack}) => {
    return `${timestamp} [${level.toUpperCase()}][${message}]: ${stack}`;
});

const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        errors({ name: true, message: true, stack: true }),
        logFormat
    ),
    transports: [
        new transports.Console(),
        new DailyRotateFile({
            filename: 'logs/app-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxFiles: '14d'
        }),
    ],
});

export default logger;