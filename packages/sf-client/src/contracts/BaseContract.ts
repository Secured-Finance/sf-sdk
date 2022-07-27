/* eslint-disable no-console */
import type { BaseContract as EthersBaseContract } from 'ethers';

export abstract class BaseContract<T extends EthersBaseContract> {
    contract: T;

    constructor(contract: T) {
        this.contract = contract;
    }

    static async getAddress(contractName: string, network: string) {
        let deploymentPath: string;

        switch (process.env.SF_ENV) {
            case 'development':
                deploymentPath = 'development';
                if (network !== 'rinkeby') {
                    console.warn(`${network} is not a supported network.`);
                }
                break;

            case 'staging':
                deploymentPath = 'staging';
                if (network !== 'rinkeby') {
                    console.warn(`${network} is not a supported network.`);
                }
                break;

            case 'production':
            default:
                // TODO: Set the deploymentPath depending on a target network for production environment.
                // It will be the following.
                //
                // if (network === 'mainnet') {
                //     deploymentPath = 'mainnet';
                // } else if(network === 'rinkeby') {
                //     deploymentPath = 'rinkeby';
                // }
                //     :
                break;
        }

        const deployment = await import(
            `@secured-finance/smart-contracts/deployments/${deploymentPath}/${contractName}.json`
        );

        return deployment.address;
    }
}

export default BaseContract;
