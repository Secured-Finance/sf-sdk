import {
    CollateralVaultItem,
    CollateralVaults,
    collateralVaults,
} from './lib/collateral-vaults';
import {
    LendingMarketItem,
    LendingMarkets,
    lendingMarkets,
} from './lib/lending-markets';
import { addresses, ContractAddresses } from './lib/addresses';
import { CollateralVault, contracts, LendingMarket } from './contracts';
import { SignerOrProvider } from './utils';

export class ContractsInstance {
    addresses: ContractAddresses;
    lendingMarkets: LendingMarkets = {};
    collateralVaults: CollateralVaults = {};
    [contract: string]: any;

    constructor(signerOrProvider: SignerOrProvider, networkId?: number) {
        this.addresses = addresses[networkId];
        const contractForEnv = contracts;

        Object.keys(contractForEnv).forEach(contract => {
            const Contract = contractForEnv[contract];
            this[contract] = new Contract(signerOrProvider, networkId);
        });

        collateralVaults[networkId].forEach((vault: CollateralVaultItem) => {
            const address = vault.address;

            this.collateralVaults[address] = {
                ccy: vault.ccy,
                address: address,
                tokenAddress: vault.tokenAddress,
                contract: new CollateralVault(
                    vault.ccy,
                    signerOrProvider,
                    networkId
                ),
            };
        });

        lendingMarkets[networkId].map((marketItem: LendingMarketItem) => {
            let market = Object.assign(
                {
                    contract: new LendingMarket(
                        marketItem.ccy,
                        marketItem.term,
                        signerOrProvider,
                        networkId
                    ),
                },
                marketItem
            ) as LendingMarketItem;

            this.lendingMarkets[marketItem.address] = market;
        });
    }
}
