import { Request, Response } from 'express';
import chalk from 'chalk';
import dayjs from 'dayjs';
import morgan from 'morgan';

morgan.token('datetz', (req: Request, res: Response) => {
  const date = dayjs().format();
  return date;
});

morgan.token('statusColor', (req: Request, res: Response, args) => {
  // Get the status code if response written
  const status = (
    typeof res.headersSent !== 'boolean' ? Boolean(res.header) : res.headersSent
  )
    ? res.statusCode
    : 0;

  // Get status color
  const color =
    status >= 500
      ? 31 // red
      : status >= 400
      ? 33 // yellow
      : status >= 300
      ? 36 // cyan
      : status >= 200
      ? 32 // green
      : 37; // white

  return `\x1b[${color}m${status}\x1b[0m`;
});

morgan.token('methodColor', (req: Request, res: Response, args) => {
  // Get method
  const method = req.method;

  // Get method color
  const color =
    method === 'GET'
      ? 33 // yellow
      : method === 'POST'
      ? 32 // green
      : method === 'PUT'
      ? 34 // blue
      : method === 'PATCH'
      ? 36 // cyan
      : method === 'DELETE'
      ? 31 // red
      : 37; // white

  return `\x1b[${color}m${method}\x1b[0m`;
});

const morganDevTool = (
  format: string,
  options?: morgan.Options<Request, Response> | undefined
) => {
  if (format === 'dev') {
    return morgan(
      chalk`[:datetz] {green INFO}: {bold :methodColor} :url {bold :statusColor} :response-time ms - :res[content-length]`,
      options
    );
  } else if (format === 'combined') {
    return morgan(
      chalk`[:datetz] {green INFO}: :remote-addr - :remote-user "{bold :methodColor} :url HTTP/:http-version" {bold :statusColor} :res[content-length] ":referrer" ":user-agent"`,
      options
    );
  } else if (format === 'common') {
    return morgan(
      chalk`[:datetz] {green INFO}: :remote-addr - :remote-user "{bold :methodColor} :url HTTP/:http-version" {bold :statusColor} :res[content-length]`,
      options
    );
  } else if (format === 'short') {
    return morgan(
      chalk`[:datetz] {green INFO}: :remote-addr :remote-user {bold :methodColor} :url HTTP/:http-version {bold :statusColor} :res[content-length] - :response-time ms`,
      options
    );
  } else if (format === 'tiny') {
    return morgan(
      chalk`[:datetz] {green INFO}: {bold :methodColor} :url {bold :statusColor} :res[content-length] - :response-time ms`,
      options
    );
  } else {
    return morgan(format, options);
  }
};

export default morganDevTool;
