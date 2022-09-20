// import { cpSync, existsSync, mkdirSync, rmSync } from 'fs';
import { glob, runTypeChain } from 'typechain';

class Main {
    async run() {
        const cwd = process.cwd();
        const modulePath = require
            .resolve('@secured-finance/smart-contracts/package.json')
            .replace('/package.json', '');

        const allFiles = glob(cwd, [
            `${modulePath}/build/contracts/**.sol/+([a-zA-Z0-9_]).json`,
            `${modulePath}/build/contracts/mocks/tokens/**.sol/+([a-zA-Z0-9_]).json`,
        ]);

        await runTypeChain({
            cwd,
            filesToProcess: allFiles,
            allFiles,
            outDir: 'src/types',
            target: 'ethers-v5',
            flags: {
                alwaysGenerateOverloads: false,
                discriminateTypes: false,
                tsNocheck: true,
                environment: 'hardhat',
            },
        });
    }
}

new Main().run();
