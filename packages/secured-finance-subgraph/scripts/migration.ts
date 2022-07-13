import { execSync } from 'child_process';
import {
    existsSync,
    mkdirSync,
    readFileSync,
    rmdirSync,
    writeFileSync
} from 'fs';
import { dump, load } from 'js-yaml';

const destinationContracts: string[] = [
    // Contracts
    'CloseOutNetting',
    'CollateralAggregatorV2',
    'CollateralVault',
    'CrosschainAddressResolver',
    'CurrencyController',
    'LendingMarketController',
    'Liquidations',
    'MarkToMarket',
    'PaymentAggregator',
    'ProductAddressResolver',
    'SettlementEngine',
    'TermStructure',
    // Product contracts
    'LoanV2',
];

const envShorthand: { [key: string]: string } = {
    development: 'dev',
    staging: 'stg',
    production: 'prd',
};

class Main {
    private environment: string;
    private contractFolderDir: string;
    private outputDir: string;
    private arrowedEnvironments = ['development', 'staging', 'production'];
    private subgraphYamlFile: string;

    constructor(environment: string) {
        if (!this.arrowedEnvironments.includes(environment)) {
            console.error('Invalid environment:', environment);
            process.exit(1);
        }

        this.environment = environment;
    }

    run() {
        this.init();
        this.migrate();
        this.updateDataSources();
    }

    private init() {
        const cwd = process.cwd();

        this.contractFolderDir = `${cwd}/node_modules/@secured-finance/smart-contracts/deployments/${this.environment}`;
        this.outputDir = `${cwd}/src`;
        this.subgraphYamlFile = `${this.outputDir}/${this.environment}/subgraph.yaml`;
    }

    private migrate() {
        let isDeployed = existsSync(this.subgraphYamlFile);

        if (isDeployed) {
            rmdirSync(`${this.outputDir}/${this.environment}`, {
                recursive: true,
            });
        }
        mkdirSync(this.outputDir, { recursive: true });

        destinationContracts.map((contract, idx) => {
            const contractFile = `${this.contractFolderDir}/${contract}.json`;
            const deployment = JSON.parse(readFileSync(contractFile, 'utf8'));

            if (idx === 0) {
                execSync(`
                    graph init \
                    --product subgraph-studio \
                    --protocol ethereum \
                    --network rinkeby \
                    --from-contract ${deployment.implementation} \
                    --contractName ${contract} \
                    --abi ${contractFile} \
                    sf-protocol-${envShorthand[this.environment]} \
                    ${this.outputDir}/${this.environment}
                `);
                rmdirSync(`${this.outputDir}/${this.environment}/.git/`, {
                    recursive: true,
                });
                process.chdir(`${this.outputDir}/${this.environment}`);
            } else {
                execSync(`
                    graph add ${deployment.implementation} ${this.subgraphYamlFile} \
                    --contractName ${contract} \
                    --abi ${contractFile} \
                    --network-file ${this.outputDir}/${this.environment}/networks.json \
                `);
            }

            console.log(contract, deployment.implementation);
        });
    }

    private updateDataSources() {
        const yamlText = readFileSync(this.subgraphYamlFile, 'utf8');
        const data = load(yamlText) as any;

        data.dataSources.forEach((data: any) => {
            const contractFile = `${this.contractFolderDir}/${data.name}.json`;
            const deployment = JSON.parse(readFileSync(contractFile, 'utf8'));
            const proxyAddress = deployment.address;
            const blockNumber = deployment.receipt.blockNumber;

            data.source.address = proxyAddress;
            data.source.startBlock = blockNumber;
        });

        const newYamlText = dump(data);

        writeFileSync(this.subgraphYamlFile, newYamlText, 'utf8');
    }
}

const [, , environment] = process.argv;
new Main(environment).run();
