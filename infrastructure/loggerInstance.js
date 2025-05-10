const { createLogger, format, transports } = require('winston');
const { combine, timestamp } = format;

module.exports = createLogger({
    transports:
        new transports.File({
            filename: 'logs/combined.log',
            format: combine(
                timestamp(),
                format.json()
            )
        }),
});