import {log} from '../log';

// yarn ts-node src/taskName/task1.ts

const app = async () => {
  log.info('start task1');

  log.info('finish task1');
};

app();
