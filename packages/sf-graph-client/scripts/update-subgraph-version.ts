import { program } from 'commander';
import { readFileSync, writeFileSync } from 'fs';
import { dump, load } from 'js-yaml';

const arrowedNetworks = [
    'development',
    'development-arb',
    'development-ava',
    'staging',
    'staging-arb',
    'staging-ava',
    'sepolia',
    'mainnet',
    'arbitrum-sepolia',
    'arbitrum-one',
    'avalanche-mainnet',
    'polygon-zkevm-mainnet',
] as const;
type Network = (typeof arrowedNetworks)[number];

class Main {
    private network: Network;
    private label: string;

    constructor(network: Network, label: string) {
        if (!label) {
            console.error('error: label is empty.');
            process.exit(1);
        }

        if (!arrowedNetworks.includes(network as Network)) {
            console.error('error: invalid network:', network);
            process.exit(1);
        }

        this.label = label;
        this.network = network;
    }

    run() {
        const path = `${process.cwd()}/src/graphclients/${
            this.network
        }/.graphclientrc.yml`;
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

program.option('--network <name>', 'network name');
program.option('--label <name>', 'subgraph version label');
program.parse(process.argv);
const { network, label } = program.opts();

new Main(network, label).run();
