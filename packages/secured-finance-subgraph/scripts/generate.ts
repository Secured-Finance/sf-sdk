import { readFileSync, writeFileSync } from 'fs';
import { dump, load } from 'js-yaml';

const arrowedEnvironments = ['development', 'staging', 'production'] as const;
const arrowedNetworks = ['goerli', 'mainnet'] as const;
type Environment = typeof arrowedEnvironments[number];
type Network = typeof arrowedNetworks[number];

class Main {
    private environment: Environment;
    private network: Network;

    constructor(environment: any, network: any) {
        if (!arrowedEnvironments.includes(environment)) {
            console.error('Invalid environment:', environment);
            process.exit(1);
        }

        if (!arrowedNetworks.includes(network)) {
            console.error('Invalid network:', network);
            process.exit(1);
        }

        this.environment = environment;
        this.network = network;
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
            dataSource.source.address = proxyAddress;
            dataSource.network = this.network;
        }

        const newYamlText = dump(data);

        writeFileSync(
            `${rootDir}/subgraph.${this.environment}.yaml`,
            newYamlText,
            'utf8'
        );
    }
}

const [, , environment, network] = process.argv;
new Main(environment, network).run();
