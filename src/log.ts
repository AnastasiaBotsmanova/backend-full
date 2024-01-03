import {Logger} from 'tslog';

export const log = new Logger({
  maskValuesOfKeys: [],
  name: 'adm-graph-server',
  type: process.env.NODE_ENV === 'production' ? 'json' : 'pretty',
});
