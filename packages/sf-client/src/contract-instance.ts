import { Signer } from 'ethers';
import { BaseProvider } from '@ethersproject/providers';

import {
    CollateralVaultItem,
    CollateralVaults,
    collateralVaults,
} from './lib/collateral-vaults';
import {
    LendingMarketItem,
    LendingMarkets,
    lendingMarkets,
    Market,
} from './lib/lending-markets';
import { addresses, ContractAddresses } from './lib/addresses';
import { CollateralVault, contracts, LendingMarket } from './contracts';

export class ContractsInstance {
    addresses: ContractAddresses;
    lendingMarkets: LendingMarkets = {};
    collateralVaults: CollateralVaults = {};
    [contract: string]: any;

    async init(
        signerOrProvider: Signer | BaseProvider,
        networkId?: number
    ): Promise<void> {
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
                    this.wallet || this.provider,
                    networkId
                ),
            };
        });

        lendingMarkets[networkId].map((marketItem: LendingMarketItem) => {
            let markets;

            marketItem.markets.map((lendingMarket: Market) => {
                markets = {
                    term: lendingMarket.term,
                    termIndex: lendingMarket.termIndex,
                    address: lendingMarket.address,
                    contract: new LendingMarket(
                        marketItem.ccy,
                        lendingMarket.term,
                        this.wallet || this.provider,
                        networkId
                    ),
                };
            });

            this.lendingMarkets[marketItem.ccy] = {
                ccy: marketItem.ccy,
                markets: markets,
            };
        });
    }
}
