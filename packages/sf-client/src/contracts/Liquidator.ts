import { Currency } from '@secured-finance/sf-core';
import { Hex } from 'viem';
import { getLiquidatorContract } from '../contracts';
import { BaseContract } from './BaseContract';

export class Liquidator extends BaseContract {
    async executeLiquidationCall(
        collateralCcy: Currency,
        collateralMaturities: number[],
        debtCcy: Currency,
        debtMaturity: number,
        account: string,
        poolFee: number
    ) {
        const [address] = await this.walletClient.getAddresses();
        const contract = getLiquidatorContract(this.config.env);
        const mappedCollateralMaturities = collateralMaturities.map(
            collateralMaturity => BigInt(collateralMaturity)
        );

        const estimatedGas = await this.publicClient.estimateContractGas({
            ...contract,
            account: address,
            functionName: 'executeLiquidationCall',
            args: [
                this.convertCurrencyToBytes32(collateralCcy),
                mappedCollateralMaturities,
                this.convertCurrencyToBytes32(debtCcy),
                BigInt(debtMaturity),
                account as Hex,
                poolFee,
            ],
        });
        return this.walletClient.writeContract({
            ...contract,
            account: address,
            chain: this.config.chain,
            functionName: 'executeLiquidationCall',
            args: [
                this.convertCurrencyToBytes32(collateralCcy),
                mappedCollateralMaturities,
                this.convertCurrencyToBytes32(debtCcy),
                BigInt(debtMaturity),
                account as Hex,
                poolFee,
            ],
            gas: this.calculateAdjustedGas(estimatedGas),
        });
    }
}
