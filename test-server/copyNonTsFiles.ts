import * as shell from 'shelljs';

// Copy type-defs files
const files = shell.ls('dist/models/gql');

if (!files.includes('type-defs')) {
  shell.mkdir('-p', 'dist/models/gql/type-defs');
}

shell.cp('-R', 'src/models/gql/type-defs/*', 'dist/models/gql/type-defs/');
