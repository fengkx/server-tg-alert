const { build } = require('esbuild')

build({
    entryPoints: ['./main.ts'],
    outfile: './dist/main.js',
    // minify: true,
    bundle: true,
    target: 'es2020',
    platform: 'node',
    external: ['osx-temperature-sensor']
}).catch(() => process.exit(1))


build({
    entryPoints: ['./action/index.ts'],
    outfile: './dist/action.js',
    // minify: true,
    bundle: true,
    target: 'es2020',
    platform: 'node',
    external: ['osx-temperature-sensor', 'encoding']
}).catch(() => process.exit(1))

