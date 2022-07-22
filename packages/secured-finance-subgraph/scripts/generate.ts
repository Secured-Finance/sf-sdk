import { readFileSync, writeFileSync } from 'fs';
import { dump, load } from 'js-yaml';

class Main {
    private environment: string;
    private arrowedEnvironments = ['development', 'staging', 'production'];

    constructor(environment: string) {
        if (!this.arrowedEnvironments.includes(environment)) {
            console.error('Invalid environment:', environment);
            process.exit(1);
        }
        this.environment = environment;
    }

    async run() {
        const rootDir = process.cwd();
        const yamlText = readFileSync(`${rootDir}/subgraph.yaml`, 'utf8');
        const data = load(yamlText) as any;

        for (const dataSource of data.dataSources) {
            const deployment = await import(
                `@secured-finance/smart-contracts/deployments/${this.environment}/${dataSource.name}.json`
            );

            const proxyAddress = deployment.address;
            const blockNumber = deployment.receipt.blockNumber;

            dataSource.source.address = proxyAddress;
            dataSource.source.startBlock = blockNumber;
        }

        const newYamlText = dump(data);

        writeFileSync(
            `${rootDir}/subgraph.${this.environment}.yaml`,
            newYamlText,
            'utf8'
        );
    }
}

const [, , environment] = process.argv;
new Main(environment).run();
