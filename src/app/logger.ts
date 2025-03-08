import winston from "winston";

const Logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: { service: "user-service" },
    handleExceptions: true,
    handleRejections: true,
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: "./logs/error.log",
            level: "error",
        }),
        new winston.transports.File({ filename: "./logs/combined.log" }),
    ],
});

export default Logger;
