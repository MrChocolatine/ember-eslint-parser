import { execaCommand } from 'execa';
import fse from 'fs-extra';

const REPO = `https://github.com/ember-cli/eslint-plugin-ember.git`;
const FOLDERS = {
  here: process.cwd(),
  testRoot: '/tmp/eslint-plugin-ember-test/',
  repo: '/tmp/eslint-plugin-ember-test/eslint-plugin-ember',
};

await fse.remove(FOLDERS.testRoot);
await fse.ensureDir(FOLDERS.testRoot);

await execaCommand(`git clone ${REPO}`, { cwd: FOLDERS.testRoot, stdio: 'inherit' });
await execaCommand(`yarn install`, { cwd: FOLDERS.repo, stdio: 'inherit' });
await execaCommand(`yarn link`, { cwd: FOLDERS.here, stdio: 'inherit' });
await execaCommand(`yarn link ember-eslint-parser`, { cwd: FOLDERS.repo, stdio: 'inherit' });
await execaCommand(`yarn run test`, { cwd: FOLDERS.repo, stdio: 'inherit' });
