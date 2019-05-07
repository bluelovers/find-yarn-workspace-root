'use strict';

const expect = require('chai').expect;
const cp = require('child_process');
const path = require('path');
const findWorkspaceRoot = require('../index');

describe('findWorkspaceRoot', function() {
  let fixtureDirectory = path.resolve(__dirname, './fixtures');

  const tests = [
    {
      description: 'normal yarn project',
      baseDir: path.join(fixtureDirectory, 'normal-yarn-project'),
      expectedResult: null,
    },
    {
      description: 'not a yarn project',
      baseDir: path.join(fixtureDirectory, 'not-yarn'),
      expectedResult: null,
    },
    {
      description: 'yarn workspace root',
      baseDir: path.join(fixtureDirectory, 'yarn-workspace'),
      expectedResult: path.join(fixtureDirectory, 'yarn-workspace'),
    },
    {
      description: 'package-a in yarn workspace root',
      baseDir: path.join(fixtureDirectory, 'yarn-workspace', 'package-a'),
      expectedResult: path.join(fixtureDirectory, 'yarn-workspace'),
    },
    {
      description: 'package-b in yarn workspace root',
      baseDir: path.join(fixtureDirectory, 'yarn-workspace', 'package-b'),
      expectedResult: path.join(fixtureDirectory, 'yarn-workspace'),
    },
    {
      description: 'package not listed in yarn workspace root',
      baseDir: path.join(fixtureDirectory, 'yarn-workspace', 'not-in-workspace'),
      expectedResult: null,
    },
    {
      description: 'yarn workspace root without a lockfile',
      baseDir: path.join(fixtureDirectory, 'yarn-workspace-no-lockfile'),
      expectedResult: path.join(fixtureDirectory, 'yarn-workspace-no-lockfile'),
    },
    {
      description: 'yarn workspace root - object config format',
      baseDir: path.join(fixtureDirectory, 'yarn-workspace-object-config'),
      expectedResult: path.join(fixtureDirectory, 'yarn-workspace-object-config'),
    },
    {
      description: 'package-a in yarn workspace root - object config format',
      baseDir: path.join(fixtureDirectory, 'yarn-workspace-object-config', 'package-a'),
      expectedResult: path.join(fixtureDirectory, 'yarn-workspace-object-config'),
    },
    {
      description: 'package not listed in yarn workspace root - object config format',
      baseDir: path.join(fixtureDirectory, 'yarn-workspace-object-config-no-packages', 'package-a'),
      expectedResult: null,
    },
    {
      description: 'sub path of package-a in yarn workspace root',
      baseDir: path.join(fixtureDirectory, 'yarn-workspace', 'package-a', 'sub-path'),
      expectedResult: path.join(fixtureDirectory, 'yarn-workspace'),
    },
  ];

  for (let i = 0; i < tests.length; i++) {
    const description = tests[i].description;
    const baseDir = tests[i].baseDir;
    const expectedResult = tests[i].expectedResult;

    it(description, function() {
      expect(findWorkspaceRoot(baseDir)).to.equal(expectedResult);
    });
  }

  it('uses process.cwd() as a default path', function() {
    const dummyBinPath = require.resolve('./fixtures/bin/cwd-find-root');
    const workspaceRoot = path.join(fixtureDirectory, 'yarn-workspace-default-path');
    const execOptions = {
      cwd: path.join(workspaceRoot, 'package-a'),
      encoding: 'utf8'
    };
    const result = cp.execFileSync(process.execPath, [dummyBinPath], execOptions);
    expect(result).to.equal(workspaceRoot);
  });
});
