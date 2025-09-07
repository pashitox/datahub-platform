export interface Params {
  pinoHttp?: any;
}

export const loggerConfig: Params = {
  pinoHttp: {
    level: process.env.LOG_LEVEL || 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        levelFirst: true,
        translateTime: 'UTC:yyyy-mm-dd HH:MM:ss.l',
      },
    },
  },
};
