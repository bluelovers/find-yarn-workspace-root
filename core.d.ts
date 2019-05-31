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
    var isMatchWorkspaces: typeof isMatchWorkspaces;
    var default: typeof findWorkspaceRoot;
}
export default findWorkspaceRoot;
export declare function checkWorkspaces(current: string, initial: string): {
    done: boolean;
    found: string;
    relativePath: string;
};
export declare function isMatchWorkspaces(relativePath: string, workspaces: string[]): boolean;
export declare function extractWorkspaces<T extends string[]>(manifest: {
    workspaces?: {
        packages: T;
    };
}): T;
export declare function extractWorkspaces<T extends string[]>(manifest: {
    workspaces?: T;
}): T;
export declare function readPackageJSON<T extends {
    workspaces?: any;
}>(dir: string): T;
export default findWorkspaceRoot;
