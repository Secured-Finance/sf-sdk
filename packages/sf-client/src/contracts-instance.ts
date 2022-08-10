import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import {
    BaseContractStatic,
    CloseOutNetting,
    CollateralAggregator,
    CollateralVault,
    contracts,
    CrosschainAddressResolver,
    CurrencyController,
    LendingMarketController,
    Loan,
    MarkToMarket,
    PaymentAggregator,
    ProductAddressResolver,
    SettlementEngine,
    TermStructure,
} from './contracts';
import { LendingMarkets, LENDING_MARKETS } from './lib/lending-markets';
import { NetworkName } from './utils';

export class ContractsInstance {
    protected lendingMarkets: LendingMarkets | null = null;
    protected collateralAggregator: CollateralAggregator | null = null;
    protected collateralVault: CollateralVault | null = null;
    protected loan: Loan | null = null;
    protected lendingMarketController: LendingMarketController | null = null;
    protected currencyController: CurrencyController | null = null;
    protected closeOutNetting: CloseOutNetting | null = null;
    protected paymentAggregator: PaymentAggregator | null = null;
    protected productAddressResolver: ProductAddressResolver | null = null;
    protected markToMarket: MarkToMarket | null = null;
    protected termStructure: TermStructure | null = null;
    protected crosschainAddressResolver: CrosschainAddressResolver | null =
        null;
    protected settlementEngine: SettlementEngine | null = null;

    async getInstances(
        signerOrProvider: Signer | Provider,
        network: NetworkName
    ) {
        for (const key in contracts) {
            if (Object.prototype.hasOwnProperty.call(contracts, key)) {
                const Contract = contracts[key] as BaseContractStatic;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                this[key] = await Contract.getInstance(
                    signerOrProvider,
                    network
                );
            }
        }

        this.lendingMarkets = new LendingMarkets(
            LENDING_MARKETS,
            signerOrProvider,
            network
        );
    }
}
