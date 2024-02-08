[@secured-finance/sf-client](../README.md) / [Exports](../modules.md) / SecuredFinanceClient

# Class: SecuredFinanceClient

## Table of contents

### Constructors

- [constructor](SecuredFinanceClient.md#constructor)

### Properties

- [\_config](SecuredFinanceClient.md#_config)
- [\_publicClient](SecuredFinanceClient.md#_publicclient)
- [\_tokenVault](SecuredFinanceClient.md#_tokenvault)
- [\_walletClient](SecuredFinanceClient.md#_walletclient)

### Accessors

- [config](SecuredFinanceClient.md#config)
- [publicClient](SecuredFinanceClient.md#publicclient)
- [tokenVault](SecuredFinanceClient.md#tokenvault)
- [walletClient](SecuredFinanceClient.md#walletclient)

### Methods

- [approveTokenTransfer](SecuredFinanceClient.md#approvetokentransfer)
- [calculateAdjustedGas](SecuredFinanceClient.md#calculateadjustedgas)
- [cancelLendingOrder](SecuredFinanceClient.md#cancellendingorder)
- [convert](SecuredFinanceClient.md#convert)
- [convertCurrencyArrayToBytes32Array](SecuredFinanceClient.md#convertcurrencyarraytobytes32array)
- [convertCurrencyToBytes32](SecuredFinanceClient.md#convertcurrencytobytes32)
- [convertToBaseCurrency](SecuredFinanceClient.md#converttobasecurrency)
- [currencyExists](SecuredFinanceClient.md#currencyexists)
- [depositCollateral](SecuredFinanceClient.md#depositcollateral)
- [executeEmergencySettlement](SecuredFinanceClient.md#executeemergencysettlement)
- [executeLiquidationCall](SecuredFinanceClient.md#executeliquidationcall)
- [executeRedemption](SecuredFinanceClient.md#executeredemption)
- [executeRepayment](SecuredFinanceClient.md#executerepayment)
- [getBestBorrowUnitPrices](SecuredFinanceClient.md#getbestborrowunitprices)
- [getBestLendUnitPrices](SecuredFinanceClient.md#getbestlendunitprices)
- [getBorrowOrderBook](SecuredFinanceClient.md#getborroworderbook)
- [getCollateralCurrencies](SecuredFinanceClient.md#getcollateralcurrencies)
- [getCurrencies](SecuredFinanceClient.md#getcurrencies)
- [getDecimals](SecuredFinanceClient.md#getdecimals)
- [getERC20Balance](SecuredFinanceClient.md#geterc20balance)
- [getERC20TokenContractAddress](SecuredFinanceClient.md#geterc20tokencontractaddress)
- [getItayoseEstimation](SecuredFinanceClient.md#getitayoseestimation)
- [getLastPrice](SecuredFinanceClient.md#getlastprice)
- [getLendOrderBook](SecuredFinanceClient.md#getlendorderbook)
- [getMarketTerminationDate](SecuredFinanceClient.md#getmarketterminationdate)
- [getMarketTerminationPriceAndDecimals](SecuredFinanceClient.md#getmarketterminationpriceanddecimals)
- [getMarketTerminationRatio](SecuredFinanceClient.md#getmarketterminationratio)
- [getMaturities](SecuredFinanceClient.md#getmaturities)
- [getOrderBookDetail](SecuredFinanceClient.md#getorderbookdetail)
- [getOrderBookDetails](SecuredFinanceClient.md#getorderbookdetails)
- [getOrderBookDetailsPerCurrency](SecuredFinanceClient.md#getorderbookdetailspercurrency)
- [getOrderBookId](SecuredFinanceClient.md#getorderbookid)
- [getOrderEstimation](SecuredFinanceClient.md#getorderestimation)
- [getOrderFeeRate](SecuredFinanceClient.md#getorderfeerate)
- [getOrderList](SecuredFinanceClient.md#getorderlist)
- [getPositions](SecuredFinanceClient.md#getpositions)
- [getProtocolDepositAmount](SecuredFinanceClient.md#getprotocoldepositamount)
- [getTotalPresentValueInBaseCurrency](SecuredFinanceClient.md#gettotalpresentvalueinbasecurrency)
- [getUsedCurrenciesForOrders](SecuredFinanceClient.md#getusedcurrenciesfororders)
- [init](SecuredFinanceClient.md#init)
- [isRedemptionRequired](SecuredFinanceClient.md#isredemptionrequired)
- [isTerminated](SecuredFinanceClient.md#isterminated)
- [mintERC20Token](SecuredFinanceClient.md#minterc20token)
- [parseBytes32String](SecuredFinanceClient.md#parsebytes32string)
- [placeOrder](SecuredFinanceClient.md#placeorder)
- [placePreOrder](SecuredFinanceClient.md#placepreorder)
- [unwindPosition](SecuredFinanceClient.md#unwindposition)

## Constructors

### constructor

• **new SecuredFinanceClient**(): [`SecuredFinanceClient`](SecuredFinanceClient.md)

#### Returns

[`SecuredFinanceClient`](SecuredFinanceClient.md)

## Properties

### \_config

• `Private` **\_config**: `undefined` \| [`SecuredFinanceClientConfig`](../interfaces/SecuredFinanceClientConfig.md)

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:117](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L117)

___

### \_publicClient

• `Private` **\_publicClient**: `undefined` \| {}

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:119](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L119)

___

### \_tokenVault

• `Private` **\_tokenVault**: `undefined` \| `TokenVault`

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:120](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L120)

___

### \_walletClient

• `Private` **\_walletClient**: `undefined` \| {}

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:118](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L118)

## Accessors

### config

• `get` **config**(): [`SecuredFinanceClientConfig`](../interfaces/SecuredFinanceClientConfig.md)

#### Returns

[`SecuredFinanceClientConfig`](../interfaces/SecuredFinanceClientConfig.md)

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:162](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L162)

___

### publicClient

• `get` **publicClient**(): `Object`

#### Returns

`Object`

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:173](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L173)

___

### tokenVault

• `get` **tokenVault**(): `TokenVault`

#### Returns

`TokenVault`

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:196](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L196)

___

### walletClient

• `get` **walletClient**(): `Object`

#### Returns

`Object`

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:185](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L185)

## Methods

### approveTokenTransfer

▸ **approveTokenTransfer**(`ccy`, `amount`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ccy` | `Currency` |
| `amount` | `bigint` |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:870](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L870)

___

### calculateAdjustedGas

▸ **calculateAdjustedGas**(`amount`): `bigint`

#### Parameters

| Name | Type |
| :------ | :------ |
| `amount` | `bigint` |

#### Returns

`bigint`

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:111](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L111)

___

### cancelLendingOrder

▸ **cancelLendingOrder**(`ccy`, `maturity`, `orderID`): `Promise`\<\`0x$\{string}\`\>

Cancels an open order

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ccy` | `Currency` | Native currency of the open order |
| `maturity` | `number` | Maturity of the open order |
| `orderID` | `number` | order ID of the open order |

#### Returns

`Promise`\<\`0x$\{string}\`\>

a `Contract Transaction`

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:625](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L625)

___

### convert

▸ **convert**(`fromCcy`, `toCcy`, `amount`): `Promise`\<`bigint` \| readonly `bigint`[]\>

Gets the converted amount between currencies

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fromCcy` | `Currency` | Original native currency of amount |
| `toCcy` | `Currency` | Currency to which amount has to be converted |
| `amount` | `bigint` | Amount to be converted |

#### Returns

`Promise`\<`bigint` \| readonly `bigint`[]\>

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:669](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L669)

___

### convertCurrencyArrayToBytes32Array

▸ **convertCurrencyArrayToBytes32Array**(`currencies`): \`0x$\{string}\`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `currencies` | `Currency`[] |

#### Returns

\`0x$\{string}\`[]

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:101](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L101)

___

### convertCurrencyToBytes32

▸ **convertCurrencyToBytes32**(`ccy`): \`0x$\{string}\`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ccy` | `Currency` |

#### Returns

\`0x$\{string}\`

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:93](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L93)

___

### convertToBaseCurrency

▸ **convertToBaseCurrency**(`ccy`, `amount`): `Promise`\<`bigint` \| readonly `bigint`[]\>

Gets the converted amount in the base currency.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ccy` | `Currency` | Native currency object |
| `amount` | `bigint` | Amount to be converted |

#### Returns

`Promise`\<`bigint` \| readonly `bigint`[]\>

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:650](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L650)

___

### currencyExists

▸ **currencyExists**(`ccy`): `Promise`\<`boolean`\>

Gets if the selected currency is supported.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ccy` | `Currency` | Native currency |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:829](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L829)

___

### depositCollateral

▸ **depositCollateral**(`ccy`, `amount`, `onApproved?`): `Promise`\<\`0x$\{string}\`\>

Deposits collateral to the protocol.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ccy` | `Currency` | Native currency of the collateral user wants to deposit. |
| `amount` | `bigint` | Amount of collateral the user wants to deposit. |
| `onApproved?` | (`isApproved`: `boolean`) => `void` \| `Promise`\<`void`\> | Function to be called when the transaction is approved by the user. |

#### Returns

`Promise`\<\`0x$\{string}\`\>

a `Contract Transaction`

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:270](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L270)

___

### executeEmergencySettlement

▸ **executeEmergencySettlement**(): `Promise`\<\`0x$\{string}\`\>

Force settlement of all lending and borrowing positions. This function is executed under the present value as of the termination date.

#### Returns

`Promise`\<\`0x$\{string}\`\>

a `Contract Transaction`

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:1260](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L1260)

___

### executeLiquidationCall

▸ **executeLiquidationCall**(`collateralCcy`, `debtCcy`, `debtMaturity`, `account`): `Promise`\<\`0x$\{string}\`\>

Liquidates a lending or borrowing position if the user's coverage is hight.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `collateralCcy` | `Currency` | Native currency of collateral used by user |
| `debtCcy` | `Currency` | Native currency of borrow order |
| `debtMaturity` | `number` | Maturity of position |
| `account` | `string` | Wallet address of user |

#### Returns

`Promise`\<\`0x$\{string}\`\>

a `Contract Transaction`

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:1115](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L1115)

___

### executeRedemption

▸ **executeRedemption**(`currency`, `maturity`): `Promise`\<\`0x$\{string}\`\>

Redeem user's lending positions. Redemption can only be executed once the order book has matured after the currency has been delisted.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `currency` | `Currency` | Native currency of matured position |
| `maturity` | `number` |  |

#### Returns

`Promise`\<\`0x$\{string}\`\>

a `Contract Transaction`

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:999](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L999)

___

### executeRepayment

▸ **executeRepayment**(`currency`, `maturity`): `Promise`\<\`0x$\{string}\`\>

Repay user's borrowing positions. Repayment can only be executed once the order book has matured after the currency has been delisted.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `currency` | `Currency` | Native currency of matured position |
| `maturity` | `number` |  |

#### Returns

`Promise`\<\`0x$\{string}\`\>

a `Contract Transaction`

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:981](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L981)

___

### getBestBorrowUnitPrices

▸ **getBestBorrowUnitPrices**(`ccy`): `Promise`\<readonly `bigint`[]\>

Gets the best borrowing unit price array for a given currency.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ccy` | `Currency` | Native currency for which lending unit prices are requested |

#### Returns

`Promise`\<readonly `bigint`[]\>

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:319](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L319)

___

### getBestLendUnitPrices

▸ **getBestLendUnitPrices**(`ccy`): `Promise`\<readonly `bigint`[]\>

Gets the best lending unit price array for a given currency.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ccy` | `Currency` | Native currency for which lending unit prices are requested |

#### Returns

`Promise`\<readonly `bigint`[]\>

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:302](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L302)

___

### getBorrowOrderBook

▸ **getBorrowOrderBook**(`currency`, `maturity`, `start`, `limit`): `Promise`\<\{ `amounts`: readonly `bigint`[] ; `next`: `bigint` ; `quantities`: readonly `bigint`[] ; `unitPrices`: readonly `bigint`[]  }\>

Gets the order book of borrow orders for specified currency and maturity.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `currency` | `Currency` | Native currency of requested orderbook |
| `maturity` | `number` | Maturity of requested orderbook |
| `start` | `number` | The starting unit price to get order book |
| `limit` | `number` | The max limit for getting unit prices |

#### Returns

`Promise`\<\{ `amounts`: readonly `bigint`[] ; `next`: `bigint` ; `quantities`: readonly `bigint`[] ; `unitPrices`: readonly `bigint`[]  }\>

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:696](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L696)

___

### getCollateralCurrencies

▸ **getCollateralCurrencies**(): `Promise`\<readonly \`0x$\{string}\`[]\>

Gets the currencies that are accepted as collateral

#### Returns

`Promise`\<readonly \`0x$\{string}\`[]\>

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:844](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L844)

___

### getCurrencies

▸ **getCurrencies**(): `Promise`\<readonly \`0x$\{string}\`[]\>

Gets all currencies supported by the protocol

#### Returns

`Promise`\<readonly \`0x$\{string}\`[]\>

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:814](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L814)

___

### getDecimals

▸ **getDecimals**(`currency`): `Promise`\<`number`\>

* Gets aggregated and cached decimals of the price feeds for the selected currency

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `currency` | `Currency` | Currency for which decimals are requested |

#### Returns

`Promise`\<`number`\>

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:1174](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L1174)

___

### getERC20Balance

▸ **getERC20Balance**(`token`, `account`): `Promise`\<`bigint`\>

gets token balance of an ERC20 token

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `token` | `Token` | Token for which balance has to be checked |
| `account` | `string` | Wallet address of the user |

#### Returns

`Promise`\<`bigint`\>

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:860](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L860)

___

### getERC20TokenContractAddress

▸ **getERC20TokenContractAddress**(`token`): `Promise`\<\`0x$\{string}\`\>

Gets address of mock ERC20 token contracts

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `token` | `Token` | Token for which address is requested |

#### Returns

`Promise`\<\`0x$\{string}\`\>

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:793](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L793)

___

### getItayoseEstimation

▸ **getItayoseEstimation**(`currency`, `maturity`): `Promise`\<\{ `lastBorrowUnitPrice`: `bigint` ; `lastLendUnitPrice`: `bigint` ; `openingUnitPrice`: `bigint` ; `totalOffsetAmount`: `bigint`  }\>

Gets the estimation of the Itayose process.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `currency` | `Currency` | Native currency for which itayose estimations are requested |
| `maturity` | `number` |  |

#### Returns

`Promise`\<\{ `lastBorrowUnitPrice`: `bigint` ; `lastLendUnitPrice`: `bigint` ; `openingUnitPrice`: `bigint` ; `totalOffsetAmount`: `bigint`  }\>

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:1282](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L1282)

___

### getLastPrice

▸ **getLastPrice**(`currency`): `Promise`\<`bigint`\>

Gets the last price of the selected currency in the base currency.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `currency` | `Currency` | Native currency for which last price is requested |

#### Returns

`Promise`\<`bigint`\>

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:1158](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L1158)

___

### getLendOrderBook

▸ **getLendOrderBook**(`currency`, `maturity`, `start`, `limit`): `Promise`\<\{ `amounts`: readonly `bigint`[] ; `next`: `bigint` ; `quantities`: readonly `bigint`[] ; `unitPrices`: readonly `bigint`[]  }\>

Gets the order book of lend orders for specified currency and maturity.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `currency` | `Currency` | Native currency of requested orderbook |
| `maturity` | `number` | Maturity of requested orderbook |
| `start` | `number` | The starting unit price to get order book |
| `limit` | `number` | The max limit for getting unit prices |

#### Returns

`Promise`\<\{ `amounts`: readonly `bigint`[] ; `next`: `bigint` ; `quantities`: readonly `bigint`[] ; `unitPrices`: readonly `bigint`[]  }\>

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:735](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L735)

___

### getMarketTerminationDate

▸ **getMarketTerminationDate**(): `Promise`\<`bigint`\>

Gets the date at the emergency termination.

#### Returns

`Promise`\<`bigint`\>

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:1202](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L1202)

___

### getMarketTerminationPriceAndDecimals

▸ **getMarketTerminationPriceAndDecimals**(`currency`): `Promise`\<\{ `decimals`: `number` ; `price`: `bigint`  }\>

Gets the currency information cached at the emergency termination.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `currency` | `Currency` | Native currency for which market price and decimals are requested |

#### Returns

`Promise`\<\{ `decimals`: `number` ; `price`: `bigint`  }\>

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:1231](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L1231)

___

### getMarketTerminationRatio

▸ **getMarketTerminationRatio**(`currency`): `Promise`\<`bigint`\>

Gets the collateral ratio of each token in TokenVault at the emergency termination.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `currency` | `Currency` | Native currency for which market's state has to be checked |

#### Returns

`Promise`\<`bigint`\>

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:1217](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L1217)

___

### getMaturities

▸ **getMaturities**(`ccy`): `Promise`\<readonly `bigint`[]\>

Gets market maturities for a currency

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ccy` | `Currency` | Native currency selected to fetch related maturities |

#### Returns

`Promise`\<readonly `bigint`[]\>

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:336](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L336)

___

### getOrderBookDetail

▸ **getOrderBookDetail**(`ccy`, `maturity`): `Promise`\<\{ `bestBorrowUnitPrice`: `bigint` ; `bestLendUnitPrice`: `bigint` ; `blockUnitPriceHistory`: readonly `bigint`[] ; `ccy`: \`0x$\{string}\` ; `currentMinDebtUnitPrice`: `bigint` ; `isReady`: `boolean` ; `lastBlockUnitPriceTimestamp`: `bigint` ; `marketUnitPrice`: `bigint` ; `maturity`: `bigint` ; `maxLendUnitPrice`: `bigint` ; `minBorrowUnitPrice`: `bigint` ; `openingDate`: `bigint` ; `openingUnitPrice`: `bigint` ; `preOpeningDate`: `bigint`  }\>

Gets the order book detail.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ccy` | `Currency` | Native currency selected for getting order book details |
| `maturity` | `number` | Market maturity selected for getting order book details |

#### Returns

`Promise`\<\{ `bestBorrowUnitPrice`: `bigint` ; `bestLendUnitPrice`: `bigint` ; `blockUnitPriceHistory`: readonly `bigint`[] ; `ccy`: \`0x$\{string}\` ; `currentMinDebtUnitPrice`: `bigint` ; `isReady`: `boolean` ; `lastBlockUnitPriceTimestamp`: `bigint` ; `marketUnitPrice`: `bigint` ; `maturity`: `bigint` ; `maxLendUnitPrice`: `bigint` ; `minBorrowUnitPrice`: `bigint` ; `openingDate`: `bigint` ; `openingUnitPrice`: `bigint` ; `preOpeningDate`: `bigint`  }\>

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:354](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L354)

___

### getOrderBookDetails

▸ **getOrderBookDetails**(`ccys`): `Promise`\<\{ `bestBorrowUnitPrice`: `bigint` ; `bestLendUnitPrice`: `bigint` ; `blockUnitPriceHistory`: readonly `bigint`[] ; `ccy`: \`0x$\{string}\` ; `currentMinDebtUnitPrice`: `bigint` ; `isItayosePeriod`: `boolean` ; `isMatured`: `boolean` ; `isOpened`: `boolean` ; `isPreOrderPeriod`: `boolean` ; `isReady`: `boolean` ; `lastBlockUnitPriceTimestamp`: `bigint` ; `marketUnitPrice`: `bigint` ; `maturity`: `bigint` ; `maxLendUnitPrice`: `bigint` ; `minBorrowUnitPrice`: `bigint` ; `name`: `string` ; `openingDate`: `bigint` ; `openingUnitPrice`: `bigint` ; `preOpeningDate`: `bigint`  }[]\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ccys` | `Currency`[] | List of currencies for which orderbook details are requested |

#### Returns

`Promise`\<\{ `bestBorrowUnitPrice`: `bigint` ; `bestLendUnitPrice`: `bigint` ; `blockUnitPriceHistory`: readonly `bigint`[] ; `ccy`: \`0x$\{string}\` ; `currentMinDebtUnitPrice`: `bigint` ; `isItayosePeriod`: `boolean` ; `isMatured`: `boolean` ; `isOpened`: `boolean` ; `isPreOrderPeriod`: `boolean` ; `isReady`: `boolean` ; `lastBlockUnitPriceTimestamp`: `bigint` ; `marketUnitPrice`: `bigint` ; `maturity`: `bigint` ; `maxLendUnitPrice`: `bigint` ; `minBorrowUnitPrice`: `bigint` ; `name`: `string` ; `openingDate`: `bigint` ; `openingUnitPrice`: `bigint` ; `preOpeningDate`: `bigint`  }[]\>

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:396](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L396)

___

### getOrderBookDetailsPerCurrency

▸ **getOrderBookDetailsPerCurrency**(`ccy`): `Promise`\<\{ `bestBorrowUnitPrice`: `bigint` ; `bestLendUnitPrice`: `bigint` ; `blockUnitPriceHistory`: readonly `bigint`[] ; `ccy`: \`0x$\{string}\` ; `currentMinDebtUnitPrice`: `bigint` ; `isItayosePeriod`: `boolean` ; `isMatured`: `boolean` ; `isOpened`: `boolean` ; `isPreOrderPeriod`: `boolean` ; `isReady`: `boolean` ; `lastBlockUnitPriceTimestamp`: `bigint` ; `marketUnitPrice`: `bigint` ; `maturity`: `bigint` ; `maxLendUnitPrice`: `bigint` ; `minBorrowUnitPrice`: `bigint` ; `name`: `string` ; `openingDate`: `bigint` ; `openingUnitPrice`: `bigint` ; `preOpeningDate`: `bigint`  }[]\>

Retrieves order book for a currency

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ccy` | `Currency` | Currency for which order book details are fetched |

#### Returns

`Promise`\<\{ `bestBorrowUnitPrice`: `bigint` ; `bestLendUnitPrice`: `bigint` ; `blockUnitPriceHistory`: readonly `bigint`[] ; `ccy`: \`0x$\{string}\` ; `currentMinDebtUnitPrice`: `bigint` ; `isItayosePeriod`: `boolean` ; `isMatured`: `boolean` ; `isOpened`: `boolean` ; `isPreOrderPeriod`: `boolean` ; `isReady`: `boolean` ; `lastBlockUnitPriceTimestamp`: `bigint` ; `marketUnitPrice`: `bigint` ; `maturity`: `bigint` ; `maxLendUnitPrice`: `bigint` ; `minBorrowUnitPrice`: `bigint` ; `name`: `string` ; `openingDate`: `bigint` ; `openingUnitPrice`: `bigint` ; `preOpeningDate`: `bigint`  }[]\>

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:377](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L377)

___

### getOrderBookId

▸ **getOrderBookId**(`currency`, `maturity`): `Promise`\<`number`\>

Gets the order book id for the selected currency and maturity.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `currency` | `Currency` | Native currency of requested orderbook |
| `maturity` | `number` |  |

#### Returns

`Promise`\<`number`\>

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:1035](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L1035)

___

### getOrderEstimation

▸ **getOrderEstimation**(`ccy`, `maturity`, `account`, `side`, `amount`, `unitPrice`, `additionalDepositAmount?`, `ignoreBorrowedAmount?`): `Promise`\<\{ `coverage`: `bigint` ; `filledAmount`: `bigint` ; `filledAmountInFV`: `bigint` ; `isInsufficientDepositAmount`: `boolean` ; `lastUnitPrice`: `bigint` ; `orderFeeInFV`: `bigint` ; `placedAmount`: `bigint`  }\>

Gets the estimated order result by calculating the amount to be filled when executing an order in the order books.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `ccy` | `Currency` | `undefined` | Native currency of the selected market. |
| `maturity` | `number` | `undefined` | Maturity term of the order. |
| `account` | `string` | `undefined` | Wallet address of the user. |
| `side` | [`OrderSide`](../enums/OrderSide.md) | `undefined` | Type of order placed (LEND or BORROW). |
| `amount` | `bigint` | `undefined` | Amount of funds the maker wants to borrow/lend. |
| `unitPrice` | `number` | `undefined` | Amount of unit price taker wishes to borrow/lend. |
| `additionalDepositAmount?` | `bigint` | `undefined` | Optional parameter for additional deposit amount. |
| `ignoreBorrowedAmount?` | `boolean` | `false` | Boolean indicating if the borrowed amount is to be used as collateral or not. |

#### Returns

`Promise`\<\{ `coverage`: `bigint` ; `filledAmount`: `bigint` ; `filledAmountInFV`: `bigint` ; `isInsufficientDepositAmount`: `boolean` ; `lastUnitPrice`: `bigint` ; `orderFeeInFV`: `bigint` ; `placedAmount`: `bigint`  }\>

Estimated order result.

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:223](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L223)

___

### getOrderFeeRate

▸ **getOrderFeeRate**(`currency`): `Promise`\<`bigint`\>

Gets the order fee rate

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `currency` | `Currency` | Native currency used |

#### Returns

`Promise`\<`bigint`\>

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:1018](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L1018)

___

### getOrderList

▸ **getOrderList**(`account`, `usedCurrenciesForOrders`): `Promise`\<\{ `activeOrders`: readonly \{ `amount`: `bigint` ; `ccy`: \`0x$\{string}\` ; `isPreOrder`: `boolean` ; `maturity`: `bigint` ; `orderId`: `number` ; `side`: `number` ; `timestamp`: `bigint` ; `unitPrice`: `bigint`  }[] \| readonly \{ `amount`: `bigint` ; `ccy`: \`0x$\{string}\` ; `isPreOrder`: `boolean` ; `maturity`: `bigint` ; `orderId`: `number` ; `side`: `number` ; `timestamp`: `bigint` ; `unitPrice`: `bigint`  }[] \| readonly \{ `amount`: `bigint` ; `ccy`: \`0x$\{string}\` ; `isPreOrder`: `boolean` ; `maturity`: `bigint` ; `orderId`: `number` ; `side`: `number` ; `timestamp`: `bigint` ; `unitPrice`: `bigint`  }[] ; `inactiveOrders`: readonly \{ `amount`: `bigint` ; `ccy`: \`0x$\{string}\` ; `isPreOrder`: `boolean` ; `maturity`: `bigint` ; `orderId`: `number` ; `side`: `number` ; `timestamp`: `bigint` ; `unitPrice`: `bigint`  }[] \| readonly \{ `amount`: `bigint` ; `ccy`: \`0x$\{string}\` ; `isPreOrder`: `boolean` ; `maturity`: `bigint` ; `orderId`: `number` ; `side`: `number` ; `timestamp`: `bigint` ; `unitPrice`: `bigint`  }[] \| readonly \{ `amount`: `bigint` ; `ccy`: \`0x$\{string}\` ; `isPreOrder`: `boolean` ; `maturity`: `bigint` ; `orderId`: `number` ; `side`: `number` ; `timestamp`: `bigint` ; `unitPrice`: `bigint`  }[]  }\>

Gets user's active and inactive orders in the order book

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `string` | Wallet address of user |
| `usedCurrenciesForOrders` | `Currency`[] | List of native currency of requested orders |

#### Returns

`Promise`\<\{ `activeOrders`: readonly \{ `amount`: `bigint` ; `ccy`: \`0x$\{string}\` ; `isPreOrder`: `boolean` ; `maturity`: `bigint` ; `orderId`: `number` ; `side`: `number` ; `timestamp`: `bigint` ; `unitPrice`: `bigint`  }[] \| readonly \{ `amount`: `bigint` ; `ccy`: \`0x$\{string}\` ; `isPreOrder`: `boolean` ; `maturity`: `bigint` ; `orderId`: `number` ; `side`: `number` ; `timestamp`: `bigint` ; `unitPrice`: `bigint`  }[] \| readonly \{ `amount`: `bigint` ; `ccy`: \`0x$\{string}\` ; `isPreOrder`: `boolean` ; `maturity`: `bigint` ; `orderId`: `number` ; `side`: `number` ; `timestamp`: `bigint` ; `unitPrice`: `bigint`  }[] ; `inactiveOrders`: readonly \{ `amount`: `bigint` ; `ccy`: \`0x$\{string}\` ; `isPreOrder`: `boolean` ; `maturity`: `bigint` ; `orderId`: `number` ; `side`: `number` ; `timestamp`: `bigint` ; `unitPrice`: `bigint`  }[] \| readonly \{ `amount`: `bigint` ; `ccy`: \`0x$\{string}\` ; `isPreOrder`: `boolean` ; `maturity`: `bigint` ; `orderId`: `number` ; `side`: `number` ; `timestamp`: `bigint` ; `unitPrice`: `bigint`  }[] \| readonly \{ `amount`: `bigint` ; `ccy`: \`0x$\{string}\` ; `isPreOrder`: `boolean` ; `maturity`: `bigint` ; `orderId`: `number` ; `side`: `number` ; `timestamp`: `bigint` ; `unitPrice`: `bigint`  }[]  }\>

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:1053](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L1053)

___

### getPositions

▸ **getPositions**(`account`, `usedCurrenciesForOrders`): `Promise`\<readonly \{ `ccy`: \`0x$\{string}\` ; `futureValue`: `bigint` ; `maturity`: `bigint` ; `presentValue`: `bigint`  }[] \| readonly \{ `ccy`: \`0x$\{string}\` ; `futureValue`: `bigint` ; `maturity`: `bigint` ; `presentValue`: `bigint`  }[]\>

Gets user's active positions of the selected currency

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `string` | Wallet address of user |
| `usedCurrenciesForOrders` | `Currency`[] | Native currency used by user for placing orders |

#### Returns

`Promise`\<readonly \{ `ccy`: \`0x$\{string}\` ; `futureValue`: `bigint` ; `maturity`: `bigint` ; `presentValue`: `bigint`  }[] \| readonly \{ `ccy`: \`0x$\{string}\` ; `futureValue`: `bigint` ; `maturity`: `bigint` ; `presentValue`: `bigint`  }[]\>

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:1077](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L1077)

___

### getProtocolDepositAmount

▸ **getProtocolDepositAmount**(): `Promise`\<`Record`\<`string`, `bigint`\>\>

Gets the total amount deposited in protocol in all currencies

#### Returns

`Promise`\<`Record`\<`string`, `bigint`\>\>

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:906](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L906)

___

### getTotalPresentValueInBaseCurrency

▸ **getTotalPresentValueInBaseCurrency**(`account`): `Promise`\<`bigint`\>

Gets the total present value of the account converted to base currency.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `string` | Address of user |

#### Returns

`Promise`\<`bigint`\>

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:966](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L966)

___

### getUsedCurrenciesForOrders

▸ **getUsedCurrenciesForOrders**(`account`): `Promise`\<readonly \`0x$\{string}\`[]\>

Get all the currencies in which the user has lending positions or orders.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `string` | Wallet address of user |

#### Returns

`Promise`\<readonly \`0x$\{string}\`[]\>

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:1098](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L1098)

___

### init

▸ **init**(`publicClient`, `walletClient?`, `options?`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `publicClient` | `Object` |
| `walletClient?` | `Object` |
| `options?` | `Object` |
| `options.defaultGas?` | `number` |
| `options.defaultGasPrice?` | `number` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:122](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L122)

___

### isRedemptionRequired

▸ **isRedemptionRequired**(`account`): `Promise`\<`boolean`\>

Gets if the user needs to redeem the funds.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `string` | Wallet address of user |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:1247](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L1247)

___

### isTerminated

▸ **isTerminated**(): `Promise`\<`boolean`\>

Gets if the protocol has not been terminated.

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:1188](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L1188)

___

### mintERC20Token

▸ **mintERC20Token**(`token`): `Promise`\<\`0x$\{string}\`\>

MockERC20 related function
Mints ERC20 tokens for specified token for user

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `token` | `Token` | Token to be minted |

#### Returns

`Promise`\<\`0x$\{string}\`\>

a `Contract Transaction`

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:767](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L767)

___

### parseBytes32String

▸ **parseBytes32String**(`ccy`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ccy` | `string` |

#### Returns

`string`

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:107](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L107)

___

### placeOrder

▸ **placeOrder**(`ccy`, `maturity`, `side`, `amount`, `sourceWallet`, `unitPrice?`, `onApproved?`): `Promise`\<\`0x$\{string}\`\>

Places an order

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ccy` | `Currency` | the Currency object of the selected market |
| `maturity` | `number` | the maturity of the selected market |
| `side` | [`OrderSide`](../enums/OrderSide.md) | Order position type, 0 for lend, 1 for borrow |
| `amount` | `bigint` | Amount of funds the maker wants to borrow/lend |
| `sourceWallet` | [`WalletSource`](../enums/WalletSource.md) | - |
| `unitPrice?` | `number` | Unit price the taker is willing to pay/receive. 0 for placing a market order |
| `onApproved?` | (`isApproved`: `boolean`) => `void` \| `Promise`\<`void`\> | callback function to be called after the approval transaction is mined |

#### Returns

`Promise`\<\`0x$\{string}\`\>

a `ContractTransaction`

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:437](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L437)

___

### placePreOrder

▸ **placePreOrder**(`ccy`, `maturity`, `side`, `amount`, `sourceWallet`, `unitPrice`, `onApproved?`): `Promise`\<\`0x$\{string}\`\>

Places a pre-order

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ccy` | `Currency` | the Currency object of the selected market |
| `maturity` | `number` | the maturity of the selected market |
| `side` | [`OrderSide`](../enums/OrderSide.md) | Order position type, 0 for lend, 1 for borrow |
| `amount` | `bigint` | Amount of funds the maker wants to borrow/lend |
| `sourceWallet` | [`WalletSource`](../enums/WalletSource.md) | Source of fund used for transaction |
| `unitPrice` | `number` | Unit price the taker is willing to pay/receive. 0 for placing a market order |
| `onApproved?` | (`isApproved`: `boolean`) => `void` \| `Promise`\<`void`\> | callback function to be called after the approval transaction is mined |

#### Returns

`Promise`\<\`0x$\{string}\`\>

`Contract Transaction`

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:533](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L533)

___

### unwindPosition

▸ **unwindPosition**(`currency`, `maturity`): `Promise`\<\`0x$\{string}\`\>

Unwinds user's lending or borrowing positions by creating an opposite position order.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `currency` | `Currency` | Native currency of position |
| `maturity` | `number` | Maturity of position |

#### Returns

`Promise`\<\`0x$\{string}\`\>

a `Contract Transaction`

#### Defined in

[packages/sf-client/src/secured-finance-client.ts:937](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/secured-finance-client.ts#L937)
