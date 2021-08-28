# emorlog

Emorlog is an express middleware which composes the [morgan](https://www.npmjs.com/package/morgan) logger middleware with the [pino](https://www.npmjs.com/package/pino) console output library for a consistent logging output with other library debug info.

## Installation

```bash
npm install emorlog
```

## Usage

**`morganDevtool(format,options);`**

- `format` (string): The morgan format string
- `options` (object): Optional options to pass through to morgan

```js
import express, { Request, Response } from 'express';
import { morganDevtool, log } from 'emorlog';

const app = express();

app.use(morganDevtool('dev'));

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello Emorlog' });
});

app.listen(5000, 'localhost', () => {
  log.info(`Server listing at http://localhost:5000`);
});
```

output color

```log
[2021-08-28T12:18:29+07:00] INFO: Server listing at http://localhost:5000
[2021-08-28T12:18:32+07:00] INFO: GET / 304 2.251 ms - -
```

## Tokens (extends morgan)

`:datetz`
The current date and time in UTC.

`:methodColor`
The HTTP method of the request.

`:statusColor`
The status code of the response.
