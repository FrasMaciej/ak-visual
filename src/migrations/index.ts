import * as migration_20261120_221510_initial from './20261120_221510_initial';
import * as migration_20261121_001147_projects from './20261121_001147_projects';
import * as curate from './20261121_020000_curate';

export const migrations = [
  {
    up: migration_20261120_221510_initial.up,
    down: migration_20261120_221510_initial.down,
    name: '20261120_221510_initial',
  },
  {
    up: migration_20261121_001147_projects.up,
    down: migration_20261121_001147_projects.down,
    name: '20261121_001147_projects'
  },
  { up: curate.up, down: curate.down, name: '20261121_020000_curate' },
];
