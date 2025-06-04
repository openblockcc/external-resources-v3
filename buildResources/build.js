/**
 * build.js - Auto build script for specially marked JS files using webpack
 *
 * This script scans the `extensions` and `devices` directories under the project root
 * for JavaScript files that contain the marker comment `// @webpack-build`.
 * Each of these files is then individually bundled using webpack,
 * with the output written to the same directory as the source file,
 * using the filename format: <originalName>.bundle.js
 */

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const projectRoot = path.resolve(__dirname, '..');
const sourceDirs = [
    path.join(projectRoot, 'extensions'),
    path.join(projectRoot, 'devices')
];

/**
 * Recursively scans a directory for JavaScript files that contain
 * the special marker comment `// @webpack-build`.
 *
 * @param {string} dir - The directory to scan.
 * @returns {string[]} - A list of full file paths matching the criteria.
 */
const scanFiles = dir => {
    const results = [];
    if (!fs.existsSync(dir)) return results;

    const entries = fs.readdirSync(dir, {withFileTypes: true});
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            results.push(...scanFiles(fullPath));
        } else if (entry.isFile() && entry.name.endsWith('.js')) {
            const content = fs.readFileSync(fullPath, 'utf-8');
            if (content.includes('// @webpack-build')) {
                results.push(fullPath);
            }
        }
    }

    return results;
};

/**
 * Creates a webpack configuration object for a given JavaScript file.
 *
 * @param {string} entryPath - The full path of the source file.
 * @returns {object} - A webpack configuration object.
 */
const createWebpackConfig = entryPath => {
    const outputPath = path.dirname(entryPath);
    const outputFilename = `${path.basename(entryPath, '.js')}.bundle.js`;

    return {
        mode: 'production',
        entry: entryPath,
        output: {
            path: outputPath,
            filename: outputFilename
        },
        target: 'web',
        stats: 'errors-warnings'
    };
};

/**
 * Runs webpack to bundle a given JavaScript file.
 *
 * @param {string} entryPath - The source file to bundle.
 */
const buildFile = entryPath => {
    const config = createWebpackConfig(entryPath);
    const compiler = webpack(config);

    compiler.run((err, stats) => {
        if (err) {
            console.error(err);
        } else {
            process.stdout.write(`${stats.toString({colors: true})}\n`);
            const outputFile = path.join(config.output.path, config.output.filename);
            console.log(`${entryPath} => ${outputFile}\n`);
        }
    });
};

// Scan and build all matching files
const files = sourceDirs.flatMap(scanFiles);
if (files.length === 0) {
    console.log('No files marked with // @webpack-build were found.');
} else {
    files.forEach(buildFile);
}
