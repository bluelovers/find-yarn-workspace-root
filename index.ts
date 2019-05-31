'use strict';

import fs = require('fs');
import micromatch = require('micromatch');
import path = require('path');
import pkgDir = require('pkg-dir');

/**
 * Adapted from:
 * https://github.com/yarnpkg/yarn/blob/ddf2f9ade211195372236c2f39a75b00fa18d4de/src/config.js#L612
 * @param {string} [initial]
 * @return {string|null}
 */
function findWorkspaceRoot(initial?: string): string
{
	if (!initial)
	{
		initial = process.cwd();
	}

	initial = path.normalize(pkgDir.sync(initial));

	let previous: string = null;
	let current: string = initial;

	do
	{
		const manifest = readPackageJSON(current);
		const workspaces = extractWorkspaces(manifest);

		if (workspaces)
		{
			const relativePath = path.relative(current, initial);
			if (relativePath === '' || matchWorkspaces(relativePath, workspaces))
			{
				return current;
			}
			else
			{
				return null;
			}
		}

		previous = current;
		current = path.dirname(current);
	}
	while (current !== previous);

	return null;
}

function matchWorkspaces(relativePath: string, workspaces: string[])
{
	return micromatch([relativePath], workspaces).length > 0
}

function extractWorkspaces<T extends string[]>(manifest: {
	workspaces?: {
		packages: T
	}
}): T
function extractWorkspaces<T extends string[]>(manifest: {
	workspaces?: T
}): T
function extractWorkspaces(manifest: {
	workspaces?: any
})
{
	const workspaces = (manifest || {}).workspaces;
	return (workspaces && workspaces.packages) || (Array.isArray(workspaces) ? workspaces : null);
}

function readPackageJSON<T extends {
	workspaces?: any
}>(dir: string): T
{
	const file = path.join(dir, 'package.json');
	if (fs.existsSync(file))
	{
		return JSON.parse(fs.readFileSync(file, 'utf8'));
	}
	return null;
}

findWorkspaceRoot.findWorkspaceRoot = findWorkspaceRoot;
findWorkspaceRoot.readPackageJSON = readPackageJSON;
findWorkspaceRoot.extractWorkspaces = extractWorkspaces;
findWorkspaceRoot.matchWorkspaces = matchWorkspaces;
findWorkspaceRoot.default = findWorkspaceRoot;

Object.freeze(findWorkspaceRoot);

export = findWorkspaceRoot;
