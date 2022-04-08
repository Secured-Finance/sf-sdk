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
import {
    CloseOutNetting,
    CollateralAggregator,
    CollateralVault,
    contracts,
    CrosschainAddressResolver,
    CurrencyController,
    LendingMarket,
    LendingMarketController,
    Loan,
    MarkToMarket,
    PaymentAggregator,
    ProductAddressResolver,
    TermStructure,
} from './contracts';
import { Signer } from 'ethers';
import { Provider } from '@ethersproject/providers';

export class ContractsInstance {
    addresses: ContractAddresses;
    lendingMarkets: LendingMarkets = {};
    collateralVaults: CollateralVaults = {};
    collateralAggregator: CollateralAggregator;
    loan: Loan;
    lendingMarketController: LendingMarketController;
    currencyController: CurrencyController;
    closeOutNetting: CloseOutNetting;
    paymentAggregator: PaymentAggregator;
    productAddressResolver: ProductAddressResolver;
    markToMarket: MarkToMarket;
    termStructure: TermStructure;
    crosschainAddressResolver: CrosschainAddressResolver;

    constructor(signerOrProvider: Signer | Provider, networkId?: number) {
        this.addresses = addresses[networkId];
        const contractForEnv = contracts;

        Object.keys(contractForEnv).forEach(contract => {
            const Contract = contractForEnv[contract];
            // @ts-ignore
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
