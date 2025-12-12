import pino from 'pino'

const REDACT_PATHS: string[] = [
  // headers
  'req.headers.authorization',
  'req.headers.cookie',
  'req.headers.set-cookie',
  // body
  'req.body.password',
  'req.body.token',
  'req.body.email',
  'req.body.phone',
]

export const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  redact: {
    paths: REDACT_PATHS,
    remove: true,
  },
  timestamp: pino.stdTimeFunctions.isoTime,
})
