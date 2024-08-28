import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const { printf, timestamp, combine, errors } = format;
const logFormat = printf(({ level, message, timestamp, stack}) => {
    return `${timestamp} [${level.toUpperCase()}]: ${stack || message}}`
});

const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        errors({ stack: true }),
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