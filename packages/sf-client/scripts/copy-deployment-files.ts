import { cpSync, existsSync, mkdirSync, rmSync } from 'fs';

class Main {
    run() {
        const rootDir = process.cwd();
        const modulePath = require
            .resolve('@secured-finance/smart-contracts/package.json')
            .replace('/package.json', '');

        const deploymentDir = `${rootDir}/src/deployments`;
        if (existsSync(deploymentDir)) {
            rmSync(deploymentDir, { recursive: true });
        }
        mkdirSync(deploymentDir);

        cpSync(`${modulePath}/deployments/`, deploymentDir, {
            recursive: true,
        });
    }
}

new Main().run();
