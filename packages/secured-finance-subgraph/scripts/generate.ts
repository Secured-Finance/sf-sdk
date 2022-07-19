import {
  readFileSync, writeFileSync
} from 'fs';
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

  run() {
    const rootDir = process.cwd();
    const contractFolderDir = `${rootDir}/node_modules/@secured-finance/smart-contracts/deployments/${this.environment}`;

    const yamlText = readFileSync(`${rootDir}/subgraph.yaml`, 'utf8');
    const data = load(yamlText) as any;

    data.dataSources.forEach((data: any) => {
        const contractFile = `${contractFolderDir}/${data.name}.json`;
        const deployment = JSON.parse(readFileSync(contractFile, 'utf8'));
        const proxyAddress = deployment.address;
        const blockNumber = deployment.receipt.blockNumber;

        data.source.address = proxyAddress;
        data.source.startBlock = blockNumber;
    });

    const newYamlText = dump(data);

    writeFileSync(`${rootDir}/subgraph.${this.environment}.yaml`, newYamlText, 'utf8');
  }
}

const [, , environment] = process.argv;
new Main(environment).run();