import {
    cpSync,
    existsSync,
    mkdirSync,
    readdirSync,
    readFileSync,
    rmSync,
    statSync,
    unlinkSync,
    writeFileSync,
} from 'fs';
import { contractsList } from '../contractsList';

function extractAddressAndABI(filePath: string) {
    const fileContent = readFileSync(filePath, 'utf-8');
    const contractData = JSON.parse(fileContent);
    const { address, abi } = contractData;
    const addressStr = address
        ? 'export const address = ' + JSON.stringify(address, null, 2) + ';'
        : '';
    const abiStr = abi
        ? 'export const abi = ' + JSON.stringify(abi, null, 2) + ' as const;'
        : '';
    const newContent =
        addressStr && abiStr ? addressStr + '\n' + '\n' + abiStr : '';
    writeFileSync(filePath.replace('.json', '.ts'), newContent);
}

function extractAddressesFromDeployments(deploymentDir: string) {
    const files = readdirSync(deploymentDir);
    for (const file of files) {
        const filePath = `${deploymentDir}/${file}`;
        const stat = statSync(filePath);
        if (stat.isDirectory()) {
            extractAddressesFromDeployments(filePath);
        } else {
            contractsList.every(value => {
                if (filePath.includes(value)) {
                    extractAddressAndABI(filePath);
                    return false;
                }
                return true;
            });
            unlinkSync(filePath);
        }
    }
}

class Main {
    run() {
        const rootDir = process.cwd();
        const modulePath = require
            .resolve('@secured-finance/contracts/package.json')
            .replace('/package.json', '');

        const deploymentDir = `${rootDir}/src/deployments`;
        if (existsSync(deploymentDir)) {
            rmSync(deploymentDir, { recursive: true });
        }
        mkdirSync(deploymentDir);

        cpSync(`${modulePath}/deployments/`, deploymentDir, {
            recursive: true,
        });

        extractAddressesFromDeployments(deploymentDir);
    }
}

new Main().run();
