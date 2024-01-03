import {log} from '../log';
import summator from './summator';

// yarn ts-node src/taskName/try.ts

const app = async () => {
  log.info(`1 + 2 = ${summator(1, 2)}`);
  log.info(`4 + 7 = ${summator(4, 7)}`);
  log.info(`18 + 53 = ${summator(18, 53)}`);
};

app();
