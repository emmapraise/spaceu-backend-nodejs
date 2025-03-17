import { createLogger, format, transports } from 'winston';

const logger = createLogger({
	level: 'info', // Default log level (can be 'error', 'warn', 'info', 'http', 'debug')
	format: format.combine(
		format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
		format.printf(
			({ timestamp, level, message }) =>
				`[${timestamp}] ${level.toUpperCase()}: ${message}`
		)
	),
	transports: [
		new transports.Console(), // Logs to console
		new transports.File({ filename: 'logs/app.log' }), // Logs to a file
	],
});

export default logger;
