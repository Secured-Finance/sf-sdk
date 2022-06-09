import { utils } from 'ethers/lib/ethers';
import { GasPriceOracle } from 'gas-price-oracle';
import {
    DEFAULT_GAS_PRICES,
    estimateGasPrice,
    GasPrices,
    getDefaultOracle,
} from './gas';
import assert = require('assert');
const { should } = require('chai');
should();

const parseGwei = (price: string): string => {
    return utils.parseUnits(price, 'gwei').toString();
};

describe('Test gas prices oracle', function () {
    let gasOracle: GasPriceOracle;
    let fallbackGasPrices: GasPrices;

    const mainnetNetworkID = 1;
    const ropstenNetworkID = 3;

    it('Try to check mainnet gas prices', async () => {
        fallbackGasPrices = DEFAULT_GAS_PRICES[mainnetNetworkID];
        gasOracle = getDefaultOracle(mainnetNetworkID);

        const gas = await gasOracle.fetchGasPricesOffChain();
        gas.instant.should.be.a('number');
        gas.fast.should.be.a('number');
        gas.standard.should.be.a('number');
        gas.low.should.be.a('number');
    });

    it('Try to check ropsten gas prices', async () => {
        fallbackGasPrices = DEFAULT_GAS_PRICES[ropstenNetworkID];
        gasOracle = getDefaultOracle(ropstenNetworkID);

        let gasPrice = await estimateGasPrice(
            'fast',
            gasOracle,
            fallbackGasPrices
        );
        await assert.equal(
            gasPrice.toString(),
            parseGwei(fallbackGasPrices.fast.toString())
        );

        gasPrice = await estimateGasPrice('low', gasOracle, fallbackGasPrices);
        await assert.equal(
            gasPrice.toString(),
            parseGwei(fallbackGasPrices.low.toString())
        );

        gasPrice = await estimateGasPrice(
            'standard',
            gasOracle,
            fallbackGasPrices
        );
        await assert.equal(
            gasPrice.toString(),
            parseGwei(fallbackGasPrices.standard.toString())
        );

        gasPrice = await estimateGasPrice(
            'instant',
            gasOracle,
            fallbackGasPrices
        );
        await assert.equal(
            gasPrice.toString(),
            parseGwei(fallbackGasPrices.instant.toString())
        );
    });
});
