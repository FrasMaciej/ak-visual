import * as migration_20261120_221510_initial from './20261120_221510_initial';

export const migrations = [
  {
    up: migration_20261120_221510_initial.up,
    down: migration_20261120_221510_initial.down,
    name: '20261120_221510_initial'
  },
];
