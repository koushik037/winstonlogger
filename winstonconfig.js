import winston, { transports } from 'winston'
import 'winston-daily-rotate-file'
import 'dotenv/config'
import moment from 'moment'
const { combine, timestamp, json, errors, colorize,printf,splat } = winston.format;

// required for file name 
const fileSuffix = ()=>{
    var month = moment().month()
    var year = moment().year()
    return `${month}-${year}`
}
const customFormat =printf((info) => `[${info.timestamp}] ${info.level.toUpperCase()}: ${info.message}`)

const infoLogFormat = winston.format.combine(
    timestamp({
        format:'YYYY-MM-DD hh:mm:ss SSS A'
    }),
    splat(),
    customFormat
);
const logLevels = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5,
    http: 6
};

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
}

winston.addColors(colors)

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    levels: logLevels,
    format: infoLogFormat,
    defaultMeta: { service: 'user-service' },
    transports: [
        // normally file never delete just change the filename period of time
        new winston.transports.File({
            filename: `./log/error/-${fileSuffix()}.log`, // your dynamic file name
            level: 'error',
            datePattern: 'YYYY-MM-DD-HH',
        }),
        new winston.transports.File({
            filename: `./log/combined-${fileSuffix()}.log`, // your dynamic file name 
            level: 'info',
            datePattern: 'YYYY-MM-DD-HH',
        }),
        // for general purpose use dailyRotatefile automatically delete 

        // new winston.transports.DailyRotateFile({
        //     filename:'application-%DATE%.log',
        //     datePattern:'YYYY-MM-DD-HH',
        //     maxSize:'20m',
        //     maxFiles:'1d'
        // })
    ],
})

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }))
}


export default logger