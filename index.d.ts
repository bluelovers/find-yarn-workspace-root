/**
 * Adapted from:
 * https://github.com/yarnpkg/yarn/blob/ddf2f9ade211195372236c2f39a75b00fa18d4de/src/config.js#L612
 * @param {string} [initial]
 * @return {string|null}
 */
declare function findWorkspaceRoot(initial?: string): string;
declare namespace findWorkspaceRoot {
    var findWorkspaceRoot: typeof findWorkspaceRoot;
    var readPackageJSON: typeof readPackageJSON;
    var extractWorkspaces: typeof extractWorkspaces;
    var default: typeof findWorkspaceRoot;
}
declare function extractWorkspaces<T extends string[]>(manifest: {
    workspaces?: {
        packages: T;
    };
}): T;
declare function extractWorkspaces<T extends string[]>(manifest: {
    workspaces?: T;
}): T;
declare function readPackageJSON<T extends {
    workspaces?: any;
}>(dir: string): T;
export = findWorkspaceRoot;
