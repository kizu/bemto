const concat = require('concat-files'),
    { readdirSync, readFileSync, writeFileSync } = require('fs');

const files = readdirSync(`./lib/`).map((fileName) => `./lib/${fileName}`),
      targetName = 'bemto_webpack.pug',
      targetPath = `./${targetName}`;

concat(files,
    targetPath,
    (error) => {
        if (error) {
            console.error('\x1b[31m', error, '\x1b[0m')
            process.exit(1)
        }
        console.log('\x1b[32m', 'Concat done (1/2)', '\x1b[0m');
        removeImports()
    }
);

function removeImports() {
    const file = readFileSync(targetPath).toString(),
          lines = file.split('\n'),
          filteredLines = lines.filter((line) =>
            !line.includes('include')
          );
    writeFileSync(targetPath, filteredLines.join('\n'));
    console.log('\x1b[32m', 'Remove imports done (2/2)', '\x1b[0m');
}