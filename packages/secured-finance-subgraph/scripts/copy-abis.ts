import { cpSync, existsSync, mkdirSync, rmSync } from 'fs';

class Main {
    run() {
        const rootDir = process.cwd();
        const modulePath = require
            .resolve('@secured-finance/smart-contracts/package.json')
            .replace('/package.json', '');

        const abiDir = `${rootDir}/abis`;
        if (existsSync(abiDir)) {
            rmSync(abiDir, { recursive: true });
        }
        mkdirSync(abiDir);

        cpSync(`${modulePath}/build/contracts/`, abiDir, {
            recursive: true,
        });
    }
}

new Main().run();
