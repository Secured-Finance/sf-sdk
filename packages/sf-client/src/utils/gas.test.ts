import { utils } from 'ethers/lib/ethers';
import { GasPriceOracle } from 'gas-price-oracle';
import {
    DEFAULT_GAS_PRICES,
    estimateGasPrice,
    GasPrices,
    getDefaultOracle,
} from './gas';

const parseGwei = (price: string): string => {
    return utils.parseUnits(price, 'gwei').toString();
};

describe('Test gas prices oracle', function () {
    let gasOracle: GasPriceOracle;
    let fallbackGasPrices: GasPrices;

    const ropstenNetworkID = 3;

    it('Try to check ropsten gas prices', async () => {
        fallbackGasPrices = DEFAULT_GAS_PRICES[ropstenNetworkID];
        gasOracle = getDefaultOracle(ropstenNetworkID);

        let gasPrice = await estimateGasPrice(
            'fast',
            gasOracle,
            fallbackGasPrices
        );
        expect(gasPrice.toString()).toEqual(
            parseGwei(fallbackGasPrices.fast.toString())
        );

        gasPrice = await estimateGasPrice('low', gasOracle, fallbackGasPrices);
        expect(gasPrice.toString()).toEqual(
            parseGwei(fallbackGasPrices.low.toString())
        );

        gasPrice = await estimateGasPrice(
            'standard',
            gasOracle,
            fallbackGasPrices
        );
        expect(gasPrice.toString()).toEqual(
            parseGwei(fallbackGasPrices.standard.toString())
        );

        gasPrice = await estimateGasPrice(
            'instant',
            gasOracle,
            fallbackGasPrices
        );
        expect(gasPrice.toString()).toEqual(
            parseGwei(fallbackGasPrices.instant.toString())
        );
    });
});
