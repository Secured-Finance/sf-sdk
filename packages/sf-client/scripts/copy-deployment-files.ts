import {
    existsSync,
    mkdirSync,
    readFileSync,
    readdirSync,
    rmSync,
    unlinkSync,
    writeFileSync,
} from 'fs';
import { contractsList } from './constants';

const DEFAULT_NETWORK = 'development';

class Main {
    run() {
        const rootDir = process.cwd();
        const moduleDir = require
            .resolve('@secured-finance/contracts/package.json')
            .replace('/package.json', '/deployments');
        const deploymentDir = `${rootDir}/src/deployments`;

        if (existsSync(deploymentDir)) {
            rmSync(deploymentDir, { recursive: true });
        }
        mkdirSync(deploymentDir);

        this.extractAddressesFromDeployments(moduleDir, deploymentDir);
        this.writeTsFiles(deploymentDir);
    }

    private extractAddressesFromDeployments(
        moduleDir: string,
        deploymentDir: string
    ) {
        const networks = readdirSync(moduleDir);

        for (const network of networks) {
            for (const contract of contractsList) {
                const file = `${contract}.json`;
                const modulePath = `${moduleDir}/${network}/${file}`;
                const filePath = `${deploymentDir}/${file}`;
                this.extractAddressAndABI(modulePath, filePath, network);
            }
        }
    }

    private extractAddressAndABI(
        modulePath: string,
        filePath: string,
        network: string
    ) {
        let addresses: Record<string, any> = {};
        let abi: Record<string, any> = [];

        if (existsSync(filePath)) {
            const fileContent = readFileSync(filePath, 'utf-8');
            ({ addresses, abi } = JSON.parse(fileContent));
            rmSync(filePath);
        }

        if (existsSync(modulePath)) {
            const moduleContent = readFileSync(modulePath, 'utf-8');
            const { address: newAddress, abi: newAbi } =
                JSON.parse(moduleContent);

            addresses[network] = newAddress;
            abi = network === DEFAULT_NETWORK ? newAbi : abi;
        } else {
            addresses[network] = null;
        }

        writeFileSync(filePath, JSON.stringify({ addresses, abi }, null, 2));
    }

    private writeTsFiles(deploymentDir: string) {
        const files = readdirSync(deploymentDir);

        for (const file of files) {
            const filePath = `${deploymentDir}/${file}`;
            const fileContent = readFileSync(filePath, 'utf-8');
            const { addresses, abi } = JSON.parse(fileContent);

            const addressStr =
                'export const addresses = ' +
                JSON.stringify(addresses, null, 2) +
                ';';
            const abitr =
                'export const abi = ' +
                JSON.stringify(abi, null, 2) +
                ' as const;';
            const newContent = addressStr + '\n' + '\n' + abitr;

            writeFileSync(filePath.replace('.json', '.ts'), newContent);
            unlinkSync(filePath);
        }
    }
}

new Main().run();
