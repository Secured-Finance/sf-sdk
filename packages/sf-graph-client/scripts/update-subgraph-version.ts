import { program } from 'commander';
import { readFileSync, writeFileSync } from 'fs';
import { dump, load } from 'js-yaml';

const arrowedEnvironments = ['development', 'staging', 'production'] as const;
const arrowedNetworks = ['sepolia', 'mainnet'] as const;
type Environment = (typeof arrowedEnvironments)[number];
type Network = (typeof arrowedNetworks)[number];

class Main {
    private environment: Environment;
    private network: Network;
    private label: string;

    constructor(environment: string, network: Network, label: string) {
        if (!label) {
            console.error('error: label is empty.');
            process.exit(1);
        }

        if (!arrowedEnvironments.includes(environment as Environment)) {
            console.error('error: invalid environment:', environment);
            process.exit(1);
        }

        if (!arrowedNetworks.includes(network as Network)) {
            console.error('error: invalid network:', network);
            process.exit(1);
        }

        this.environment = environment as Environment;
        this.label = label;
        this.network = Network;
    }

    run() {
        const networkName =
            this.environment === 'development' || this.environment === 'staging'
                ? this.environment
                : this.network;
        const path = `${process.cwd()}/src/graphclients/${networkPath}/.graphclientrc.yml`;
        const yamlText = readFileSync(path, 'utf8');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = load(yamlText) as any;

        for (const source of data.sources) {
            const endpoint: string = source.handler.graphql.endpoint;
            const path = endpoint.substring(0, endpoint.lastIndexOf('/') + 1);
            source.handler.graphql.endpoint = path + this.label;
        }

        const newYamlText = dump(data);

        writeFileSync(path, newYamlText, 'utf8');
    }
}

program.option('--environment <name>', 'environment name');
program.option('--label <name>', 'subgraph version label');

program.parse(process.argv);
const { environment, label } = program.opts();

new Main(environment, label).run();
