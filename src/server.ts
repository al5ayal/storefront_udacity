import { app } from './app';
import config from './config';

const host: string = config.app.AppHost;
const port: number = config.app.port as number;

app.listen(port, function () {
  console.log(`starting app on: ${host}:${port}`);
});
