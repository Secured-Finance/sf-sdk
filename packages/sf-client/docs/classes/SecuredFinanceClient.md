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

[src/secured-finance-client.ts:82](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L82)

___

### \_publicClient

• `Private` **\_publicClient**: `undefined` \| \{ `account`: `undefined` ; `batch?`: \{ `multicall?`: `boolean` \| \{ `batchSize?`: `number` ; `wait?`: `number`  }  } ; `cacheTime`: `number` ; `call`: (`parameters`: `CallParameters`\<`undefined` \| `Chain`\>) => `Promise`\<`CallReturnType`\> ; `chain`: `undefined` \| `Chain` ; `createBlockFilter`: () => `Promise`\<\{ `id`: \`0x$\{string}\` ; `request`: `EIP1193RequestFn`\<readonly [\{ `Method`: ``"eth_getFilterChanges"`` ; `Parameters`: [filterId: \`0x$\{string}\`] ; `ReturnType`: \`0x$\{string}\`[] \| `RpcLog`[]  }, \{ `Method`: ``"eth_getFilterLogs"`` ; `Parameters`: [filterId: \`0x$\{string}\`] ; `ReturnType`: `RpcLog`[]  }, \{ `Method`: ``"eth_uninstallFilter"`` ; `Parameters`: [filterId: \`0x$\{string}\`] ; `ReturnType`: `boolean`  }]\> ; `type`: ``"block"``  }\> ; `createContractEventFilter`: \<TAbi, TEventName, TArgs, TStrict, TFromBlock, TToBlock\>(`args`: `CreateContractEventFilterParameters`\<`TAbi`, `TEventName`, `TArgs`, `TStrict`, `TFromBlock`, `TToBlock`\>) => `Promise`\<`CreateContractEventFilterReturnType`\<`TAbi`, `TEventName`, `TArgs`, `TStrict`, `TFromBlock`, `TToBlock`\>\> ; `createEventFilter`: \<TAbiEvent, TAbiEvents, TStrict, TFromBlock, TToBlock, _EventName, _Args\>(`args?`: `CreateEventFilterParameters`\<`TAbiEvent`, `TAbiEvents`, `TStrict`, `TFromBlock`, `TToBlock`, `_EventName`, `_Args`\>) => `Promise`\<\{ [K in string \| number \| symbol]: Filter\<"event", TAbiEvents, \_EventName, \_Args, TStrict, TFromBlock, TToBlock\>[K] }\> ; `createPendingTransactionFilter`: () => `Promise`\<\{ `id`: \`0x$\{string}\` ; `request`: `EIP1193RequestFn`\<readonly [\{ `Method`: ``"eth_getFilterChanges"`` ; `Parameters`: [filterId: \`0x$\{string}\`] ; `ReturnType`: \`0x$\{string}\`[] \| `RpcLog`[]  }, \{ `Method`: ``"eth_getFilterLogs"`` ; `Parameters`: [filterId: \`0x$\{string}\`] ; `ReturnType`: `RpcLog`[]  }, \{ `Method`: ``"eth_uninstallFilter"`` ; `Parameters`: [filterId: \`0x$\{string}\`] ; `ReturnType`: `boolean`  }]\> ; `type`: ``"transaction"``  }\> ; `estimateContractGas`: \<TChain, TAbi, TFunctionName\>(`args`: `EstimateContractGasParameters`\<`TAbi`, `TFunctionName`, `TChain`, `undefined` \| `Account`\>) => `Promise`\<`bigint`\> ; `estimateFeesPerGas`: \<TChainOverride, TType\>(`args?`: `EstimateFeesPerGasParameters`\<`undefined` \| `Chain`, `TChainOverride`, `TType`\>) => `Promise`\<`EstimateFeesPerGasReturnType`\> ; `estimateGas`: (`args`: `EstimateGasParameters`\<`undefined` \| `Chain`, `undefined` \| `Account`\>) => `Promise`\<`bigint`\> ; `estimateMaxPriorityFeePerGas`: \<TChainOverride\>(`args?`: \{ `chain`: ``null`` \| `TChainOverride`  }) => `Promise`\<`bigint`\> ; `extend`: \<client\>(`fn`: (`client`: `Client`\<`Transport`, `undefined` \| `Chain`, `undefined`, `PublicRpcSchema`, `PublicActions`\<`Transport`, `undefined` \| `Chain`\>\>) => `client`) => `Client`\<`Transport`, `undefined` \| `Chain`, `undefined`, `PublicRpcSchema`, \{ [K in string \| number \| symbol]: client[K] } & `PublicActions`\<`Transport`, `undefined` \| `Chain`\>\> ; `getBalance`: (`args`: `GetBalanceParameters`) => `Promise`\<`bigint`\> ; `getBlock`: \<TIncludeTransactions, TBlockTag\>(`args?`: `GetBlockParameters`\<`TIncludeTransactions`, `TBlockTag`\>) => `Promise`\<`GetBlockReturnType`\<`undefined` \| `Chain`, `TIncludeTransactions`, `TBlockTag`\>\> ; `getBlockNumber`: (`args?`: `GetBlockNumberParameters`) => `Promise`\<`bigint`\> ; `getBlockTransactionCount`: (`args?`: `GetBlockTransactionCountParameters`) => `Promise`\<`number`\> ; `getBytecode`: (`args`: `GetBytecodeParameters`) => `Promise`\<`GetBytecodeReturnType`\> ; `getChainId`: () => `Promise`\<`number`\> ; `getContractEvents`: \<TAbi, TEventName, TStrict, TFromBlock, TToBlock\>(`args`: `GetContractEventsParameters`\<`TAbi`, `TEventName`, `TStrict`, `TFromBlock`, `TToBlock`\>) => `Promise`\<`GetContractEventsReturnType`\<`TAbi`, `TEventName`, `TStrict`, `TFromBlock`, `TToBlock`\>\> ; `getEnsAddress`: (`args`: \{ `blockNumber?`: `bigint` ; `blockTag?`: `BlockTag` ; `coinType?`: `number` ; `name`: `string` ; `universalResolverAddress?`: \`0x$\{string}\`  }) => `Promise`\<`GetEnsAddressReturnType`\> ; `getEnsAvatar`: (`args`: \{ `blockNumber?`: `bigint` ; `blockTag?`: `BlockTag` ; `gatewayUrls?`: `AssetGatewayUrls` ; `name`: `string` ; `universalResolverAddress?`: \`0x$\{string}\`  }) => `Promise`\<`GetEnsAvatarReturnType`\> ; `getEnsName`: (`args`: \{ `address`: \`0x$\{string}\` ; `blockNumber?`: `bigint` ; `blockTag?`: `BlockTag` ; `universalResolverAddress?`: \`0x$\{string}\`  }) => `Promise`\<`GetEnsNameReturnType`\> ; `getEnsResolver`: (`args`: \{ `blockNumber?`: `bigint` ; `blockTag?`: `BlockTag` ; `name`: `string` ; `universalResolverAddress?`: \`0x$\{string}\`  }) => `Promise`\<\`0x$\{string}\`\> ; `getEnsText`: (`args`: \{ `blockNumber?`: `bigint` ; `blockTag?`: `BlockTag` ; `key`: `string` ; `name`: `string` ; `universalResolverAddress?`: \`0x$\{string}\`  }) => `Promise`\<`GetEnsTextReturnType`\> ; `getFeeHistory`: (`args`: `GetFeeHistoryParameters`) => `Promise`\<`GetFeeHistoryReturnType`\> ; `getFilterChanges`: \<TFilterType, TAbi, TEventName, TStrict, TFromBlock, TToBlock\>(`args`: `GetFilterChangesParameters`\<`TFilterType`, `TAbi`, `TEventName`, `TStrict`, `TFromBlock`, `TToBlock`\>) => `Promise`\<`GetFilterChangesReturnType`\<`TFilterType`, `TAbi`, `TEventName`, `TStrict`, `TFromBlock`, `TToBlock`\>\> ; `getFilterLogs`: \<TAbi, TEventName, TStrict, TFromBlock, TToBlock\>(`args`: `GetFilterLogsParameters`\<`TAbi`, `TEventName`, `TStrict`, `TFromBlock`, `TToBlock`\>) => `Promise`\<`GetFilterLogsReturnType`\<`TAbi`, `TEventName`, `TStrict`, `TFromBlock`, `TToBlock`\>\> ; `getGasPrice`: () => `Promise`\<`bigint`\> ; `getLogs`: \<TAbiEvent, TAbiEvents, TStrict, TFromBlock, TToBlock\>(`args?`: `GetLogsParameters`\<`TAbiEvent`, `TAbiEvents`, `TStrict`, `TFromBlock`, `TToBlock`\>) => `Promise`\<`GetLogsReturnType`\<`TAbiEvent`, `TAbiEvents`, `TStrict`, `TFromBlock`, `TToBlock`\>\> ; `getProof`: (`args`: `GetProofParameters`) => `Promise`\<`GetProofReturnType`\> ; `getStorageAt`: (`args`: `GetStorageAtParameters`) => `Promise`\<`GetStorageAtReturnType`\> ; `getTransaction`: \<TBlockTag\>(`args`: `GetTransactionParameters`\<`TBlockTag`\>) => `Promise`\<`GetTransactionReturnType`\<`undefined` \| `Chain`, `TBlockTag`\>\> ; `getTransactionConfirmations`: (`args`: `GetTransactionConfirmationsParameters`\<`undefined` \| `Chain`\>) => `Promise`\<`bigint`\> ; `getTransactionCount`: (`args`: `GetTransactionCountParameters`) => `Promise`\<`number`\> ; `getTransactionReceipt`: (`args`: `GetTransactionReceiptParameters`) => `Promise`\<`TransactionReceipt`\> ; `key`: `string` ; `multicall`: \<TContracts, TAllowFailure\>(`args`: `MulticallParameters`\<`TContracts`, `TAllowFailure`\>) => `Promise`\<`MulticallReturnType`\<`TContracts`, `TAllowFailure`\>\> ; `name`: `string` ; `pollingInterval`: `number` ; `prepareTransactionRequest`: \<TChainOverride\>(`args`: `PrepareTransactionRequestParameters`\<`undefined` \| `Chain`, `undefined` \| `Account`, `TChainOverride`\>) => `Promise`\<`PrepareTransactionRequestReturnType`\> ; `readContract`: \<TAbi, TFunctionName\>(`args`: `ReadContractParameters`\<`TAbi`, `TFunctionName`\>) => `Promise`\<`ReadContractReturnType`\<`TAbi`, `TFunctionName`\>\> ; `request`: `EIP1193RequestFn`\<`PublicRpcSchema`\> ; `sendRawTransaction`: (`args`: `SendRawTransactionParameters`) => `Promise`\<\`0x$\{string}\`\> ; `simulateContract`: \<TAbi, TFunctionName, TChainOverride\>(`args`: `SimulateContractParameters`\<`TAbi`, `TFunctionName`, `undefined` \| `Chain`, `TChainOverride`\>) => `Promise`\<`SimulateContractReturnType`\<`TAbi`, `TFunctionName`, `undefined` \| `Chain`, `TChainOverride`\>\> ; `transport`: `TransportConfig`\<`string`, `EIP1193RequestFn`\> & `Record`\<`string`, `any`\> ; `type`: `string` ; `uid`: `string` ; `uninstallFilter`: (`args`: `UninstallFilterParameters`) => `Promise`\<`boolean`\> ; `verifyMessage`: (`args`: `VerifyMessageParameters`) => `Promise`\<`boolean`\> ; `verifyTypedData`: (`args`: `VerifyTypedDataParameters`) => `Promise`\<`boolean`\> ; `waitForTransactionReceipt`: (`args`: `WaitForTransactionReceiptParameters`\<`undefined` \| `Chain`\>) => `Promise`\<`TransactionReceipt`\> ; `watchBlockNumber`: (`args`: `WatchBlockNumberParameters`) => `WatchBlockNumberReturnType` ; `watchBlocks`: \<TIncludeTransactions, TBlockTag\>(`args`: `WatchBlocksParameters`\<`Transport`, `undefined` \| `Chain`, `TIncludeTransactions`, `TBlockTag`\>) => `WatchBlocksReturnType` ; `watchContractEvent`: \<TAbi, TEventName, TStrict\>(`args`: `WatchContractEventParameters`\<`TAbi`, `TEventName`, `TStrict`\>) => `WatchContractEventReturnType` ; `watchEvent`: \<TAbiEvent, TAbiEvents, TStrict\>(`args`: `WatchEventParameters`\<`TAbiEvent`, `TAbiEvents`, `TStrict`\>) => `WatchEventReturnType` ; `watchPendingTransactions`: (`args`: `WatchPendingTransactionsParameters`\<`Transport`\>) => `WatchPendingTransactionsReturnType`  }

#### Defined in

[src/secured-finance-client.ts:84](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L84)

___

### \_tokenVault

• `Private` **\_tokenVault**: `undefined` \| `TokenVault`

#### Defined in

[src/secured-finance-client.ts:85](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L85)

___

### \_walletClient

• `Private` **\_walletClient**: `undefined` \| \{ `account`: `undefined` \| `Account` ; `addChain`: (`args`: `AddChainParameters`) => `Promise`\<`void`\> ; `batch?`: \{ `multicall?`: `boolean` \| \{ `batchSize?`: `number` ; `wait?`: `number`  }  } ; `cacheTime`: `number` ; `chain`: `undefined` \| `Chain` ; `deployContract`: \<TAbi, TChainOverride\>(`args`: `DeployContractParameters`\<`TAbi`, `undefined` \| `Chain`, `undefined` \| `Account`, `TChainOverride`\>) => `Promise`\<\`0x$\{string}\`\> ; `extend`: \<client\>(`fn`: (`client`: `Client`\<`Transport`, `undefined` \| `Chain`, `undefined` \| `Account`, `WalletRpcSchema`, `WalletActions`\<`undefined` \| `Chain`, `undefined` \| `Account`\>\>) => `client`) => `Client`\<`Transport`, `undefined` \| `Chain`, `undefined` \| `Account`, `WalletRpcSchema`, \{ [K in string \| number \| symbol]: client[K] } & `WalletActions`\<`undefined` \| `Chain`, `undefined` \| `Account`\>\> ; `getAddresses`: () => `Promise`\<`GetAddressesReturnType`\> ; `getChainId`: () => `Promise`\<`number`\> ; `getPermissions`: () => `Promise`\<`GetPermissionsReturnType`\> ; `key`: `string` ; `name`: `string` ; `pollingInterval`: `number` ; `prepareTransactionRequest`: \<TChainOverride\>(`args`: `PrepareTransactionRequestParameters`\<`undefined` \| `Chain`, `undefined` \| `Account`, `TChainOverride`\>) => `Promise`\<`PrepareTransactionRequestReturnType`\> ; `request`: `EIP1193RequestFn`\<`WalletRpcSchema`\> ; `requestAddresses`: () => `Promise`\<`RequestAddressesReturnType`\> ; `requestPermissions`: (`args`: \{ `eth_accounts`: `Record`\<`string`, `any`\>  }) => `Promise`\<`RequestPermissionsReturnType`\> ; `sendRawTransaction`: (`args`: `SendRawTransactionParameters`) => `Promise`\<\`0x$\{string}\`\> ; `sendTransaction`: \<TChainOverride\>(`args`: `SendTransactionParameters`\<`undefined` \| `Chain`, `undefined` \| `Account`, `TChainOverride`\>) => `Promise`\<\`0x$\{string}\`\> ; `signMessage`: (`args`: `SignMessageParameters`\<`undefined` \| `Account`\>) => `Promise`\<\`0x$\{string}\`\> ; `signTransaction`: \<TChainOverride\>(`args`: `SignTransactionParameters`\<`undefined` \| `Chain`, `undefined` \| `Account`, `TChainOverride`\>) => `Promise`\<\`0x$\{string}\`\> ; `signTypedData`: \<TTypedData, TPrimaryType\>(`args`: `SignTypedDataParameters`\<`TTypedData`, `TPrimaryType`, `undefined` \| `Account`\>) => `Promise`\<\`0x$\{string}\`\> ; `switchChain`: (`args`: `SwitchChainParameters`) => `Promise`\<`void`\> ; `transport`: `TransportConfig`\<`string`, `EIP1193RequestFn`\> & `Record`\<`string`, `any`\> ; `type`: `string` ; `uid`: `string` ; `watchAsset`: (`args`: `WatchAssetParams`) => `Promise`\<`boolean`\> ; `writeContract`: \<TAbi, TFunctionName, TChainOverride\>(`args`: `WriteContractParameters`\<`TAbi`, `TFunctionName`, `undefined` \| `Chain`, `undefined` \| `Account`, `TChainOverride`\>) => `Promise`\<\`0x$\{string}\`\>  }

#### Defined in

[src/secured-finance-client.ts:83](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L83)

## Accessors

### config

• `get` **config**(): [`SecuredFinanceClientConfig`](../interfaces/SecuredFinanceClientConfig.md)

#### Returns

[`SecuredFinanceClientConfig`](../interfaces/SecuredFinanceClientConfig.md)

#### Defined in

[src/secured-finance-client.ts:122](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L122)

___

### publicClient

• `get` **publicClient**(): `Object`

#### Returns

`Object`

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `undefined` | The Account of the Client. |
| `batch?` | \{ `multicall?`: `boolean` \| \{ `batchSize?`: `number` ; `wait?`: `number`  }  } | Flags for batch settings. |
| `batch.multicall?` | `boolean` \| \{ `batchSize?`: `number` ; `wait?`: `number`  } | Toggle to enable `eth_call` multicall aggregation. |
| `cacheTime` | `number` | Time (in ms) that cached data will remain in memory. |
| `call` | (`parameters`: `CallParameters`\<`undefined` \| `Chain`\>) => `Promise`\<`CallReturnType`\> | Executes a new message call immediately without submitting a transaction to the network. - Docs: https://viem.sh/docs/actions/public/call.html - JSON-RPC Methods: [`eth_call`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_call) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const data = await client.call({ account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', }) ``` |
| `chain` | `undefined` \| `Chain` | Chain for the client. |
| `createBlockFilter` | () => `Promise`\<\{ `id`: \`0x$\{string}\` ; `request`: `EIP1193RequestFn`\<readonly [\{ `Method`: ``"eth_getFilterChanges"`` ; `Parameters`: [filterId: \`0x$\{string}\`] ; `ReturnType`: \`0x$\{string}\`[] \| `RpcLog`[]  }, \{ `Method`: ``"eth_getFilterLogs"`` ; `Parameters`: [filterId: \`0x$\{string}\`] ; `ReturnType`: `RpcLog`[]  }, \{ `Method`: ``"eth_uninstallFilter"`` ; `Parameters`: [filterId: \`0x$\{string}\`] ; `ReturnType`: `boolean`  }]\> ; `type`: ``"block"``  }\> | Creates a Filter to listen for new block hashes that can be used with [`getFilterChanges`](https://viem.sh/docs/actions/public/getFilterChanges.html). - Docs: https://viem.sh/docs/actions/public/createBlockFilter.html - JSON-RPC Methods: [`eth_newBlockFilter`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_newBlockFilter) **`Example`** ```ts import { createPublicClient, createBlockFilter, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const filter = await createBlockFilter(client) // { id: "0x345a6572337856574a76364e457a4366", type: 'block' } ``` |
| `createContractEventFilter` | \<TAbi, TEventName, TArgs, TStrict, TFromBlock, TToBlock\>(`args`: `CreateContractEventFilterParameters`\<`TAbi`, `TEventName`, `TArgs`, `TStrict`, `TFromBlock`, `TToBlock`\>) => `Promise`\<`CreateContractEventFilterReturnType`\<`TAbi`, `TEventName`, `TArgs`, `TStrict`, `TFromBlock`, `TToBlock`\>\> | Creates a Filter to retrieve event logs that can be used with [`getFilterChanges`](https://viem.sh/docs/actions/public/getFilterChanges.html) or [`getFilterLogs`](https://viem.sh/docs/actions/public/getFilterLogs.html). - Docs: https://viem.sh/docs/contract/createContractEventFilter.html **`Example`** ```ts import { createPublicClient, http, parseAbi } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const filter = await client.createContractEventFilter({ abi: parseAbi(['event Transfer(address indexed, address indexed, uint256)']), }) ``` |
| `createEventFilter` | \<TAbiEvent, TAbiEvents, TStrict, TFromBlock, TToBlock, _EventName, _Args\>(`args?`: `CreateEventFilterParameters`\<`TAbiEvent`, `TAbiEvents`, `TStrict`, `TFromBlock`, `TToBlock`, `_EventName`, `_Args`\>) => `Promise`\<\{ [K in string \| number \| symbol]: Filter\<"event", TAbiEvents, \_EventName, \_Args, TStrict, TFromBlock, TToBlock\>[K] }\> | Creates a [`Filter`](https://viem.sh/docs/glossary/types.html#filter) to listen for new events that can be used with [`getFilterChanges`](https://viem.sh/docs/actions/public/getFilterChanges.html). - Docs: https://viem.sh/docs/actions/public/createEventFilter.html - JSON-RPC Methods: [`eth_newFilter`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_newfilter) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const filter = await client.createEventFilter({ address: '0xfba3912ca04dd458c843e2ee08967fc04f3579c2', }) ``` |
| `createPendingTransactionFilter` | () => `Promise`\<\{ `id`: \`0x$\{string}\` ; `request`: `EIP1193RequestFn`\<readonly [\{ `Method`: ``"eth_getFilterChanges"`` ; `Parameters`: [filterId: \`0x$\{string}\`] ; `ReturnType`: \`0x$\{string}\`[] \| `RpcLog`[]  }, \{ `Method`: ``"eth_getFilterLogs"`` ; `Parameters`: [filterId: \`0x$\{string}\`] ; `ReturnType`: `RpcLog`[]  }, \{ `Method`: ``"eth_uninstallFilter"`` ; `Parameters`: [filterId: \`0x$\{string}\`] ; `ReturnType`: `boolean`  }]\> ; `type`: ``"transaction"``  }\> | Creates a Filter to listen for new pending transaction hashes that can be used with [`getFilterChanges`](https://viem.sh/docs/actions/public/getFilterChanges.html). - Docs: https://viem.sh/docs/actions/public/createPendingTransactionFilter.html - JSON-RPC Methods: [`eth_newPendingTransactionFilter`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_newpendingtransactionfilter) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const filter = await client.createPendingTransactionFilter() // { id: "0x345a6572337856574a76364e457a4366", type: 'transaction' } ``` |
| `estimateContractGas` | \<TChain, TAbi, TFunctionName\>(`args`: `EstimateContractGasParameters`\<`TAbi`, `TFunctionName`, `TChain`, `undefined` \| `Account`\>) => `Promise`\<`bigint`\> | Estimates the gas required to successfully execute a contract write function call. - Docs: https://viem.sh/docs/contract/estimateContractGas.html **`Remarks`** Internally, uses a [Public Client](https://viem.sh/docs/clients/public.html) to call the [`estimateGas` action](https://viem.sh/docs/actions/public/estimateGas.html) with [ABI-encoded `data`](https://viem.sh/docs/contract/encodeFunctionData.html). **`Example`** ```ts import { createPublicClient, http, parseAbi } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const gas = await client.estimateContractGas({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi: parseAbi(['function mint() public']), functionName: 'mint', account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', }) ``` |
| `estimateFeesPerGas` | \<TChainOverride, TType\>(`args?`: `EstimateFeesPerGasParameters`\<`undefined` \| `Chain`, `TChainOverride`, `TType`\>) => `Promise`\<`EstimateFeesPerGasReturnType`\> | Returns an estimate for the fees per gas for a transaction to be included in the next block. - Docs: https://viem.sh/docs/actions/public/estimateFeesPerGas.html **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const maxPriorityFeePerGas = await client.estimateFeesPerGas() // { maxFeePerGas: ..., maxPriorityFeePerGas: ... } ``` |
| `estimateGas` | (`args`: `EstimateGasParameters`\<`undefined` \| `Chain`, `undefined` \| `Account`\>) => `Promise`\<`bigint`\> | Estimates the gas necessary to complete a transaction without submitting it to the network. - Docs: https://viem.sh/docs/actions/public/estimateGas.html - JSON-RPC Methods: [`eth_estimateGas`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_estimategas) **`Example`** ```ts import { createPublicClient, http, parseEther } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const gasEstimate = await client.estimateGas({ account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', value: parseEther('1'), }) ``` |
| `estimateMaxPriorityFeePerGas` | \<TChainOverride\>(`args?`: \{ `chain`: ``null`` \| `TChainOverride`  }) => `Promise`\<`bigint`\> | Returns an estimate for the max priority fee per gas (in wei) for a transaction to be included in the next block. - Docs: https://viem.sh/docs/actions/public/estimateMaxPriorityFeePerGas.html **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const maxPriorityFeePerGas = await client.estimateMaxPriorityFeePerGas() // 10000000n ``` |
| `extend` | \<client\>(`fn`: (`client`: `Client`\<`Transport`, `undefined` \| `Chain`, `undefined`, `PublicRpcSchema`, `PublicActions`\<`Transport`, `undefined` \| `Chain`\>\>) => `client`) => `Client`\<`Transport`, `undefined` \| `Chain`, `undefined`, `PublicRpcSchema`, \{ [K in string \| number \| symbol]: client[K] } & `PublicActions`\<`Transport`, `undefined` \| `Chain`\>\> | - |
| `getBalance` | (`args`: `GetBalanceParameters`) => `Promise`\<`bigint`\> | Returns the balance of an address in wei. - Docs: https://viem.sh/docs/actions/public/getBalance.html - JSON-RPC Methods: [`eth_getBalance`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getbalance) **`Remarks`** You can convert the balance to ether units with [`formatEther`](https://viem.sh/docs/utilities/formatEther.html). ```ts const balance = await getBalance(client, { address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', blockTag: 'safe' }) const balanceAsEther = formatEther(balance) // "6.942" ``` **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const balance = await client.getBalance({ address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', }) // 10000000000000000000000n (wei) ``` |
| `getBlock` | \<TIncludeTransactions, TBlockTag\>(`args?`: `GetBlockParameters`\<`TIncludeTransactions`, `TBlockTag`\>) => `Promise`\<`GetBlockReturnType`\<`undefined` \| `Chain`, `TIncludeTransactions`, `TBlockTag`\>\> | Returns information about a block at a block number, hash, or tag. - Docs: https://viem.sh/docs/actions/public/getBlock.html - Examples: https://stackblitz.com/github/wagmi-dev/viem/tree/main/examples/blocks/fetching-blocks - JSON-RPC Methods: - Calls [`eth_getBlockByNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblockbynumber) for `blockNumber` & `blockTag`. - Calls [`eth_getBlockByHash`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblockbyhash) for `blockHash`. **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const block = await client.getBlock() ``` |
| `getBlockNumber` | (`args?`: `GetBlockNumberParameters`) => `Promise`\<`bigint`\> | Returns the number of the most recent block seen. - Docs: https://viem.sh/docs/actions/public/getBlockNumber.html - Examples: https://stackblitz.com/github/wagmi-dev/viem/tree/main/examples/blocks/fetching-blocks - JSON-RPC Methods: [`eth_blockNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_blocknumber) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const blockNumber = await client.getBlockNumber() // 69420n ``` |
| `getBlockTransactionCount` | (`args?`: `GetBlockTransactionCountParameters`) => `Promise`\<`number`\> | Returns the number of Transactions at a block number, hash, or tag. - Docs: https://viem.sh/docs/actions/public/getBlockTransactionCount.html - JSON-RPC Methods: - Calls [`eth_getBlockTransactionCountByNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblocktransactioncountbynumber) for `blockNumber` & `blockTag`. - Calls [`eth_getBlockTransactionCountByHash`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblocktransactioncountbyhash) for `blockHash`. **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const count = await client.getBlockTransactionCount() ``` |
| `getBytecode` | (`args`: `GetBytecodeParameters`) => `Promise`\<`GetBytecodeReturnType`\> | Retrieves the bytecode at an address. - Docs: https://viem.sh/docs/contract/getBytecode.html - JSON-RPC Methods: [`eth_getCode`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getcode) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const code = await client.getBytecode({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', }) ``` |
| `getChainId` | () => `Promise`\<`number`\> | Returns the chain ID associated with the current network. - Docs: https://viem.sh/docs/actions/public/getChainId.html - JSON-RPC Methods: [`eth_chainId`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_chainid) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const chainId = await client.getChainId() // 1 ``` |
| `getContractEvents` | \<TAbi, TEventName, TStrict, TFromBlock, TToBlock\>(`args`: `GetContractEventsParameters`\<`TAbi`, `TEventName`, `TStrict`, `TFromBlock`, `TToBlock`\>) => `Promise`\<`GetContractEventsReturnType`\<`TAbi`, `TEventName`, `TStrict`, `TFromBlock`, `TToBlock`\>\> | Returns a list of event logs emitted by a contract. - Docs: https://viem.sh/docs/actions/public/getContractEvents.html - JSON-RPC Methods: [`eth_getLogs`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getlogs) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' import { wagmiAbi } from './abi' const client = createPublicClient({ chain: mainnet, transport: http(), }) const logs = await client.getContractEvents(client, { address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi: wagmiAbi, eventName: 'Transfer' }) ``` |
| `getEnsAddress` | (`args`: \{ `blockNumber?`: `bigint` ; `blockTag?`: `BlockTag` ; `coinType?`: `number` ; `name`: `string` ; `universalResolverAddress?`: \`0x$\{string}\`  }) => `Promise`\<`GetEnsAddressReturnType`\> | Gets address for ENS name. - Docs: https://viem.sh/docs/ens/actions/getEnsAddress.html - Examples: https://stackblitz.com/github/wagmi-dev/viem/tree/main/examples/ens **`Remarks`** Calls `resolve(bytes, bytes)` on ENS Universal Resolver Contract. Since ENS names prohibit certain forbidden characters (e.g. underscore) and have other validation rules, you likely want to [normalize ENS names](https://docs.ens.domains/contract-api-reference/name-processing#normalising-names) with [UTS-46 normalization](https://unicode.org/reports/tr46) before passing them to `getEnsAddress`. You can use the built-in [`normalize`](https://viem.sh/docs/ens/utilities/normalize.html) function for this. **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' import { normalize } from 'viem/ens' const client = createPublicClient({ chain: mainnet, transport: http(), }) const ensAddress = await client.getEnsAddress({ name: normalize('wagmi-dev.eth'), }) // '0xd2135CfB216b74109775236E36d4b433F1DF507B' ``` |
| `getEnsAvatar` | (`args`: \{ `blockNumber?`: `bigint` ; `blockTag?`: `BlockTag` ; `gatewayUrls?`: `AssetGatewayUrls` ; `name`: `string` ; `universalResolverAddress?`: \`0x$\{string}\`  }) => `Promise`\<`GetEnsAvatarReturnType`\> | Gets the avatar of an ENS name. - Docs: https://viem.sh/docs/ens/actions/getEnsAvatar.html - Examples: https://stackblitz.com/github/wagmi-dev/viem/tree/main/examples/ens **`Remarks`** Calls [`getEnsText`](https://viem.sh/docs/ens/actions/getEnsText.html) with `key` set to `'avatar'`. Since ENS names prohibit certain forbidden characters (e.g. underscore) and have other validation rules, you likely want to [normalize ENS names](https://docs.ens.domains/contract-api-reference/name-processing#normalising-names) with [UTS-46 normalization](https://unicode.org/reports/tr46) before passing them to `getEnsAddress`. You can use the built-in [`normalize`](https://viem.sh/docs/ens/utilities/normalize.html) function for this. **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' import { normalize } from 'viem/ens' const client = createPublicClient({ chain: mainnet, transport: http(), }) const ensAvatar = await client.getEnsAvatar({ name: normalize('wagmi-dev.eth'), }) // 'https://ipfs.io/ipfs/Qma8mnp6xV3J2cRNf3mTth5C8nV11CAnceVinc3y8jSbio' ``` |
| `getEnsName` | (`args`: \{ `address`: \`0x$\{string}\` ; `blockNumber?`: `bigint` ; `blockTag?`: `BlockTag` ; `universalResolverAddress?`: \`0x$\{string}\`  }) => `Promise`\<`GetEnsNameReturnType`\> | Gets primary name for specified address. - Docs: https://viem.sh/docs/ens/actions/getEnsName.html - Examples: https://stackblitz.com/github/wagmi-dev/viem/tree/main/examples/ens **`Remarks`** Calls `reverse(bytes)` on ENS Universal Resolver Contract to "reverse resolve" the address to the primary ENS name. **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const ensName = await client.getEnsName({ address: '0xd2135CfB216b74109775236E36d4b433F1DF507B', }) // 'wagmi-dev.eth' ``` |
| `getEnsResolver` | (`args`: \{ `blockNumber?`: `bigint` ; `blockTag?`: `BlockTag` ; `name`: `string` ; `universalResolverAddress?`: \`0x$\{string}\`  }) => `Promise`\<\`0x$\{string}\`\> | Gets resolver for ENS name. - Docs: https://viem.sh/docs/ens/actions/getEnsResolver.html - Examples: https://stackblitz.com/github/wagmi-dev/viem/tree/main/examples/ens **`Remarks`** Calls `findResolver(bytes)` on ENS Universal Resolver Contract to retrieve the resolver of an ENS name. Since ENS names prohibit certain forbidden characters (e.g. underscore) and have other validation rules, you likely want to [normalize ENS names](https://docs.ens.domains/contract-api-reference/name-processing#normalising-names) with [UTS-46 normalization](https://unicode.org/reports/tr46) before passing them to `getEnsAddress`. You can use the built-in [`normalize`](https://viem.sh/docs/ens/utilities/normalize.html) function for this. **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' import { normalize } from 'viem/ens' const client = createPublicClient({ chain: mainnet, transport: http(), }) const resolverAddress = await client.getEnsResolver({ name: normalize('wagmi-dev.eth'), }) // '0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41' ``` |
| `getEnsText` | (`args`: \{ `blockNumber?`: `bigint` ; `blockTag?`: `BlockTag` ; `key`: `string` ; `name`: `string` ; `universalResolverAddress?`: \`0x$\{string}\`  }) => `Promise`\<`GetEnsTextReturnType`\> | Gets a text record for specified ENS name. - Docs: https://viem.sh/docs/ens/actions/getEnsResolver.html - Examples: https://stackblitz.com/github/wagmi-dev/viem/tree/main/examples/ens **`Remarks`** Calls `resolve(bytes, bytes)` on ENS Universal Resolver Contract. Since ENS names prohibit certain forbidden characters (e.g. underscore) and have other validation rules, you likely want to [normalize ENS names](https://docs.ens.domains/contract-api-reference/name-processing#normalising-names) with [UTS-46 normalization](https://unicode.org/reports/tr46) before passing them to `getEnsAddress`. You can use the built-in [`normalize`](https://viem.sh/docs/ens/utilities/normalize.html) function for this. **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' import { normalize } from 'viem/ens' const client = createPublicClient({ chain: mainnet, transport: http(), }) const twitterRecord = await client.getEnsText({ name: normalize('wagmi-dev.eth'), key: 'com.twitter', }) // 'wagmi_sh' ``` |
| `getFeeHistory` | (`args`: `GetFeeHistoryParameters`) => `Promise`\<`GetFeeHistoryReturnType`\> | Returns a collection of historical gas information. - Docs: https://viem.sh/docs/actions/public/getFeeHistory.html - JSON-RPC Methods: [`eth_feeHistory`](https://docs.alchemy.com/reference/eth-feehistory) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const feeHistory = await client.getFeeHistory({ blockCount: 4, rewardPercentiles: [25, 75], }) ``` |
| `getFilterChanges` | \<TFilterType, TAbi, TEventName, TStrict, TFromBlock, TToBlock\>(`args`: `GetFilterChangesParameters`\<`TFilterType`, `TAbi`, `TEventName`, `TStrict`, `TFromBlock`, `TToBlock`\>) => `Promise`\<`GetFilterChangesReturnType`\<`TFilterType`, `TAbi`, `TEventName`, `TStrict`, `TFromBlock`, `TToBlock`\>\> | Returns a list of logs or hashes based on a [Filter](/docs/glossary/terms#filter) since the last time it was called. - Docs: https://viem.sh/docs/actions/public/getFilterChanges.html - JSON-RPC Methods: [`eth_getFilterChanges`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getfilterchanges) **`Remarks`** A Filter can be created from the following actions: - [`createBlockFilter`](https://viem.sh/docs/actions/public/createBlockFilter.html) - [`createContractEventFilter`](https://viem.sh/docs/contract/createContractEventFilter.html) - [`createEventFilter`](https://viem.sh/docs/actions/public/createEventFilter.html) - [`createPendingTransactionFilter`](https://viem.sh/docs/actions/public/createPendingTransactionFilter.html) Depending on the type of filter, the return value will be different: - If the filter was created with `createContractEventFilter` or `createEventFilter`, it returns a list of logs. - If the filter was created with `createPendingTransactionFilter`, it returns a list of transaction hashes. - If the filter was created with `createBlockFilter`, it returns a list of block hashes. **`Example`** ```ts // Blocks import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const filter = await client.createBlockFilter() const hashes = await client.getFilterChanges({ filter }) ``` **`Example`** ```ts // Contract Events import { createPublicClient, http, parseAbi } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const filter = await client.createContractEventFilter({ address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', abi: parseAbi(['event Transfer(address indexed, address indexed, uint256)']), eventName: 'Transfer', }) const logs = await client.getFilterChanges({ filter }) ``` **`Example`** ```ts // Raw Events import { createPublicClient, http, parseAbiItem } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const filter = await client.createEventFilter({ address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', event: parseAbiItem('event Transfer(address indexed, address indexed, uint256)'), }) const logs = await client.getFilterChanges({ filter }) ``` **`Example`** ```ts // Transactions import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const filter = await client.createPendingTransactionFilter() const hashes = await client.getFilterChanges({ filter }) ``` |
| `getFilterLogs` | \<TAbi, TEventName, TStrict, TFromBlock, TToBlock\>(`args`: `GetFilterLogsParameters`\<`TAbi`, `TEventName`, `TStrict`, `TFromBlock`, `TToBlock`\>) => `Promise`\<`GetFilterLogsReturnType`\<`TAbi`, `TEventName`, `TStrict`, `TFromBlock`, `TToBlock`\>\> | Returns a list of event logs since the filter was created. - Docs: https://viem.sh/docs/actions/public/getFilterLogs.html - JSON-RPC Methods: [`eth_getFilterLogs`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getfilterlogs) **`Remarks`** `getFilterLogs` is only compatible with **event filters**. **`Example`** ```ts import { createPublicClient, http, parseAbiItem } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const filter = await client.createEventFilter({ address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', event: parseAbiItem('event Transfer(address indexed, address indexed, uint256)'), }) const logs = await client.getFilterLogs({ filter }) ``` |
| `getGasPrice` | () => `Promise`\<`bigint`\> | Returns the current price of gas (in wei). - Docs: https://viem.sh/docs/actions/public/getGasPrice.html - JSON-RPC Methods: [`eth_gasPrice`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_gasprice) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const gasPrice = await client.getGasPrice() ``` |
| `getLogs` | \<TAbiEvent, TAbiEvents, TStrict, TFromBlock, TToBlock\>(`args?`: `GetLogsParameters`\<`TAbiEvent`, `TAbiEvents`, `TStrict`, `TFromBlock`, `TToBlock`\>) => `Promise`\<`GetLogsReturnType`\<`TAbiEvent`, `TAbiEvents`, `TStrict`, `TFromBlock`, `TToBlock`\>\> | Returns a list of event logs matching the provided parameters. - Docs: https://viem.sh/docs/actions/public/getLogs.html - Examples: https://stackblitz.com/github/wagmi-dev/viem/tree/main/examples/filters-and-logs/event-logs - JSON-RPC Methods: [`eth_getLogs`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getlogs) **`Example`** ```ts import { createPublicClient, http, parseAbiItem } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const logs = await client.getLogs() ``` |
| `getProof` | (`args`: `GetProofParameters`) => `Promise`\<`GetProofReturnType`\> | Returns the account and storage values of the specified account including the Merkle-proof. - Docs: https://viem.sh/docs/actions/public/getProof.html - JSON-RPC Methods: - Calls [`eth_getProof`](https://eips.ethereum.org/EIPS/eip-1186) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const block = await client.getProof({ address: '0x...', storageKeys: ['0x...'], }) ``` |
| `getStorageAt` | (`args`: `GetStorageAtParameters`) => `Promise`\<`GetStorageAtReturnType`\> | Returns the value from a storage slot at a given address. - Docs: https://viem.sh/docs/contract/getStorageAt.html - JSON-RPC Methods: [`eth_getStorageAt`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getstorageat) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' import { getStorageAt } from 'viem/contract' const client = createPublicClient({ chain: mainnet, transport: http(), }) const code = await client.getStorageAt({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', slot: toHex(0), }) ``` |
| `getTransaction` | \<TBlockTag\>(`args`: `GetTransactionParameters`\<`TBlockTag`\>) => `Promise`\<`GetTransactionReturnType`\<`undefined` \| `Chain`, `TBlockTag`\>\> | Returns information about a [Transaction](https://viem.sh/docs/glossary/terms.html#transaction) given a hash or block identifier. - Docs: https://viem.sh/docs/actions/public/getTransaction.html - Example: https://stackblitz.com/github/wagmi-dev/viem/tree/main/examples/transactions/fetching-transactions - JSON-RPC Methods: [`eth_getTransactionByHash`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getTransactionByHash) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const transaction = await client.getTransaction({ hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d', }) ``` |
| `getTransactionConfirmations` | (`args`: `GetTransactionConfirmationsParameters`\<`undefined` \| `Chain`\>) => `Promise`\<`bigint`\> | Returns the number of blocks passed (confirmations) since the transaction was processed on a block. - Docs: https://viem.sh/docs/actions/public/getTransactionConfirmations.html - Example: https://stackblitz.com/github/wagmi-dev/viem/tree/main/examples/transactions/fetching-transactions - JSON-RPC Methods: [`eth_getTransactionConfirmations`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getTransactionConfirmations) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const confirmations = await client.getTransactionConfirmations({ hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d', }) ``` |
| `getTransactionCount` | (`args`: `GetTransactionCountParameters`) => `Promise`\<`number`\> | Returns the number of [Transactions](https://viem.sh/docs/glossary/terms.html#transaction) an Account has broadcast / sent. - Docs: https://viem.sh/docs/actions/public/getTransactionCount.html - JSON-RPC Methods: [`eth_getTransactionCount`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_gettransactioncount) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const transactionCount = await client.getTransactionCount({ address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', }) ``` |
| `getTransactionReceipt` | (`args`: `GetTransactionReceiptParameters`) => `Promise`\<`TransactionReceipt`\> | Returns the [Transaction Receipt](https://viem.sh/docs/glossary/terms.html#transaction-receipt) given a [Transaction](https://viem.sh/docs/glossary/terms.html#transaction) hash. - Docs: https://viem.sh/docs/actions/public/getTransactionReceipt.html - Example: https://stackblitz.com/github/wagmi-dev/viem/tree/main/examples/transactions/fetching-transactions - JSON-RPC Methods: [`eth_getTransactionReceipt`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getTransactionReceipt) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const transactionReceipt = await client.getTransactionReceipt({ hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d', }) ``` |
| `key` | `string` | A key for the client. |
| `multicall` | \<TContracts, TAllowFailure\>(`args`: `MulticallParameters`\<`TContracts`, `TAllowFailure`\>) => `Promise`\<`MulticallReturnType`\<`TContracts`, `TAllowFailure`\>\> | Similar to [`readContract`](https://viem.sh/docs/contract/readContract.html), but batches up multiple functions on a contract in a single RPC call via the [`multicall3` contract](https://github.com/mds1/multicall). - Docs: https://viem.sh/docs/contract/multicall.html **`Example`** ```ts import { createPublicClient, http, parseAbi } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const abi = parseAbi([ 'function balanceOf(address) view returns (uint256)', 'function totalSupply() view returns (uint256)', ]) const result = await client.multicall({ contracts: [ { address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi, functionName: 'balanceOf', args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e'], }, { address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi, functionName: 'totalSupply', }, ], }) // [{ result: 424122n, status: 'success' }, { result: 1000000n, status: 'success' }] ``` |
| `name` | `string` | A name for the client. |
| `pollingInterval` | `number` | Frequency (in ms) for polling enabled actions & events. Defaults to 4_000 milliseconds. |
| `prepareTransactionRequest` | \<TChainOverride\>(`args`: `PrepareTransactionRequestParameters`\<`undefined` \| `Chain`, `undefined` \| `Account`, `TChainOverride`\>) => `Promise`\<`PrepareTransactionRequestReturnType`\> | Prepares a transaction request for signing. - Docs: https://viem.sh/docs/actions/wallet/prepareTransactionRequest.html **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const request = await client.prepareTransactionRequest({ account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', to: '0x0000000000000000000000000000000000000000', value: 1n, }) ``` **`Example`** ```ts // Account Hoisting import { createWalletClient, http } from 'viem' import { privateKeyToAccount } from 'viem/accounts' import { mainnet } from 'viem/chains' const client = createWalletClient({ account: privateKeyToAccount('0x…'), chain: mainnet, transport: custom(window.ethereum), }) const request = await client.prepareTransactionRequest({ to: '0x0000000000000000000000000000000000000000', value: 1n, }) ``` |
| `readContract` | \<TAbi, TFunctionName\>(`args`: `ReadContractParameters`\<`TAbi`, `TFunctionName`\>) => `Promise`\<`ReadContractReturnType`\<`TAbi`, `TFunctionName`\>\> | Calls a read-only function on a contract, and returns the response. - Docs: https://viem.sh/docs/contract/readContract.html - Examples: https://stackblitz.com/github/wagmi-dev/viem/tree/main/examples/contracts/reading-contracts **`Remarks`** A "read-only" function (constant function) on a Solidity contract is denoted by a `view` or `pure` keyword. They can only read the state of the contract, and cannot make any changes to it. Since read-only methods do not change the state of the contract, they do not require any gas to be executed, and can be called by any user without the need to pay for gas. Internally, uses a [Public Client](https://viem.sh/docs/clients/public.html) to call the [`call` action](https://viem.sh/docs/actions/public/call.html) with [ABI-encoded `data`](https://viem.sh/docs/contract/encodeFunctionData.html). **`Example`** ```ts import { createPublicClient, http, parseAbi } from 'viem' import { mainnet } from 'viem/chains' import { readContract } from 'viem/contract' const client = createPublicClient({ chain: mainnet, transport: http(), }) const result = await client.readContract({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi: parseAbi(['function balanceOf(address) view returns (uint256)']), functionName: 'balanceOf', args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e'], }) // 424122n ``` |
| `request` | `EIP1193RequestFn`\<`PublicRpcSchema`\> | Request function wrapped with friendly error handling |
| `sendRawTransaction` | (`args`: `SendRawTransactionParameters`) => `Promise`\<\`0x$\{string}\`\> | Sends a **signed** transaction to the network - Docs: https://viem.sh/docs/actions/wallet/sendRawTransaction.html - JSON-RPC Method: [`eth_sendRawTransaction`](https://ethereum.github.io/execution-apis/api-documentation/) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' import { sendRawTransaction } from 'viem/wallet' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const hash = await client.sendRawTransaction({ serializedTransaction: '0x02f850018203118080825208808080c080a04012522854168b27e5dc3d5839bab5e6b39e1a0ffd343901ce1622e3d64b48f1a04e00902ae0502c4728cbf12156290df99c3ed7de85b1dbfe20b5c36931733a33' }) ``` |
| `simulateContract` | \<TAbi, TFunctionName, TChainOverride\>(`args`: `SimulateContractParameters`\<`TAbi`, `TFunctionName`, `undefined` \| `Chain`, `TChainOverride`\>) => `Promise`\<`SimulateContractReturnType`\<`TAbi`, `TFunctionName`, `undefined` \| `Chain`, `TChainOverride`\>\> | Simulates/validates a contract interaction. This is useful for retrieving **return data** and **revert reasons** of contract write functions. - Docs: https://viem.sh/docs/contract/simulateContract.html - Examples: https://stackblitz.com/github/wagmi-dev/viem/tree/main/examples/contracts/writing-to-contracts **`Remarks`** This function does not require gas to execute and _**does not**_ change the state of the blockchain. It is almost identical to [`readContract`](https://viem.sh/docs/contract/readContract.html), but also supports contract write functions. Internally, uses a [Public Client](https://viem.sh/docs/clients/public.html) to call the [`call` action](https://viem.sh/docs/actions/public/call.html) with [ABI-encoded `data`](https://viem.sh/docs/contract/encodeFunctionData.html). **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const result = await client.simulateContract({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi: parseAbi(['function mint(uint32) view returns (uint32)']), functionName: 'mint', args: ['69420'], account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', }) ``` |
| `transport` | `TransportConfig`\<`string`, `EIP1193RequestFn`\> & `Record`\<`string`, `any`\> | The RPC transport |
| `type` | `string` | The type of client. |
| `uid` | `string` | A unique ID for the client. |
| `uninstallFilter` | (`args`: `UninstallFilterParameters`) => `Promise`\<`boolean`\> | Destroys a Filter that was created from one of the following Actions: - [`createBlockFilter`](https://viem.sh/docs/actions/public/createBlockFilter.html) - [`createEventFilter`](https://viem.sh/docs/actions/public/createEventFilter.html) - [`createPendingTransactionFilter`](https://viem.sh/docs/actions/public/createPendingTransactionFilter.html) - Docs: https://viem.sh/docs/actions/public/uninstallFilter.html - JSON-RPC Methods: [`eth_uninstallFilter`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_uninstallFilter) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' import { createPendingTransactionFilter, uninstallFilter } from 'viem/public' const filter = await client.createPendingTransactionFilter() const uninstalled = await client.uninstallFilter({ filter }) // true ``` |
| `verifyMessage` | (`args`: `VerifyMessageParameters`) => `Promise`\<`boolean`\> | - |
| `verifyTypedData` | (`args`: `VerifyTypedDataParameters`) => `Promise`\<`boolean`\> | - |
| `waitForTransactionReceipt` | (`args`: `WaitForTransactionReceiptParameters`\<`undefined` \| `Chain`\>) => `Promise`\<`TransactionReceipt`\> | Waits for the [Transaction](https://viem.sh/docs/glossary/terms.html#transaction) to be included on a [Block](https://viem.sh/docs/glossary/terms.html#block) (one confirmation), and then returns the [Transaction Receipt](https://viem.sh/docs/glossary/terms.html#transaction-receipt). If the Transaction reverts, then the action will throw an error. - Docs: https://viem.sh/docs/actions/public/waitForTransactionReceipt.html - Example: https://stackblitz.com/github/wagmi-dev/viem/tree/main/examples/transactions/sending-transactions - JSON-RPC Methods: - Polls [`eth_getTransactionReceipt`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getTransactionReceipt) on each block until it has been processed. - If a Transaction has been replaced: - Calls [`eth_getBlockByNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblockbynumber) and extracts the transactions - Checks if one of the Transactions is a replacement - If so, calls [`eth_getTransactionReceipt`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getTransactionReceipt). **`Remarks`** The `waitForTransactionReceipt` action additionally supports Replacement detection (e.g. sped up Transactions). Transactions can be replaced when a user modifies their transaction in their wallet (to speed up or cancel). Transactions are replaced when they are sent from the same nonce. There are 3 types of Transaction Replacement reasons: - `repriced`: The gas price has been modified (e.g. different `maxFeePerGas`) - `cancelled`: The Transaction has been cancelled (e.g. `value === 0n`) - `replaced`: The Transaction has been replaced (e.g. different `value` or `data`) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const transactionReceipt = await client.waitForTransactionReceipt({ hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d', }) ``` |
| `watchBlockNumber` | (`args`: `WatchBlockNumberParameters`) => `WatchBlockNumberReturnType` | Watches and returns incoming block numbers. - Docs: https://viem.sh/docs/actions/public/watchBlockNumber.html - Examples: https://stackblitz.com/github/wagmi-dev/viem/tree/main/examples/blocks/watching-blocks - JSON-RPC Methods: - When `poll: true`, calls [`eth_blockNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_blocknumber) on a polling interval. - When `poll: false` & WebSocket Transport, uses a WebSocket subscription via [`eth_subscribe`](https://docs.alchemy.com/reference/eth-subscribe-polygon) and the `"newHeads"` event. **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const unwatch = await client.watchBlockNumber({ onBlockNumber: (blockNumber) => console.log(blockNumber), }) ``` |
| `watchBlocks` | \<TIncludeTransactions, TBlockTag\>(`args`: `WatchBlocksParameters`\<`Transport`, `undefined` \| `Chain`, `TIncludeTransactions`, `TBlockTag`\>) => `WatchBlocksReturnType` | Watches and returns information for incoming blocks. - Docs: https://viem.sh/docs/actions/public/watchBlocks.html - Examples: https://stackblitz.com/github/wagmi-dev/viem/tree/main/examples/blocks/watching-blocks - JSON-RPC Methods: - When `poll: true`, calls [`eth_getBlockByNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getBlockByNumber) on a polling interval. - When `poll: false` & WebSocket Transport, uses a WebSocket subscription via [`eth_subscribe`](https://docs.alchemy.com/reference/eth-subscribe-polygon) and the `"newHeads"` event. **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const unwatch = await client.watchBlocks({ onBlock: (block) => console.log(block), }) ``` |
| `watchContractEvent` | \<TAbi, TEventName, TStrict\>(`args`: `WatchContractEventParameters`\<`TAbi`, `TEventName`, `TStrict`\>) => `WatchContractEventReturnType` | Watches and returns emitted contract event logs. - Docs: https://viem.sh/docs/contract/watchContractEvent.html **`Remarks`** This Action will batch up all the event logs found within the [`pollingInterval`](https://viem.sh/docs/contract/watchContractEvent.html#pollinginterval-optional), and invoke them via [`onLogs`](https://viem.sh/docs/contract/watchContractEvent.html#onLogs). `watchContractEvent` will attempt to create an [Event Filter](https://viem.sh/docs/contract/createContractEventFilter.html) and listen to changes to the Filter per polling interval, however, if the RPC Provider does not support Filters (e.g. `eth_newFilter`), then `watchContractEvent` will fall back to using [`getLogs`](https://viem.sh/docs/actions/public/getLogs.html) instead. **`Example`** ```ts import { createPublicClient, http, parseAbi } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const unwatch = client.watchContractEvent({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi: parseAbi(['event Transfer(address indexed from, address indexed to, uint256 value)']), eventName: 'Transfer', args: { from: '0xc961145a54C96E3aE9bAA048c4F4D6b04C13916b' }, onLogs: (logs) => console.log(logs), }) ``` |
| `watchEvent` | \<TAbiEvent, TAbiEvents, TStrict\>(`args`: `WatchEventParameters`\<`TAbiEvent`, `TAbiEvents`, `TStrict`\>) => `WatchEventReturnType` | Watches and returns emitted [Event Logs](https://viem.sh/docs/glossary/terms.html#event-log). - Docs: https://viem.sh/docs/actions/public/watchEvent.html - JSON-RPC Methods: - **RPC Provider supports `eth_newFilter`:** - Calls [`eth_newFilter`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_newfilter) to create a filter (called on initialize). - On a polling interval, it will call [`eth_getFilterChanges`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getfilterchanges). - **RPC Provider does not support `eth_newFilter`:** - Calls [`eth_getLogs`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getlogs) for each block between the polling interval. **`Remarks`** This Action will batch up all the Event Logs found within the [`pollingInterval`](https://viem.sh/docs/actions/public/watchEvent.html#pollinginterval-optional), and invoke them via [`onLogs`](https://viem.sh/docs/actions/public/watchEvent.html#onLogs). `watchEvent` will attempt to create an [Event Filter](https://viem.sh/docs/actions/public/createEventFilter.html) and listen to changes to the Filter per polling interval, however, if the RPC Provider does not support Filters (e.g. `eth_newFilter`), then `watchEvent` will fall back to using [`getLogs`](https://viem.sh/docs/actions/public/getLogs.html) instead. **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const unwatch = client.watchEvent({ onLogs: (logs) => console.log(logs), }) ``` |
| `watchPendingTransactions` | (`args`: `WatchPendingTransactionsParameters`\<`Transport`\>) => `WatchPendingTransactionsReturnType` | Watches and returns pending transaction hashes. - Docs: https://viem.sh/docs/actions/public/watchPendingTransactions.html - JSON-RPC Methods: - When `poll: true` - Calls [`eth_newPendingTransactionFilter`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_newpendingtransactionfilter) to initialize the filter. - Calls [`eth_getFilterChanges`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getFilterChanges) on a polling interval. - When `poll: false` & WebSocket Transport, uses a WebSocket subscription via [`eth_subscribe`](https://docs.alchemy.com/reference/eth-subscribe-polygon) and the `"newPendingTransactions"` event. **`Remarks`** This Action will batch up all the pending transactions found within the [`pollingInterval`](https://viem.sh/docs/actions/public/watchPendingTransactions.html#pollinginterval-optional), and invoke them via [`onTransactions`](https://viem.sh/docs/actions/public/watchPendingTransactions.html#ontransactions). **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const unwatch = await client.watchPendingTransactions({ onTransactions: (hashes) => console.log(hashes), }) ``` |

#### Defined in

[src/secured-finance-client.ts:127](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L127)

___

### tokenVault

• `get` **tokenVault**(): `TokenVault`

#### Returns

`TokenVault`

#### Defined in

[src/secured-finance-client.ts:137](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L137)

___

### walletClient

• `get` **walletClient**(): `Object`

#### Returns

`Object`

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `undefined` \| `Account` | The Account of the Client. |
| `addChain` | (`args`: `AddChainParameters`) => `Promise`\<`void`\> | Adds an EVM chain to the wallet. - Docs: https://viem.sh/docs/actions/wallet/addChain.html - JSON-RPC Methods: [`eth_addEthereumChain`](https://eips.ethereum.org/EIPS/eip-3085) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { optimism } from 'viem/chains' const client = createWalletClient({ transport: custom(window.ethereum), }) await client.addChain({ chain: optimism }) ``` |
| `batch?` | \{ `multicall?`: `boolean` \| \{ `batchSize?`: `number` ; `wait?`: `number`  }  } | Flags for batch settings. |
| `batch.multicall?` | `boolean` \| \{ `batchSize?`: `number` ; `wait?`: `number`  } | Toggle to enable `eth_call` multicall aggregation. |
| `cacheTime` | `number` | Time (in ms) that cached data will remain in memory. |
| `chain` | `undefined` \| `Chain` | Chain for the client. |
| `deployContract` | \<TAbi, TChainOverride\>(`args`: `DeployContractParameters`\<`TAbi`, `undefined` \| `Chain`, `undefined` \| `Account`, `TChainOverride`\>) => `Promise`\<\`0x$\{string}\`\> | Deploys a contract to the network, given bytecode and constructor arguments. - Docs: https://viem.sh/docs/contract/deployContract.html - Examples: https://stackblitz.com/github/wagmi-dev/viem/tree/main/examples/contracts/deploying-contracts **`Example`** ```ts import { createWalletClient, http } from 'viem' import { privateKeyToAccount } from 'viem/accounts' import { mainnet } from 'viem/chains' const client = createWalletClient({ account: privateKeyToAccount('0x…'), chain: mainnet, transport: http(), }) const hash = await client.deployContract({ abi: [], account: '0x…, bytecode: '0x608060405260405161083e38038061083e833981016040819052610...', }) ``` |
| `extend` | \<client\>(`fn`: (`client`: `Client`\<`Transport`, `undefined` \| `Chain`, `undefined` \| `Account`, `WalletRpcSchema`, `WalletActions`\<`undefined` \| `Chain`, `undefined` \| `Account`\>\>) => `client`) => `Client`\<`Transport`, `undefined` \| `Chain`, `undefined` \| `Account`, `WalletRpcSchema`, \{ [K in string \| number \| symbol]: client[K] } & `WalletActions`\<`undefined` \| `Chain`, `undefined` \| `Account`\>\> | - |
| `getAddresses` | () => `Promise`\<`GetAddressesReturnType`\> | Returns a list of account addresses owned by the wallet or client. - Docs: https://viem.sh/docs/actions/wallet/getAddresses.html - JSON-RPC Methods: [`eth_accounts`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_accounts) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const accounts = await client.getAddresses() ``` |
| `getChainId` | () => `Promise`\<`number`\> | Returns the chain ID associated with the current network. - Docs: https://viem.sh/docs/actions/public/getChainId.html - JSON-RPC Methods: [`eth_chainId`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_chainid) **`Example`** ```ts import { createWalletClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const chainId = await client.getChainId() // 1 ``` |
| `getPermissions` | () => `Promise`\<`GetPermissionsReturnType`\> | Gets the wallets current permissions. - Docs: https://viem.sh/docs/actions/wallet/getPermissions.html - JSON-RPC Methods: [`wallet_getPermissions`](https://eips.ethereum.org/EIPS/eip-2255) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const permissions = await client.getPermissions() ``` |
| `key` | `string` | A key for the client. |
| `name` | `string` | A name for the client. |
| `pollingInterval` | `number` | Frequency (in ms) for polling enabled actions & events. Defaults to 4_000 milliseconds. |
| `prepareTransactionRequest` | \<TChainOverride\>(`args`: `PrepareTransactionRequestParameters`\<`undefined` \| `Chain`, `undefined` \| `Account`, `TChainOverride`\>) => `Promise`\<`PrepareTransactionRequestReturnType`\> | Prepares a transaction request for signing. - Docs: https://viem.sh/docs/actions/wallet/prepareTransactionRequest.html **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const request = await client.prepareTransactionRequest({ account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', to: '0x0000000000000000000000000000000000000000', value: 1n, }) ``` **`Example`** ```ts // Account Hoisting import { createWalletClient, http } from 'viem' import { privateKeyToAccount } from 'viem/accounts' import { mainnet } from 'viem/chains' const client = createWalletClient({ account: privateKeyToAccount('0x…'), chain: mainnet, transport: custom(window.ethereum), }) const request = await client.prepareTransactionRequest({ to: '0x0000000000000000000000000000000000000000', value: 1n, }) ``` |
| `request` | `EIP1193RequestFn`\<`WalletRpcSchema`\> | Request function wrapped with friendly error handling |
| `requestAddresses` | () => `Promise`\<`RequestAddressesReturnType`\> | Requests a list of accounts managed by a wallet. - Docs: https://viem.sh/docs/actions/wallet/requestAddresses.html - JSON-RPC Methods: [`eth_requestAccounts`](https://eips.ethereum.org/EIPS/eip-1102) Sends a request to the wallet, asking for permission to access the user's accounts. After the user accepts the request, it will return a list of accounts (addresses). This API can be useful for dapps that need to access the user's accounts in order to execute transactions or interact with smart contracts. **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const accounts = await client.requestAddresses() ``` |
| `requestPermissions` | (`args`: \{ `eth_accounts`: `Record`\<`string`, `any`\>  }) => `Promise`\<`RequestPermissionsReturnType`\> | Requests permissions for a wallet. - Docs: https://viem.sh/docs/actions/wallet/requestPermissions.html - JSON-RPC Methods: [`wallet_requestPermissions`](https://eips.ethereum.org/EIPS/eip-2255) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const permissions = await client.requestPermissions({ eth_accounts: {} }) ``` |
| `sendRawTransaction` | (`args`: `SendRawTransactionParameters`) => `Promise`\<\`0x$\{string}\`\> | Sends a **signed** transaction to the network - Docs: https://viem.sh/docs/actions/wallet/sendRawTransaction.html - JSON-RPC Method: [`eth_sendRawTransaction`](https://ethereum.github.io/execution-apis/api-documentation/) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' import { sendRawTransaction } from 'viem/wallet' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const hash = await client.sendRawTransaction({ serializedTransaction: '0x02f850018203118080825208808080c080a04012522854168b27e5dc3d5839bab5e6b39e1a0ffd343901ce1622e3d64b48f1a04e00902ae0502c4728cbf12156290df99c3ed7de85b1dbfe20b5c36931733a33' }) ``` |
| `sendTransaction` | \<TChainOverride\>(`args`: `SendTransactionParameters`\<`undefined` \| `Chain`, `undefined` \| `Account`, `TChainOverride`\>) => `Promise`\<\`0x$\{string}\`\> | Creates, signs, and sends a new transaction to the network. - Docs: https://viem.sh/docs/actions/wallet/sendTransaction.html - Examples: https://stackblitz.com/github/wagmi-dev/viem/tree/main/examples/transactions/sending-transactions - JSON-RPC Methods: - JSON-RPC Accounts: [`eth_sendTransaction`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendtransaction) - Local Accounts: [`eth_sendRawTransaction`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendrawtransaction) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const hash = await client.sendTransaction({ account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', value: 1000000000000000000n, }) ``` **`Example`** ```ts // Account Hoisting import { createWalletClient, http } from 'viem' import { privateKeyToAccount } from 'viem/accounts' import { mainnet } from 'viem/chains' const client = createWalletClient({ account: privateKeyToAccount('0x…'), chain: mainnet, transport: http(), }) const hash = await client.sendTransaction({ to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', value: 1000000000000000000n, }) ``` |
| `signMessage` | (`args`: `SignMessageParameters`\<`undefined` \| `Account`\>) => `Promise`\<\`0x$\{string}\`\> | Calculates an Ethereum-specific signature in [EIP-191 format](https://eips.ethereum.org/EIPS/eip-191): `keccak256("\x19Ethereum Signed Message:\n" + len(message) + message))`. - Docs: https://viem.sh/docs/actions/wallet/signMessage.html - JSON-RPC Methods: - JSON-RPC Accounts: [`personal_sign`](https://docs.metamask.io/guide/signing-data.html#personal-sign) - Local Accounts: Signs locally. No JSON-RPC request. With the calculated signature, you can: - use [`verifyMessage`](https://viem.sh/docs/utilities/verifyMessage.html) to verify the signature, - use [`recoverMessageAddress`](https://viem.sh/docs/utilities/recoverMessageAddress.html) to recover the signing address from a signature. **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const signature = await client.signMessage({ account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', message: 'hello world', }) ``` **`Example`** ```ts // Account Hoisting import { createWalletClient, http } from 'viem' import { privateKeyToAccount } from 'viem/accounts' import { mainnet } from 'viem/chains' const client = createWalletClient({ account: privateKeyToAccount('0x…'), chain: mainnet, transport: http(), }) const signature = await client.signMessage({ message: 'hello world', }) ``` |
| `signTransaction` | \<TChainOverride\>(`args`: `SignTransactionParameters`\<`undefined` \| `Chain`, `undefined` \| `Account`, `TChainOverride`\>) => `Promise`\<\`0x$\{string}\`\> | Signs a transaction. - Docs: https://viem.sh/docs/actions/wallet/signTransaction.html - JSON-RPC Methods: - JSON-RPC Accounts: [`eth_signTransaction`](https://ethereum.github.io/execution-apis/api-documentation/) - Local Accounts: Signs locally. No JSON-RPC request. **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const request = await client.prepareTransactionRequest({ account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', to: '0x0000000000000000000000000000000000000000', value: 1n, }) const signature = await client.signTransaction(request) ``` **`Example`** ```ts // Account Hoisting import { createWalletClient, http } from 'viem' import { privateKeyToAccount } from 'viem/accounts' import { mainnet } from 'viem/chains' const client = createWalletClient({ account: privateKeyToAccount('0x…'), chain: mainnet, transport: custom(window.ethereum), }) const request = await client.prepareTransactionRequest({ to: '0x0000000000000000000000000000000000000000', value: 1n, }) const signature = await client.signTransaction(request) ``` |
| `signTypedData` | \<TTypedData, TPrimaryType\>(`args`: `SignTypedDataParameters`\<`TTypedData`, `TPrimaryType`, `undefined` \| `Account`\>) => `Promise`\<\`0x$\{string}\`\> | Signs typed data and calculates an Ethereum-specific signature in [EIP-191 format](https://eips.ethereum.org/EIPS/eip-191): `keccak256("\x19Ethereum Signed Message:\n" + len(message) + message))`. - Docs: https://viem.sh/docs/actions/wallet/signTypedData.html - JSON-RPC Methods: - JSON-RPC Accounts: [`eth_signTypedData_v4`](https://docs.metamask.io/guide/signing-data.html#signtypeddata-v4) - Local Accounts: Signs locally. No JSON-RPC request. **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const signature = await client.signTypedData({ account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', domain: { name: 'Ether Mail', version: '1', chainId: 1, verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC', }, types: { Person: [ { name: 'name', type: 'string' }, { name: 'wallet', type: 'address' }, ], Mail: [ { name: 'from', type: 'Person' }, { name: 'to', type: 'Person' }, { name: 'contents', type: 'string' }, ], }, primaryType: 'Mail', message: { from: { name: 'Cow', wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826', }, to: { name: 'Bob', wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB', }, contents: 'Hello, Bob!', }, }) ``` **`Example`** ```ts // Account Hoisting import { createWalletClient, http } from 'viem' import { privateKeyToAccount } from 'viem/accounts' import { mainnet } from 'viem/chains' const client = createWalletClient({ account: privateKeyToAccount('0x…'), chain: mainnet, transport: http(), }) const signature = await client.signTypedData({ domain: { name: 'Ether Mail', version: '1', chainId: 1, verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC', }, types: { Person: [ { name: 'name', type: 'string' }, { name: 'wallet', type: 'address' }, ], Mail: [ { name: 'from', type: 'Person' }, { name: 'to', type: 'Person' }, { name: 'contents', type: 'string' }, ], }, primaryType: 'Mail', message: { from: { name: 'Cow', wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826', }, to: { name: 'Bob', wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB', }, contents: 'Hello, Bob!', }, }) ``` |
| `switchChain` | (`args`: `SwitchChainParameters`) => `Promise`\<`void`\> | Switch the target chain in a wallet. - Docs: https://viem.sh/docs/actions/wallet/switchChain.html - JSON-RPC Methods: [`eth_switchEthereumChain`](https://eips.ethereum.org/EIPS/eip-3326) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet, optimism } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) await client.switchChain({ id: optimism.id }) ``` |
| `transport` | `TransportConfig`\<`string`, `EIP1193RequestFn`\> & `Record`\<`string`, `any`\> | The RPC transport |
| `type` | `string` | The type of client. |
| `uid` | `string` | A unique ID for the client. |
| `watchAsset` | (`args`: `WatchAssetParams`) => `Promise`\<`boolean`\> | Adds an EVM chain to the wallet. - Docs: https://viem.sh/docs/actions/wallet/watchAsset.html - JSON-RPC Methods: [`eth_switchEthereumChain`](https://eips.ethereum.org/EIPS/eip-747) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const success = await client.watchAsset({ type: 'ERC20', options: { address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', decimals: 18, symbol: 'WETH', }, }) ``` |
| `writeContract` | \<TAbi, TFunctionName, TChainOverride\>(`args`: `WriteContractParameters`\<`TAbi`, `TFunctionName`, `undefined` \| `Chain`, `undefined` \| `Account`, `TChainOverride`\>) => `Promise`\<\`0x$\{string}\`\> | Executes a write function on a contract. - Docs: https://viem.sh/docs/contract/writeContract.html - Examples: https://stackblitz.com/github/wagmi-dev/viem/tree/main/examples/contracts/writing-to-contracts A "write" function on a Solidity contract modifies the state of the blockchain. These types of functions require gas to be executed, and hence a [Transaction](https://viem.sh/docs/glossary/terms.html) is needed to be broadcast in order to change the state. Internally, uses a [Wallet Client](https://viem.sh/docs/clients/wallet.html) to call the [`sendTransaction` action](https://viem.sh/docs/actions/wallet/sendTransaction.html) with [ABI-encoded `data`](https://viem.sh/docs/contract/encodeFunctionData.html). __Warning: The `write` internally sends a transaction – it does not validate if the contract write will succeed (the contract may throw an error). It is highly recommended to [simulate the contract write with `contract.simulate`](https://viem.sh/docs/contract/writeContract.html#usage) before you execute it.__ **`Example`** ```ts import { createWalletClient, custom, parseAbi } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const hash = await client.writeContract({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi: parseAbi(['function mint(uint32 tokenId) nonpayable']), functionName: 'mint', args: [69420], }) ``` **`Example`** ```ts // With Validation import { createWalletClient, custom, parseAbi } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const { request } = await client.simulateContract({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi: parseAbi(['function mint(uint32 tokenId) nonpayable']), functionName: 'mint', args: [69420], } const hash = await client.writeContract(request) ``` |

#### Defined in

[src/secured-finance-client.ts:132](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L132)

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

[src/secured-finance-client.ts:602](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L602)

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

[src/secured-finance-client.ts:76](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L76)

___

### cancelLendingOrder

▸ **cancelLendingOrder**(`ccy`, `maturity`, `orderID`): `Promise`\<\`0x$\{string}\`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ccy` | `Currency` |
| `maturity` | `number` |
| `orderID` | `number` |

#### Returns

`Promise`\<\`0x$\{string}\`\>

#### Defined in

[src/secured-finance-client.ts:452](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L452)

___

### convert

▸ **convert**(`fromCcy`, `toCcy`, `amount`): `Promise`\<`bigint` \| readonly `bigint`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fromCcy` | `Currency` |
| `toCcy` | `Currency` |
| `amount` | `bigint` |

#### Returns

`Promise`\<`bigint` \| readonly `bigint`[]\>

#### Defined in

[src/secured-finance-client.ts:475](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L475)

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

[src/secured-finance-client.ts:66](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L66)

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

[src/secured-finance-client.ts:58](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L58)

___

### convertToBaseCurrency

▸ **convertToBaseCurrency**(`ccy`, `amount`): `Promise`\<`bigint` \| readonly `bigint`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ccy` | `Currency` |
| `amount` | `bigint` |

#### Returns

`Promise`\<`bigint` \| readonly `bigint`[]\>

#### Defined in

[src/secured-finance-client.ts:467](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L467)

___

### currencyExists

▸ **currencyExists**(`ccy`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ccy` | `Currency` |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[src/secured-finance-client.ts:577](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L577)

___

### depositCollateral

▸ **depositCollateral**(`ccy`, `amount`, `onApproved?`): `Promise`\<\`0x$\{string}\`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ccy` | `Currency` |
| `amount` | `bigint` |
| `onApproved?` | (`isApproved`: `boolean`) => `void` \| `Promise`\<`void`\> |

#### Returns

`Promise`\<\`0x$\{string}\`\>

#### Defined in

[src/secured-finance-client.ts:180](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L180)

___

### executeEmergencySettlement

▸ **executeEmergencySettlement**(): `Promise`\<\`0x$\{string}\`\>

#### Returns

`Promise`\<\`0x$\{string}\`\>

#### Defined in

[src/secured-finance-client.ts:856](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L856)

___

### executeLiquidationCall

▸ **executeLiquidationCall**(`collateralCcy`, `debtCcy`, `debtMaturity`, `account`): `Promise`\<\`0x$\{string}\`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `collateralCcy` | `Currency` |
| `debtCcy` | `Currency` |
| `debtMaturity` | `number` |
| `account` | `string` |

#### Returns

`Promise`\<\`0x$\{string}\`\>

#### Defined in

[src/secured-finance-client.ts:760](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L760)

___

### executeRedemption

▸ **executeRedemption**(`currency`, `maturity`): `Promise`\<\`0x$\{string}\`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `currency` | `Currency` |
| `maturity` | `number` |

#### Returns

`Promise`\<\`0x$\{string}\`\>

#### Defined in

[src/secured-finance-client.ts:697](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L697)

___

### executeRepayment

▸ **executeRepayment**(`currency`, `maturity`): `Promise`\<\`0x$\{string}\`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `currency` | `Currency` |
| `maturity` | `number` |

#### Returns

`Promise`\<\`0x$\{string}\`\>

#### Defined in

[src/secured-finance-client.ts:686](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L686)

___

### getBestBorrowUnitPrices

▸ **getBestBorrowUnitPrices**(`ccy`): `Promise`\<readonly `bigint`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ccy` | `Currency` |

#### Returns

`Promise`\<readonly `bigint`[]\>

#### Defined in

[src/secured-finance-client.ts:211](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L211)

___

### getBestLendUnitPrices

▸ **getBestLendUnitPrices**(`ccy`): `Promise`\<readonly `bigint`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ccy` | `Currency` |

#### Returns

`Promise`\<readonly `bigint`[]\>

#### Defined in

[src/secured-finance-client.ts:203](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L203)

___

### getBorrowOrderBook

▸ **getBorrowOrderBook**(`currency`, `maturity`, `start`, `limit`): `Promise`\<\{ `amounts`: readonly `bigint`[] ; `next`: `bigint` ; `quantities`: readonly `bigint`[] ; `unitPrices`: readonly `bigint`[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `currency` | `Currency` |
| `maturity` | `number` |
| `start` | `number` |
| `limit` | `number` |

#### Returns

`Promise`\<\{ `amounts`: readonly `bigint`[] ; `next`: `bigint` ; `quantities`: readonly `bigint`[] ; `unitPrices`: readonly `bigint`[]  }\>

#### Defined in

[src/secured-finance-client.ts:487](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L487)

___

### getCollateralCurrencies

▸ **getCollateralCurrencies**(): `Promise`\<readonly \`0x$\{string}\`[]\>

#### Returns

`Promise`\<readonly \`0x$\{string}\`[]\>

#### Defined in

[src/secured-finance-client.ts:585](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L585)

___

### getCurrencies

▸ **getCurrencies**(): `Promise`\<readonly \`0x$\{string}\`[]\>

#### Returns

`Promise`\<readonly \`0x$\{string}\`[]\>

#### Defined in

[src/secured-finance-client.ts:570](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L570)

___

### getDecimals

▸ **getDecimals**(`currency`): `Promise`\<`number`\>

Gets aggregated and cached decimals of the price feeds for the selected currency

#### Parameters

| Name | Type |
| :------ | :------ |
| `currency` | `Currency` |

#### Returns

`Promise`\<`number`\>

#### Defined in

[src/secured-finance-client.ts:807](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L807)

___

### getERC20Balance

▸ **getERC20Balance**(`token`, `account`): `Promise`\<`bigint`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `Token` |
| `account` | `string` |

#### Returns

`Promise`\<`bigint`\>

#### Defined in

[src/secured-finance-client.ts:592](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L592)

___

### getERC20TokenContractAddress

▸ **getERC20TokenContractAddress**(`token`): `Promise`\<\`0x$\{string}\`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `Token` |

#### Returns

`Promise`\<\`0x$\{string}\`\>

#### Defined in

[src/secured-finance-client.ts:556](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L556)

___

### getItayoseEstimation

▸ **getItayoseEstimation**(`currency`, `maturity`): `Promise`\<\{ `lastBorrowUnitPrice`: `bigint` ; `lastLendUnitPrice`: `bigint` ; `openingUnitPrice`: `bigint` ; `totalOffsetAmount`: `bigint`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `currency` | `Currency` |
| `maturity` | `number` |

#### Returns

`Promise`\<\{ `lastBorrowUnitPrice`: `bigint` ; `lastLendUnitPrice`: `bigint` ; `openingUnitPrice`: `bigint` ; `totalOffsetAmount`: `bigint`  }\>

#### Defined in

[src/secured-finance-client.ts:866](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L866)

___

### getLastPrice

▸ **getLastPrice**(`currency`): `Promise`\<`bigint`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `currency` | `Currency` |

#### Returns

`Promise`\<`bigint`\>

#### Defined in

[src/secured-finance-client.ts:795](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L795)

___

### getLendOrderBook

▸ **getLendOrderBook**(`currency`, `maturity`, `start`, `limit`): `Promise`\<\{ `amounts`: readonly `bigint`[] ; `next`: `bigint` ; `quantities`: readonly `bigint`[] ; `unitPrices`: readonly `bigint`[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `currency` | `Currency` |
| `maturity` | `number` |
| `start` | `number` |
| `limit` | `number` |

#### Returns

`Promise`\<\{ `amounts`: readonly `bigint`[] ; `next`: `bigint` ; `quantities`: readonly `bigint`[] ; `unitPrices`: readonly `bigint`[]  }\>

#### Defined in

[src/secured-finance-client.ts:512](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L512)

___

### getMarketTerminationDate

▸ **getMarketTerminationDate**(): `Promise`\<`bigint`\>

#### Returns

`Promise`\<`bigint`\>

#### Defined in

[src/secured-finance-client.ts:825](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L825)

___

### getMarketTerminationPriceAndDecimals

▸ **getMarketTerminationPriceAndDecimals**(`currency`): `Promise`\<\{ `decimals`: `number` ; `price`: `bigint`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `currency` | `Currency` |

#### Returns

`Promise`\<\{ `decimals`: `number` ; `price`: `bigint`  }\>

#### Defined in

[src/secured-finance-client.ts:840](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L840)

___

### getMarketTerminationRatio

▸ **getMarketTerminationRatio**(`currency`): `Promise`\<`bigint`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `currency` | `Currency` |

#### Returns

`Promise`\<`bigint`\>

#### Defined in

[src/secured-finance-client.ts:832](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L832)

___

### getMaturities

▸ **getMaturities**(`ccy`): `Promise`\<readonly `bigint`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ccy` | `Currency` |

#### Returns

`Promise`\<readonly `bigint`[]\>

#### Defined in

[src/secured-finance-client.ts:219](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L219)

___

### getOrderBookDetail

▸ **getOrderBookDetail**(`ccy`, `maturity`): `Promise`\<\{ `bestBorrowUnitPrice`: `bigint` ; `bestLendUnitPrice`: `bigint` ; `blockUnitPriceHistory`: readonly `bigint`[] ; `ccy`: \`0x$\{string}\` ; `currentMinDebtUnitPrice`: `bigint` ; `isReady`: `boolean` ; `lastBlockUnitPriceTimestamp`: `bigint` ; `marketUnitPrice`: `bigint` ; `maturity`: `bigint` ; `maxLendUnitPrice`: `bigint` ; `minBorrowUnitPrice`: `bigint` ; `openingDate`: `bigint` ; `openingUnitPrice`: `bigint` ; `preOpeningDate`: `bigint`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ccy` | `Currency` |
| `maturity` | `number` |

#### Returns

`Promise`\<\{ `bestBorrowUnitPrice`: `bigint` ; `bestLendUnitPrice`: `bigint` ; `blockUnitPriceHistory`: readonly `bigint`[] ; `ccy`: \`0x$\{string}\` ; `currentMinDebtUnitPrice`: `bigint` ; `isReady`: `boolean` ; `lastBlockUnitPriceTimestamp`: `bigint` ; `marketUnitPrice`: `bigint` ; `maturity`: `bigint` ; `maxLendUnitPrice`: `bigint` ; `minBorrowUnitPrice`: `bigint` ; `openingDate`: `bigint` ; `openingUnitPrice`: `bigint` ; `preOpeningDate`: `bigint`  }\>

#### Defined in

[src/secured-finance-client.ts:227](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L227)

___

### getOrderBookDetails

▸ **getOrderBookDetails**(`ccys`): `Promise`\<\{ `bestBorrowUnitPrice`: `bigint` ; `bestLendUnitPrice`: `bigint` ; `blockUnitPriceHistory`: readonly `bigint`[] ; `ccy`: \`0x$\{string}\` ; `currentMinDebtUnitPrice`: `bigint` ; `isItayosePeriod`: `boolean` ; `isMatured`: `boolean` ; `isOpened`: `boolean` ; `isPreOrderPeriod`: `boolean` ; `isReady`: `boolean` ; `lastBlockUnitPriceTimestamp`: `bigint` ; `marketUnitPrice`: `bigint` ; `maturity`: `bigint` ; `maxLendUnitPrice`: `bigint` ; `minBorrowUnitPrice`: `bigint` ; `name`: `string` ; `openingDate`: `bigint` ; `openingUnitPrice`: `bigint` ; `preOpeningDate`: `bigint`  }[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ccys` | `Currency`[] |

#### Returns

`Promise`\<\{ `bestBorrowUnitPrice`: `bigint` ; `bestLendUnitPrice`: `bigint` ; `blockUnitPriceHistory`: readonly `bigint`[] ; `ccy`: \`0x$\{string}\` ; `currentMinDebtUnitPrice`: `bigint` ; `isItayosePeriod`: `boolean` ; `isMatured`: `boolean` ; `isOpened`: `boolean` ; `isPreOrderPeriod`: `boolean` ; `isReady`: `boolean` ; `lastBlockUnitPriceTimestamp`: `bigint` ; `marketUnitPrice`: `bigint` ; `maturity`: `bigint` ; `maxLendUnitPrice`: `bigint` ; `minBorrowUnitPrice`: `bigint` ; `name`: `string` ; `openingDate`: `bigint` ; `openingUnitPrice`: `bigint` ; `preOpeningDate`: `bigint`  }[]\>

#### Defined in

[src/secured-finance-client.ts:246](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L246)

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

returns orderbook for the specified currency

**`Memberof`**

SecuredFinanceClient

#### Defined in

[src/secured-finance-client.ts:242](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L242)

___

### getOrderBookId

▸ **getOrderBookId**(`currency`, `maturity`): `Promise`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `currency` | `Currency` |
| `maturity` | `number` |

#### Returns

`Promise`\<`number`\>

#### Defined in

[src/secured-finance-client.ts:716](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L716)

___

### getOrderEstimation

▸ **getOrderEstimation**(`ccy`, `maturity`, `account`, `side`, `amount`, `unitPrice`, `additionalDepositAmount?`, `ignoreBorrowedAmount?`): `Promise`\<\{ `coverage`: `bigint` ; `filledAmount`: `bigint` ; `filledAmountInFV`: `bigint` ; `isInsufficientDepositAmount`: `boolean` ; `lastUnitPrice`: `bigint` ; `orderFeeInFV`: `bigint` ; `placedAmount`: `bigint`  }\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `ccy` | `Currency` | `undefined` |
| `maturity` | `number` | `undefined` |
| `account` | `string` | `undefined` |
| `side` | [`OrderSide`](../enums/OrderSide.md) | `undefined` |
| `amount` | `bigint` | `undefined` |
| `unitPrice` | `number` | `undefined` |
| `additionalDepositAmount` | `bigint` | `undefined` |
| `ignoreBorrowedAmount` | `boolean` | `false` |

#### Returns

`Promise`\<\{ `coverage`: `bigint` ; `filledAmount`: `bigint` ; `filledAmountInFV`: `bigint` ; `isInsufficientDepositAmount`: `boolean` ; `lastUnitPrice`: `bigint` ; `orderFeeInFV`: `bigint` ; `placedAmount`: `bigint`  }\>

#### Defined in

[src/secured-finance-client.ts:142](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L142)

___

### getOrderFeeRate

▸ **getOrderFeeRate**(`currency`): `Promise`\<`bigint`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `currency` | `Currency` |

#### Returns

`Promise`\<`bigint`\>

#### Defined in

[src/secured-finance-client.ts:708](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L708)

___

### getOrderList

▸ **getOrderList**(`account`, `usedCurrenciesForOrders`): `Promise`\<\{ `activeOrders`: readonly \{ `amount`: `bigint` ; `ccy`: \`0x$\{string}\` ; `isPreOrder`: `boolean` ; `maturity`: `bigint` ; `orderId`: `number` ; `side`: `number` ; `timestamp`: `bigint` ; `unitPrice`: `bigint`  }[] \| readonly \{ `amount`: `bigint` ; `ccy`: \`0x$\{string}\` ; `isPreOrder`: `boolean` ; `maturity`: `bigint` ; `orderId`: `number` ; `side`: `number` ; `timestamp`: `bigint` ; `unitPrice`: `bigint`  }[] \| readonly \{ `amount`: `bigint` ; `ccy`: \`0x$\{string}\` ; `isPreOrder`: `boolean` ; `maturity`: `bigint` ; `orderId`: `number` ; `side`: `number` ; `timestamp`: `bigint` ; `unitPrice`: `bigint`  }[] ; `inactiveOrders`: readonly \{ `amount`: `bigint` ; `ccy`: \`0x$\{string}\` ; `isPreOrder`: `boolean` ; `maturity`: `bigint` ; `orderId`: `number` ; `side`: `number` ; `timestamp`: `bigint` ; `unitPrice`: `bigint`  }[] \| readonly \{ `amount`: `bigint` ; `ccy`: \`0x$\{string}\` ; `isPreOrder`: `boolean` ; `maturity`: `bigint` ; `orderId`: `number` ; `side`: `number` ; `timestamp`: `bigint` ; `unitPrice`: `bigint`  }[] \| readonly \{ `amount`: `bigint` ; `ccy`: \`0x$\{string}\` ; `isPreOrder`: `boolean` ; `maturity`: `bigint` ; `orderId`: `number` ; `side`: `number` ; `timestamp`: `bigint` ; `unitPrice`: `bigint`  }[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | `string` |
| `usedCurrenciesForOrders` | `Currency`[] |

#### Returns

`Promise`\<\{ `activeOrders`: readonly \{ `amount`: `bigint` ; `ccy`: \`0x$\{string}\` ; `isPreOrder`: `boolean` ; `maturity`: `bigint` ; `orderId`: `number` ; `side`: `number` ; `timestamp`: `bigint` ; `unitPrice`: `bigint`  }[] \| readonly \{ `amount`: `bigint` ; `ccy`: \`0x$\{string}\` ; `isPreOrder`: `boolean` ; `maturity`: `bigint` ; `orderId`: `number` ; `side`: `number` ; `timestamp`: `bigint` ; `unitPrice`: `bigint`  }[] \| readonly \{ `amount`: `bigint` ; `ccy`: \`0x$\{string}\` ; `isPreOrder`: `boolean` ; `maturity`: `bigint` ; `orderId`: `number` ; `side`: `number` ; `timestamp`: `bigint` ; `unitPrice`: `bigint`  }[] ; `inactiveOrders`: readonly \{ `amount`: `bigint` ; `ccy`: \`0x$\{string}\` ; `isPreOrder`: `boolean` ; `maturity`: `bigint` ; `orderId`: `number` ; `side`: `number` ; `timestamp`: `bigint` ; `unitPrice`: `bigint`  }[] \| readonly \{ `amount`: `bigint` ; `ccy`: \`0x$\{string}\` ; `isPreOrder`: `boolean` ; `maturity`: `bigint` ; `orderId`: `number` ; `side`: `number` ; `timestamp`: `bigint` ; `unitPrice`: `bigint`  }[] \| readonly \{ `amount`: `bigint` ; `ccy`: \`0x$\{string}\` ; `isPreOrder`: `boolean` ; `maturity`: `bigint` ; `orderId`: `number` ; `side`: `number` ; `timestamp`: `bigint` ; `unitPrice`: `bigint`  }[]  }\>

#### Defined in

[src/secured-finance-client.ts:724](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L724)

___

### getPositions

▸ **getPositions**(`account`, `usedCurrenciesForOrders`): `Promise`\<readonly \{ `ccy`: \`0x$\{string}\` ; `futureValue`: `bigint` ; `maturity`: `bigint` ; `presentValue`: `bigint`  }[] \| readonly \{ `ccy`: \`0x$\{string}\` ; `futureValue`: `bigint` ; `maturity`: `bigint` ; `presentValue`: `bigint`  }[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | `string` |
| `usedCurrenciesForOrders` | `Currency`[] |

#### Returns

`Promise`\<readonly \{ `ccy`: \`0x$\{string}\` ; `futureValue`: `bigint` ; `maturity`: `bigint` ; `presentValue`: `bigint`  }[] \| readonly \{ `ccy`: \`0x$\{string}\` ; `futureValue`: `bigint` ; `maturity`: `bigint` ; `presentValue`: `bigint`  }[]\>

#### Defined in

[src/secured-finance-client.ts:739](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L739)

___

### getProtocolDepositAmount

▸ **getProtocolDepositAmount**(): `Promise`\<`Record`\<`string`, `bigint`\>\>

#### Returns

`Promise`\<`Record`\<`string`, `bigint`\>\>

#### Defined in

[src/secured-finance-client.ts:633](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L633)

___

### getTotalPresentValueInBaseCurrency

▸ **getTotalPresentValueInBaseCurrency**(`account`): `Promise`\<`bigint`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | `string` |

#### Returns

`Promise`\<`bigint`\>

#### Defined in

[src/secured-finance-client.ts:678](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L678)

___

### getUsedCurrenciesForOrders

▸ **getUsedCurrenciesForOrders**(`account`): `Promise`\<readonly \`0x$\{string}\`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | `string` |

#### Returns

`Promise`\<readonly \`0x$\{string}\`[]\>

#### Defined in

[src/secured-finance-client.ts:752](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L752)

___

### init

▸ **init**(`publicClient`, `walletClient?`, `options?`): `Promise`\<`void`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `publicClient` | `Object` | - |
| `publicClient.account` | `undefined` | The Account of the Client. |
| `publicClient.batch?` | `Object` | Flags for batch settings. |
| `publicClient.batch.multicall?` | `boolean` \| \{ `batchSize?`: `number` ; `wait?`: `number`  } | Toggle to enable `eth_call` multicall aggregation. |
| `publicClient.cacheTime` | `number` | Time (in ms) that cached data will remain in memory. |
| `publicClient.call` | (`parameters`: `CallParameters`\<`undefined` \| `Chain`\>) => `Promise`\<`CallReturnType`\> | Executes a new message call immediately without submitting a transaction to the network. - Docs: https://viem.sh/docs/actions/public/call.html - JSON-RPC Methods: [`eth_call`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_call) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const data = await client.call({ account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', }) ``` |
| `publicClient.chain` | `undefined` \| `Chain` | Chain for the client. |
| `publicClient.createBlockFilter` | () => `Promise`\<\{ `id`: \`0x$\{string}\` ; `request`: `EIP1193RequestFn`\<readonly [\{ `Method`: ``"eth_getFilterChanges"`` ; `Parameters`: [filterId: \`0x$\{string}\`] ; `ReturnType`: \`0x$\{string}\`[] \| `RpcLog`[]  }, \{ `Method`: ``"eth_getFilterLogs"`` ; `Parameters`: [filterId: \`0x$\{string}\`] ; `ReturnType`: `RpcLog`[]  }, \{ `Method`: ``"eth_uninstallFilter"`` ; `Parameters`: [filterId: \`0x$\{string}\`] ; `ReturnType`: `boolean`  }]\> ; `type`: ``"block"``  }\> | Creates a Filter to listen for new block hashes that can be used with [`getFilterChanges`](https://viem.sh/docs/actions/public/getFilterChanges.html). - Docs: https://viem.sh/docs/actions/public/createBlockFilter.html - JSON-RPC Methods: [`eth_newBlockFilter`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_newBlockFilter) **`Example`** ```ts import { createPublicClient, createBlockFilter, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const filter = await createBlockFilter(client) // { id: "0x345a6572337856574a76364e457a4366", type: 'block' } ``` |
| `publicClient.createContractEventFilter` | \<TAbi, TEventName, TArgs, TStrict, TFromBlock, TToBlock\>(`args`: `CreateContractEventFilterParameters`\<`TAbi`, `TEventName`, `TArgs`, `TStrict`, `TFromBlock`, `TToBlock`\>) => `Promise`\<`CreateContractEventFilterReturnType`\<`TAbi`, `TEventName`, `TArgs`, `TStrict`, `TFromBlock`, `TToBlock`\>\> | Creates a Filter to retrieve event logs that can be used with [`getFilterChanges`](https://viem.sh/docs/actions/public/getFilterChanges.html) or [`getFilterLogs`](https://viem.sh/docs/actions/public/getFilterLogs.html). - Docs: https://viem.sh/docs/contract/createContractEventFilter.html **`Example`** ```ts import { createPublicClient, http, parseAbi } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const filter = await client.createContractEventFilter({ abi: parseAbi(['event Transfer(address indexed, address indexed, uint256)']), }) ``` |
| `publicClient.createEventFilter` | \<TAbiEvent, TAbiEvents, TStrict, TFromBlock, TToBlock, _EventName, _Args\>(`args?`: `CreateEventFilterParameters`\<`TAbiEvent`, `TAbiEvents`, `TStrict`, `TFromBlock`, `TToBlock`, `_EventName`, `_Args`\>) => `Promise`\<\{ [K in string \| number \| symbol]: Filter\<"event", TAbiEvents, \_EventName, \_Args, TStrict, TFromBlock, TToBlock\>[K] }\> | Creates a [`Filter`](https://viem.sh/docs/glossary/types.html#filter) to listen for new events that can be used with [`getFilterChanges`](https://viem.sh/docs/actions/public/getFilterChanges.html). - Docs: https://viem.sh/docs/actions/public/createEventFilter.html - JSON-RPC Methods: [`eth_newFilter`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_newfilter) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const filter = await client.createEventFilter({ address: '0xfba3912ca04dd458c843e2ee08967fc04f3579c2', }) ``` |
| `publicClient.createPendingTransactionFilter` | () => `Promise`\<\{ `id`: \`0x$\{string}\` ; `request`: `EIP1193RequestFn`\<readonly [\{ `Method`: ``"eth_getFilterChanges"`` ; `Parameters`: [filterId: \`0x$\{string}\`] ; `ReturnType`: \`0x$\{string}\`[] \| `RpcLog`[]  }, \{ `Method`: ``"eth_getFilterLogs"`` ; `Parameters`: [filterId: \`0x$\{string}\`] ; `ReturnType`: `RpcLog`[]  }, \{ `Method`: ``"eth_uninstallFilter"`` ; `Parameters`: [filterId: \`0x$\{string}\`] ; `ReturnType`: `boolean`  }]\> ; `type`: ``"transaction"``  }\> | Creates a Filter to listen for new pending transaction hashes that can be used with [`getFilterChanges`](https://viem.sh/docs/actions/public/getFilterChanges.html). - Docs: https://viem.sh/docs/actions/public/createPendingTransactionFilter.html - JSON-RPC Methods: [`eth_newPendingTransactionFilter`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_newpendingtransactionfilter) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const filter = await client.createPendingTransactionFilter() // { id: "0x345a6572337856574a76364e457a4366", type: 'transaction' } ``` |
| `publicClient.estimateContractGas` | \<TChain, TAbi, TFunctionName\>(`args`: `EstimateContractGasParameters`\<`TAbi`, `TFunctionName`, `TChain`, `undefined` \| `Account`\>) => `Promise`\<`bigint`\> | Estimates the gas required to successfully execute a contract write function call. - Docs: https://viem.sh/docs/contract/estimateContractGas.html **`Remarks`** Internally, uses a [Public Client](https://viem.sh/docs/clients/public.html) to call the [`estimateGas` action](https://viem.sh/docs/actions/public/estimateGas.html) with [ABI-encoded `data`](https://viem.sh/docs/contract/encodeFunctionData.html). **`Example`** ```ts import { createPublicClient, http, parseAbi } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const gas = await client.estimateContractGas({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi: parseAbi(['function mint() public']), functionName: 'mint', account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', }) ``` |
| `publicClient.estimateFeesPerGas` | \<TChainOverride, TType\>(`args?`: `EstimateFeesPerGasParameters`\<`undefined` \| `Chain`, `TChainOverride`, `TType`\>) => `Promise`\<`EstimateFeesPerGasReturnType`\> | Returns an estimate for the fees per gas for a transaction to be included in the next block. - Docs: https://viem.sh/docs/actions/public/estimateFeesPerGas.html **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const maxPriorityFeePerGas = await client.estimateFeesPerGas() // { maxFeePerGas: ..., maxPriorityFeePerGas: ... } ``` |
| `publicClient.estimateGas` | (`args`: `EstimateGasParameters`\<`undefined` \| `Chain`, `undefined` \| `Account`\>) => `Promise`\<`bigint`\> | Estimates the gas necessary to complete a transaction without submitting it to the network. - Docs: https://viem.sh/docs/actions/public/estimateGas.html - JSON-RPC Methods: [`eth_estimateGas`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_estimategas) **`Example`** ```ts import { createPublicClient, http, parseEther } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const gasEstimate = await client.estimateGas({ account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', value: parseEther('1'), }) ``` |
| `publicClient.estimateMaxPriorityFeePerGas` | \<TChainOverride\>(`args?`: \{ `chain`: ``null`` \| `TChainOverride`  }) => `Promise`\<`bigint`\> | Returns an estimate for the max priority fee per gas (in wei) for a transaction to be included in the next block. - Docs: https://viem.sh/docs/actions/public/estimateMaxPriorityFeePerGas.html **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const maxPriorityFeePerGas = await client.estimateMaxPriorityFeePerGas() // 10000000n ``` |
| `publicClient.extend` | \<client\>(`fn`: (`client`: `Client`\<`Transport`, `undefined` \| `Chain`, `undefined`, `PublicRpcSchema`, `PublicActions`\<`Transport`, `undefined` \| `Chain`\>\>) => `client`) => `Client`\<`Transport`, `undefined` \| `Chain`, `undefined`, `PublicRpcSchema`, \{ [K in string \| number \| symbol]: client[K] } & `PublicActions`\<`Transport`, `undefined` \| `Chain`\>\> | - |
| `publicClient.getBalance` | (`args`: `GetBalanceParameters`) => `Promise`\<`bigint`\> | Returns the balance of an address in wei. - Docs: https://viem.sh/docs/actions/public/getBalance.html - JSON-RPC Methods: [`eth_getBalance`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getbalance) **`Remarks`** You can convert the balance to ether units with [`formatEther`](https://viem.sh/docs/utilities/formatEther.html). ```ts const balance = await getBalance(client, { address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', blockTag: 'safe' }) const balanceAsEther = formatEther(balance) // "6.942" ``` **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const balance = await client.getBalance({ address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', }) // 10000000000000000000000n (wei) ``` |
| `publicClient.getBlock` | \<TIncludeTransactions, TBlockTag\>(`args?`: `GetBlockParameters`\<`TIncludeTransactions`, `TBlockTag`\>) => `Promise`\<`GetBlockReturnType`\<`undefined` \| `Chain`, `TIncludeTransactions`, `TBlockTag`\>\> | Returns information about a block at a block number, hash, or tag. - Docs: https://viem.sh/docs/actions/public/getBlock.html - Examples: https://stackblitz.com/github/wagmi-dev/viem/tree/main/examples/blocks/fetching-blocks - JSON-RPC Methods: - Calls [`eth_getBlockByNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblockbynumber) for `blockNumber` & `blockTag`. - Calls [`eth_getBlockByHash`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblockbyhash) for `blockHash`. **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const block = await client.getBlock() ``` |
| `publicClient.getBlockNumber` | (`args?`: `GetBlockNumberParameters`) => `Promise`\<`bigint`\> | Returns the number of the most recent block seen. - Docs: https://viem.sh/docs/actions/public/getBlockNumber.html - Examples: https://stackblitz.com/github/wagmi-dev/viem/tree/main/examples/blocks/fetching-blocks - JSON-RPC Methods: [`eth_blockNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_blocknumber) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const blockNumber = await client.getBlockNumber() // 69420n ``` |
| `publicClient.getBlockTransactionCount` | (`args?`: `GetBlockTransactionCountParameters`) => `Promise`\<`number`\> | Returns the number of Transactions at a block number, hash, or tag. - Docs: https://viem.sh/docs/actions/public/getBlockTransactionCount.html - JSON-RPC Methods: - Calls [`eth_getBlockTransactionCountByNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblocktransactioncountbynumber) for `blockNumber` & `blockTag`. - Calls [`eth_getBlockTransactionCountByHash`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblocktransactioncountbyhash) for `blockHash`. **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const count = await client.getBlockTransactionCount() ``` |
| `publicClient.getBytecode` | (`args`: `GetBytecodeParameters`) => `Promise`\<`GetBytecodeReturnType`\> | Retrieves the bytecode at an address. - Docs: https://viem.sh/docs/contract/getBytecode.html - JSON-RPC Methods: [`eth_getCode`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getcode) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const code = await client.getBytecode({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', }) ``` |
| `publicClient.getChainId` | () => `Promise`\<`number`\> | Returns the chain ID associated with the current network. - Docs: https://viem.sh/docs/actions/public/getChainId.html - JSON-RPC Methods: [`eth_chainId`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_chainid) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const chainId = await client.getChainId() // 1 ``` |
| `publicClient.getContractEvents` | \<TAbi, TEventName, TStrict, TFromBlock, TToBlock\>(`args`: `GetContractEventsParameters`\<`TAbi`, `TEventName`, `TStrict`, `TFromBlock`, `TToBlock`\>) => `Promise`\<`GetContractEventsReturnType`\<`TAbi`, `TEventName`, `TStrict`, `TFromBlock`, `TToBlock`\>\> | Returns a list of event logs emitted by a contract. - Docs: https://viem.sh/docs/actions/public/getContractEvents.html - JSON-RPC Methods: [`eth_getLogs`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getlogs) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' import { wagmiAbi } from './abi' const client = createPublicClient({ chain: mainnet, transport: http(), }) const logs = await client.getContractEvents(client, { address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi: wagmiAbi, eventName: 'Transfer' }) ``` |
| `publicClient.getEnsAddress` | (`args`: \{ `blockNumber?`: `bigint` ; `blockTag?`: `BlockTag` ; `coinType?`: `number` ; `name`: `string` ; `universalResolverAddress?`: \`0x$\{string}\`  }) => `Promise`\<`GetEnsAddressReturnType`\> | Gets address for ENS name. - Docs: https://viem.sh/docs/ens/actions/getEnsAddress.html - Examples: https://stackblitz.com/github/wagmi-dev/viem/tree/main/examples/ens **`Remarks`** Calls `resolve(bytes, bytes)` on ENS Universal Resolver Contract. Since ENS names prohibit certain forbidden characters (e.g. underscore) and have other validation rules, you likely want to [normalize ENS names](https://docs.ens.domains/contract-api-reference/name-processing#normalising-names) with [UTS-46 normalization](https://unicode.org/reports/tr46) before passing them to `getEnsAddress`. You can use the built-in [`normalize`](https://viem.sh/docs/ens/utilities/normalize.html) function for this. **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' import { normalize } from 'viem/ens' const client = createPublicClient({ chain: mainnet, transport: http(), }) const ensAddress = await client.getEnsAddress({ name: normalize('wagmi-dev.eth'), }) // '0xd2135CfB216b74109775236E36d4b433F1DF507B' ``` |
| `publicClient.getEnsAvatar` | (`args`: \{ `blockNumber?`: `bigint` ; `blockTag?`: `BlockTag` ; `gatewayUrls?`: `AssetGatewayUrls` ; `name`: `string` ; `universalResolverAddress?`: \`0x$\{string}\`  }) => `Promise`\<`GetEnsAvatarReturnType`\> | Gets the avatar of an ENS name. - Docs: https://viem.sh/docs/ens/actions/getEnsAvatar.html - Examples: https://stackblitz.com/github/wagmi-dev/viem/tree/main/examples/ens **`Remarks`** Calls [`getEnsText`](https://viem.sh/docs/ens/actions/getEnsText.html) with `key` set to `'avatar'`. Since ENS names prohibit certain forbidden characters (e.g. underscore) and have other validation rules, you likely want to [normalize ENS names](https://docs.ens.domains/contract-api-reference/name-processing#normalising-names) with [UTS-46 normalization](https://unicode.org/reports/tr46) before passing them to `getEnsAddress`. You can use the built-in [`normalize`](https://viem.sh/docs/ens/utilities/normalize.html) function for this. **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' import { normalize } from 'viem/ens' const client = createPublicClient({ chain: mainnet, transport: http(), }) const ensAvatar = await client.getEnsAvatar({ name: normalize('wagmi-dev.eth'), }) // 'https://ipfs.io/ipfs/Qma8mnp6xV3J2cRNf3mTth5C8nV11CAnceVinc3y8jSbio' ``` |
| `publicClient.getEnsName` | (`args`: \{ `address`: \`0x$\{string}\` ; `blockNumber?`: `bigint` ; `blockTag?`: `BlockTag` ; `universalResolverAddress?`: \`0x$\{string}\`  }) => `Promise`\<`GetEnsNameReturnType`\> | Gets primary name for specified address. - Docs: https://viem.sh/docs/ens/actions/getEnsName.html - Examples: https://stackblitz.com/github/wagmi-dev/viem/tree/main/examples/ens **`Remarks`** Calls `reverse(bytes)` on ENS Universal Resolver Contract to "reverse resolve" the address to the primary ENS name. **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const ensName = await client.getEnsName({ address: '0xd2135CfB216b74109775236E36d4b433F1DF507B', }) // 'wagmi-dev.eth' ``` |
| `publicClient.getEnsResolver` | (`args`: \{ `blockNumber?`: `bigint` ; `blockTag?`: `BlockTag` ; `name`: `string` ; `universalResolverAddress?`: \`0x$\{string}\`  }) => `Promise`\<\`0x$\{string}\`\> | Gets resolver for ENS name. - Docs: https://viem.sh/docs/ens/actions/getEnsResolver.html - Examples: https://stackblitz.com/github/wagmi-dev/viem/tree/main/examples/ens **`Remarks`** Calls `findResolver(bytes)` on ENS Universal Resolver Contract to retrieve the resolver of an ENS name. Since ENS names prohibit certain forbidden characters (e.g. underscore) and have other validation rules, you likely want to [normalize ENS names](https://docs.ens.domains/contract-api-reference/name-processing#normalising-names) with [UTS-46 normalization](https://unicode.org/reports/tr46) before passing them to `getEnsAddress`. You can use the built-in [`normalize`](https://viem.sh/docs/ens/utilities/normalize.html) function for this. **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' import { normalize } from 'viem/ens' const client = createPublicClient({ chain: mainnet, transport: http(), }) const resolverAddress = await client.getEnsResolver({ name: normalize('wagmi-dev.eth'), }) // '0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41' ``` |
| `publicClient.getEnsText` | (`args`: \{ `blockNumber?`: `bigint` ; `blockTag?`: `BlockTag` ; `key`: `string` ; `name`: `string` ; `universalResolverAddress?`: \`0x$\{string}\`  }) => `Promise`\<`GetEnsTextReturnType`\> | Gets a text record for specified ENS name. - Docs: https://viem.sh/docs/ens/actions/getEnsResolver.html - Examples: https://stackblitz.com/github/wagmi-dev/viem/tree/main/examples/ens **`Remarks`** Calls `resolve(bytes, bytes)` on ENS Universal Resolver Contract. Since ENS names prohibit certain forbidden characters (e.g. underscore) and have other validation rules, you likely want to [normalize ENS names](https://docs.ens.domains/contract-api-reference/name-processing#normalising-names) with [UTS-46 normalization](https://unicode.org/reports/tr46) before passing them to `getEnsAddress`. You can use the built-in [`normalize`](https://viem.sh/docs/ens/utilities/normalize.html) function for this. **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' import { normalize } from 'viem/ens' const client = createPublicClient({ chain: mainnet, transport: http(), }) const twitterRecord = await client.getEnsText({ name: normalize('wagmi-dev.eth'), key: 'com.twitter', }) // 'wagmi_sh' ``` |
| `publicClient.getFeeHistory` | (`args`: `GetFeeHistoryParameters`) => `Promise`\<`GetFeeHistoryReturnType`\> | Returns a collection of historical gas information. - Docs: https://viem.sh/docs/actions/public/getFeeHistory.html - JSON-RPC Methods: [`eth_feeHistory`](https://docs.alchemy.com/reference/eth-feehistory) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const feeHistory = await client.getFeeHistory({ blockCount: 4, rewardPercentiles: [25, 75], }) ``` |
| `publicClient.getFilterChanges` | \<TFilterType, TAbi, TEventName, TStrict, TFromBlock, TToBlock\>(`args`: `GetFilterChangesParameters`\<`TFilterType`, `TAbi`, `TEventName`, `TStrict`, `TFromBlock`, `TToBlock`\>) => `Promise`\<`GetFilterChangesReturnType`\<`TFilterType`, `TAbi`, `TEventName`, `TStrict`, `TFromBlock`, `TToBlock`\>\> | Returns a list of logs or hashes based on a [Filter](/docs/glossary/terms#filter) since the last time it was called. - Docs: https://viem.sh/docs/actions/public/getFilterChanges.html - JSON-RPC Methods: [`eth_getFilterChanges`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getfilterchanges) **`Remarks`** A Filter can be created from the following actions: - [`createBlockFilter`](https://viem.sh/docs/actions/public/createBlockFilter.html) - [`createContractEventFilter`](https://viem.sh/docs/contract/createContractEventFilter.html) - [`createEventFilter`](https://viem.sh/docs/actions/public/createEventFilter.html) - [`createPendingTransactionFilter`](https://viem.sh/docs/actions/public/createPendingTransactionFilter.html) Depending on the type of filter, the return value will be different: - If the filter was created with `createContractEventFilter` or `createEventFilter`, it returns a list of logs. - If the filter was created with `createPendingTransactionFilter`, it returns a list of transaction hashes. - If the filter was created with `createBlockFilter`, it returns a list of block hashes. **`Example`** ```ts // Blocks import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const filter = await client.createBlockFilter() const hashes = await client.getFilterChanges({ filter }) ``` **`Example`** ```ts // Contract Events import { createPublicClient, http, parseAbi } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const filter = await client.createContractEventFilter({ address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', abi: parseAbi(['event Transfer(address indexed, address indexed, uint256)']), eventName: 'Transfer', }) const logs = await client.getFilterChanges({ filter }) ``` **`Example`** ```ts // Raw Events import { createPublicClient, http, parseAbiItem } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const filter = await client.createEventFilter({ address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', event: parseAbiItem('event Transfer(address indexed, address indexed, uint256)'), }) const logs = await client.getFilterChanges({ filter }) ``` **`Example`** ```ts // Transactions import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const filter = await client.createPendingTransactionFilter() const hashes = await client.getFilterChanges({ filter }) ``` |
| `publicClient.getFilterLogs` | \<TAbi, TEventName, TStrict, TFromBlock, TToBlock\>(`args`: `GetFilterLogsParameters`\<`TAbi`, `TEventName`, `TStrict`, `TFromBlock`, `TToBlock`\>) => `Promise`\<`GetFilterLogsReturnType`\<`TAbi`, `TEventName`, `TStrict`, `TFromBlock`, `TToBlock`\>\> | Returns a list of event logs since the filter was created. - Docs: https://viem.sh/docs/actions/public/getFilterLogs.html - JSON-RPC Methods: [`eth_getFilterLogs`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getfilterlogs) **`Remarks`** `getFilterLogs` is only compatible with **event filters**. **`Example`** ```ts import { createPublicClient, http, parseAbiItem } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const filter = await client.createEventFilter({ address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', event: parseAbiItem('event Transfer(address indexed, address indexed, uint256)'), }) const logs = await client.getFilterLogs({ filter }) ``` |
| `publicClient.getGasPrice` | () => `Promise`\<`bigint`\> | Returns the current price of gas (in wei). - Docs: https://viem.sh/docs/actions/public/getGasPrice.html - JSON-RPC Methods: [`eth_gasPrice`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_gasprice) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const gasPrice = await client.getGasPrice() ``` |
| `publicClient.getLogs` | \<TAbiEvent, TAbiEvents, TStrict, TFromBlock, TToBlock\>(`args?`: `GetLogsParameters`\<`TAbiEvent`, `TAbiEvents`, `TStrict`, `TFromBlock`, `TToBlock`\>) => `Promise`\<`GetLogsReturnType`\<`TAbiEvent`, `TAbiEvents`, `TStrict`, `TFromBlock`, `TToBlock`\>\> | Returns a list of event logs matching the provided parameters. - Docs: https://viem.sh/docs/actions/public/getLogs.html - Examples: https://stackblitz.com/github/wagmi-dev/viem/tree/main/examples/filters-and-logs/event-logs - JSON-RPC Methods: [`eth_getLogs`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getlogs) **`Example`** ```ts import { createPublicClient, http, parseAbiItem } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const logs = await client.getLogs() ``` |
| `publicClient.getProof` | (`args`: `GetProofParameters`) => `Promise`\<`GetProofReturnType`\> | Returns the account and storage values of the specified account including the Merkle-proof. - Docs: https://viem.sh/docs/actions/public/getProof.html - JSON-RPC Methods: - Calls [`eth_getProof`](https://eips.ethereum.org/EIPS/eip-1186) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const block = await client.getProof({ address: '0x...', storageKeys: ['0x...'], }) ``` |
| `publicClient.getStorageAt` | (`args`: `GetStorageAtParameters`) => `Promise`\<`GetStorageAtReturnType`\> | Returns the value from a storage slot at a given address. - Docs: https://viem.sh/docs/contract/getStorageAt.html - JSON-RPC Methods: [`eth_getStorageAt`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getstorageat) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' import { getStorageAt } from 'viem/contract' const client = createPublicClient({ chain: mainnet, transport: http(), }) const code = await client.getStorageAt({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', slot: toHex(0), }) ``` |
| `publicClient.getTransaction` | \<TBlockTag\>(`args`: `GetTransactionParameters`\<`TBlockTag`\>) => `Promise`\<`GetTransactionReturnType`\<`undefined` \| `Chain`, `TBlockTag`\>\> | Returns information about a [Transaction](https://viem.sh/docs/glossary/terms.html#transaction) given a hash or block identifier. - Docs: https://viem.sh/docs/actions/public/getTransaction.html - Example: https://stackblitz.com/github/wagmi-dev/viem/tree/main/examples/transactions/fetching-transactions - JSON-RPC Methods: [`eth_getTransactionByHash`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getTransactionByHash) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const transaction = await client.getTransaction({ hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d', }) ``` |
| `publicClient.getTransactionConfirmations` | (`args`: `GetTransactionConfirmationsParameters`\<`undefined` \| `Chain`\>) => `Promise`\<`bigint`\> | Returns the number of blocks passed (confirmations) since the transaction was processed on a block. - Docs: https://viem.sh/docs/actions/public/getTransactionConfirmations.html - Example: https://stackblitz.com/github/wagmi-dev/viem/tree/main/examples/transactions/fetching-transactions - JSON-RPC Methods: [`eth_getTransactionConfirmations`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getTransactionConfirmations) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const confirmations = await client.getTransactionConfirmations({ hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d', }) ``` |
| `publicClient.getTransactionCount` | (`args`: `GetTransactionCountParameters`) => `Promise`\<`number`\> | Returns the number of [Transactions](https://viem.sh/docs/glossary/terms.html#transaction) an Account has broadcast / sent. - Docs: https://viem.sh/docs/actions/public/getTransactionCount.html - JSON-RPC Methods: [`eth_getTransactionCount`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_gettransactioncount) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const transactionCount = await client.getTransactionCount({ address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', }) ``` |
| `publicClient.getTransactionReceipt` | (`args`: `GetTransactionReceiptParameters`) => `Promise`\<`TransactionReceipt`\> | Returns the [Transaction Receipt](https://viem.sh/docs/glossary/terms.html#transaction-receipt) given a [Transaction](https://viem.sh/docs/glossary/terms.html#transaction) hash. - Docs: https://viem.sh/docs/actions/public/getTransactionReceipt.html - Example: https://stackblitz.com/github/wagmi-dev/viem/tree/main/examples/transactions/fetching-transactions - JSON-RPC Methods: [`eth_getTransactionReceipt`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getTransactionReceipt) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const transactionReceipt = await client.getTransactionReceipt({ hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d', }) ``` |
| `publicClient.key` | `string` | A key for the client. |
| `publicClient.multicall` | \<TContracts, TAllowFailure\>(`args`: `MulticallParameters`\<`TContracts`, `TAllowFailure`\>) => `Promise`\<`MulticallReturnType`\<`TContracts`, `TAllowFailure`\>\> | Similar to [`readContract`](https://viem.sh/docs/contract/readContract.html), but batches up multiple functions on a contract in a single RPC call via the [`multicall3` contract](https://github.com/mds1/multicall). - Docs: https://viem.sh/docs/contract/multicall.html **`Example`** ```ts import { createPublicClient, http, parseAbi } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const abi = parseAbi([ 'function balanceOf(address) view returns (uint256)', 'function totalSupply() view returns (uint256)', ]) const result = await client.multicall({ contracts: [ { address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi, functionName: 'balanceOf', args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e'], }, { address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi, functionName: 'totalSupply', }, ], }) // [{ result: 424122n, status: 'success' }, { result: 1000000n, status: 'success' }] ``` |
| `publicClient.name` | `string` | A name for the client. |
| `publicClient.pollingInterval` | `number` | Frequency (in ms) for polling enabled actions & events. Defaults to 4_000 milliseconds. |
| `publicClient.prepareTransactionRequest` | \<TChainOverride\>(`args`: `PrepareTransactionRequestParameters`\<`undefined` \| `Chain`, `undefined` \| `Account`, `TChainOverride`\>) => `Promise`\<`PrepareTransactionRequestReturnType`\> | Prepares a transaction request for signing. - Docs: https://viem.sh/docs/actions/wallet/prepareTransactionRequest.html **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const request = await client.prepareTransactionRequest({ account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', to: '0x0000000000000000000000000000000000000000', value: 1n, }) ``` **`Example`** ```ts // Account Hoisting import { createWalletClient, http } from 'viem' import { privateKeyToAccount } from 'viem/accounts' import { mainnet } from 'viem/chains' const client = createWalletClient({ account: privateKeyToAccount('0x…'), chain: mainnet, transport: custom(window.ethereum), }) const request = await client.prepareTransactionRequest({ to: '0x0000000000000000000000000000000000000000', value: 1n, }) ``` |
| `publicClient.readContract` | \<TAbi, TFunctionName\>(`args`: `ReadContractParameters`\<`TAbi`, `TFunctionName`\>) => `Promise`\<`ReadContractReturnType`\<`TAbi`, `TFunctionName`\>\> | Calls a read-only function on a contract, and returns the response. - Docs: https://viem.sh/docs/contract/readContract.html - Examples: https://stackblitz.com/github/wagmi-dev/viem/tree/main/examples/contracts/reading-contracts **`Remarks`** A "read-only" function (constant function) on a Solidity contract is denoted by a `view` or `pure` keyword. They can only read the state of the contract, and cannot make any changes to it. Since read-only methods do not change the state of the contract, they do not require any gas to be executed, and can be called by any user without the need to pay for gas. Internally, uses a [Public Client](https://viem.sh/docs/clients/public.html) to call the [`call` action](https://viem.sh/docs/actions/public/call.html) with [ABI-encoded `data`](https://viem.sh/docs/contract/encodeFunctionData.html). **`Example`** ```ts import { createPublicClient, http, parseAbi } from 'viem' import { mainnet } from 'viem/chains' import { readContract } from 'viem/contract' const client = createPublicClient({ chain: mainnet, transport: http(), }) const result = await client.readContract({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi: parseAbi(['function balanceOf(address) view returns (uint256)']), functionName: 'balanceOf', args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e'], }) // 424122n ``` |
| `publicClient.request` | `EIP1193RequestFn`\<`PublicRpcSchema`\> | Request function wrapped with friendly error handling |
| `publicClient.sendRawTransaction` | (`args`: `SendRawTransactionParameters`) => `Promise`\<\`0x$\{string}\`\> | Sends a **signed** transaction to the network - Docs: https://viem.sh/docs/actions/wallet/sendRawTransaction.html - JSON-RPC Method: [`eth_sendRawTransaction`](https://ethereum.github.io/execution-apis/api-documentation/) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' import { sendRawTransaction } from 'viem/wallet' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const hash = await client.sendRawTransaction({ serializedTransaction: '0x02f850018203118080825208808080c080a04012522854168b27e5dc3d5839bab5e6b39e1a0ffd343901ce1622e3d64b48f1a04e00902ae0502c4728cbf12156290df99c3ed7de85b1dbfe20b5c36931733a33' }) ``` |
| `publicClient.simulateContract` | \<TAbi, TFunctionName, TChainOverride\>(`args`: `SimulateContractParameters`\<`TAbi`, `TFunctionName`, `undefined` \| `Chain`, `TChainOverride`\>) => `Promise`\<`SimulateContractReturnType`\<`TAbi`, `TFunctionName`, `undefined` \| `Chain`, `TChainOverride`\>\> | Simulates/validates a contract interaction. This is useful for retrieving **return data** and **revert reasons** of contract write functions. - Docs: https://viem.sh/docs/contract/simulateContract.html - Examples: https://stackblitz.com/github/wagmi-dev/viem/tree/main/examples/contracts/writing-to-contracts **`Remarks`** This function does not require gas to execute and _**does not**_ change the state of the blockchain. It is almost identical to [`readContract`](https://viem.sh/docs/contract/readContract.html), but also supports contract write functions. Internally, uses a [Public Client](https://viem.sh/docs/clients/public.html) to call the [`call` action](https://viem.sh/docs/actions/public/call.html) with [ABI-encoded `data`](https://viem.sh/docs/contract/encodeFunctionData.html). **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const result = await client.simulateContract({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi: parseAbi(['function mint(uint32) view returns (uint32)']), functionName: 'mint', args: ['69420'], account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', }) ``` |
| `publicClient.transport` | `TransportConfig`\<`string`, `EIP1193RequestFn`\> & `Record`\<`string`, `any`\> | The RPC transport |
| `publicClient.type` | `string` | The type of client. |
| `publicClient.uid` | `string` | A unique ID for the client. |
| `publicClient.uninstallFilter` | (`args`: `UninstallFilterParameters`) => `Promise`\<`boolean`\> | Destroys a Filter that was created from one of the following Actions: - [`createBlockFilter`](https://viem.sh/docs/actions/public/createBlockFilter.html) - [`createEventFilter`](https://viem.sh/docs/actions/public/createEventFilter.html) - [`createPendingTransactionFilter`](https://viem.sh/docs/actions/public/createPendingTransactionFilter.html) - Docs: https://viem.sh/docs/actions/public/uninstallFilter.html - JSON-RPC Methods: [`eth_uninstallFilter`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_uninstallFilter) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' import { createPendingTransactionFilter, uninstallFilter } from 'viem/public' const filter = await client.createPendingTransactionFilter() const uninstalled = await client.uninstallFilter({ filter }) // true ``` |
| `publicClient.verifyMessage` | (`args`: `VerifyMessageParameters`) => `Promise`\<`boolean`\> | - |
| `publicClient.verifyTypedData` | (`args`: `VerifyTypedDataParameters`) => `Promise`\<`boolean`\> | - |
| `publicClient.waitForTransactionReceipt` | (`args`: `WaitForTransactionReceiptParameters`\<`undefined` \| `Chain`\>) => `Promise`\<`TransactionReceipt`\> | Waits for the [Transaction](https://viem.sh/docs/glossary/terms.html#transaction) to be included on a [Block](https://viem.sh/docs/glossary/terms.html#block) (one confirmation), and then returns the [Transaction Receipt](https://viem.sh/docs/glossary/terms.html#transaction-receipt). If the Transaction reverts, then the action will throw an error. - Docs: https://viem.sh/docs/actions/public/waitForTransactionReceipt.html - Example: https://stackblitz.com/github/wagmi-dev/viem/tree/main/examples/transactions/sending-transactions - JSON-RPC Methods: - Polls [`eth_getTransactionReceipt`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getTransactionReceipt) on each block until it has been processed. - If a Transaction has been replaced: - Calls [`eth_getBlockByNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblockbynumber) and extracts the transactions - Checks if one of the Transactions is a replacement - If so, calls [`eth_getTransactionReceipt`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getTransactionReceipt). **`Remarks`** The `waitForTransactionReceipt` action additionally supports Replacement detection (e.g. sped up Transactions). Transactions can be replaced when a user modifies their transaction in their wallet (to speed up or cancel). Transactions are replaced when they are sent from the same nonce. There are 3 types of Transaction Replacement reasons: - `repriced`: The gas price has been modified (e.g. different `maxFeePerGas`) - `cancelled`: The Transaction has been cancelled (e.g. `value === 0n`) - `replaced`: The Transaction has been replaced (e.g. different `value` or `data`) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const transactionReceipt = await client.waitForTransactionReceipt({ hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d', }) ``` |
| `publicClient.watchBlockNumber` | (`args`: `WatchBlockNumberParameters`) => `WatchBlockNumberReturnType` | Watches and returns incoming block numbers. - Docs: https://viem.sh/docs/actions/public/watchBlockNumber.html - Examples: https://stackblitz.com/github/wagmi-dev/viem/tree/main/examples/blocks/watching-blocks - JSON-RPC Methods: - When `poll: true`, calls [`eth_blockNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_blocknumber) on a polling interval. - When `poll: false` & WebSocket Transport, uses a WebSocket subscription via [`eth_subscribe`](https://docs.alchemy.com/reference/eth-subscribe-polygon) and the `"newHeads"` event. **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const unwatch = await client.watchBlockNumber({ onBlockNumber: (blockNumber) => console.log(blockNumber), }) ``` |
| `publicClient.watchBlocks` | \<TIncludeTransactions, TBlockTag\>(`args`: `WatchBlocksParameters`\<`Transport`, `undefined` \| `Chain`, `TIncludeTransactions`, `TBlockTag`\>) => `WatchBlocksReturnType` | Watches and returns information for incoming blocks. - Docs: https://viem.sh/docs/actions/public/watchBlocks.html - Examples: https://stackblitz.com/github/wagmi-dev/viem/tree/main/examples/blocks/watching-blocks - JSON-RPC Methods: - When `poll: true`, calls [`eth_getBlockByNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getBlockByNumber) on a polling interval. - When `poll: false` & WebSocket Transport, uses a WebSocket subscription via [`eth_subscribe`](https://docs.alchemy.com/reference/eth-subscribe-polygon) and the `"newHeads"` event. **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const unwatch = await client.watchBlocks({ onBlock: (block) => console.log(block), }) ``` |
| `publicClient.watchContractEvent` | \<TAbi, TEventName, TStrict\>(`args`: `WatchContractEventParameters`\<`TAbi`, `TEventName`, `TStrict`\>) => `WatchContractEventReturnType` | Watches and returns emitted contract event logs. - Docs: https://viem.sh/docs/contract/watchContractEvent.html **`Remarks`** This Action will batch up all the event logs found within the [`pollingInterval`](https://viem.sh/docs/contract/watchContractEvent.html#pollinginterval-optional), and invoke them via [`onLogs`](https://viem.sh/docs/contract/watchContractEvent.html#onLogs). `watchContractEvent` will attempt to create an [Event Filter](https://viem.sh/docs/contract/createContractEventFilter.html) and listen to changes to the Filter per polling interval, however, if the RPC Provider does not support Filters (e.g. `eth_newFilter`), then `watchContractEvent` will fall back to using [`getLogs`](https://viem.sh/docs/actions/public/getLogs.html) instead. **`Example`** ```ts import { createPublicClient, http, parseAbi } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const unwatch = client.watchContractEvent({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi: parseAbi(['event Transfer(address indexed from, address indexed to, uint256 value)']), eventName: 'Transfer', args: { from: '0xc961145a54C96E3aE9bAA048c4F4D6b04C13916b' }, onLogs: (logs) => console.log(logs), }) ``` |
| `publicClient.watchEvent` | \<TAbiEvent, TAbiEvents, TStrict\>(`args`: `WatchEventParameters`\<`TAbiEvent`, `TAbiEvents`, `TStrict`\>) => `WatchEventReturnType` | Watches and returns emitted [Event Logs](https://viem.sh/docs/glossary/terms.html#event-log). - Docs: https://viem.sh/docs/actions/public/watchEvent.html - JSON-RPC Methods: - **RPC Provider supports `eth_newFilter`:** - Calls [`eth_newFilter`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_newfilter) to create a filter (called on initialize). - On a polling interval, it will call [`eth_getFilterChanges`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getfilterchanges). - **RPC Provider does not support `eth_newFilter`:** - Calls [`eth_getLogs`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getlogs) for each block between the polling interval. **`Remarks`** This Action will batch up all the Event Logs found within the [`pollingInterval`](https://viem.sh/docs/actions/public/watchEvent.html#pollinginterval-optional), and invoke them via [`onLogs`](https://viem.sh/docs/actions/public/watchEvent.html#onLogs). `watchEvent` will attempt to create an [Event Filter](https://viem.sh/docs/actions/public/createEventFilter.html) and listen to changes to the Filter per polling interval, however, if the RPC Provider does not support Filters (e.g. `eth_newFilter`), then `watchEvent` will fall back to using [`getLogs`](https://viem.sh/docs/actions/public/getLogs.html) instead. **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const unwatch = client.watchEvent({ onLogs: (logs) => console.log(logs), }) ``` |
| `publicClient.watchPendingTransactions` | (`args`: `WatchPendingTransactionsParameters`\<`Transport`\>) => `WatchPendingTransactionsReturnType` | Watches and returns pending transaction hashes. - Docs: https://viem.sh/docs/actions/public/watchPendingTransactions.html - JSON-RPC Methods: - When `poll: true` - Calls [`eth_newPendingTransactionFilter`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_newpendingtransactionfilter) to initialize the filter. - Calls [`eth_getFilterChanges`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getFilterChanges) on a polling interval. - When `poll: false` & WebSocket Transport, uses a WebSocket subscription via [`eth_subscribe`](https://docs.alchemy.com/reference/eth-subscribe-polygon) and the `"newPendingTransactions"` event. **`Remarks`** This Action will batch up all the pending transactions found within the [`pollingInterval`](https://viem.sh/docs/actions/public/watchPendingTransactions.html#pollinginterval-optional), and invoke them via [`onTransactions`](https://viem.sh/docs/actions/public/watchPendingTransactions.html#ontransactions). **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const unwatch = await client.watchPendingTransactions({ onTransactions: (hashes) => console.log(hashes), }) ``` |
| `walletClient?` | `Object` | - |
| `walletClient.account` | `undefined` \| `Account` | The Account of the Client. |
| `walletClient.addChain` | (`args`: `AddChainParameters`) => `Promise`\<`void`\> | Adds an EVM chain to the wallet. - Docs: https://viem.sh/docs/actions/wallet/addChain.html - JSON-RPC Methods: [`eth_addEthereumChain`](https://eips.ethereum.org/EIPS/eip-3085) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { optimism } from 'viem/chains' const client = createWalletClient({ transport: custom(window.ethereum), }) await client.addChain({ chain: optimism }) ``` |
| `walletClient.batch?` | `Object` | Flags for batch settings. |
| `walletClient.batch.multicall?` | `boolean` \| \{ `batchSize?`: `number` ; `wait?`: `number`  } | Toggle to enable `eth_call` multicall aggregation. |
| `walletClient.cacheTime` | `number` | Time (in ms) that cached data will remain in memory. |
| `walletClient.chain` | `undefined` \| `Chain` | Chain for the client. |
| `walletClient.deployContract` | \<TAbi, TChainOverride\>(`args`: `DeployContractParameters`\<`TAbi`, `undefined` \| `Chain`, `undefined` \| `Account`, `TChainOverride`\>) => `Promise`\<\`0x$\{string}\`\> | Deploys a contract to the network, given bytecode and constructor arguments. - Docs: https://viem.sh/docs/contract/deployContract.html - Examples: https://stackblitz.com/github/wagmi-dev/viem/tree/main/examples/contracts/deploying-contracts **`Example`** ```ts import { createWalletClient, http } from 'viem' import { privateKeyToAccount } from 'viem/accounts' import { mainnet } from 'viem/chains' const client = createWalletClient({ account: privateKeyToAccount('0x…'), chain: mainnet, transport: http(), }) const hash = await client.deployContract({ abi: [], account: '0x…, bytecode: '0x608060405260405161083e38038061083e833981016040819052610...', }) ``` |
| `walletClient.extend` | \<client\>(`fn`: (`client`: `Client`\<`Transport`, `undefined` \| `Chain`, `undefined` \| `Account`, `WalletRpcSchema`, `WalletActions`\<`undefined` \| `Chain`, `undefined` \| `Account`\>\>) => `client`) => `Client`\<`Transport`, `undefined` \| `Chain`, `undefined` \| `Account`, `WalletRpcSchema`, \{ [K in string \| number \| symbol]: client[K] } & `WalletActions`\<`undefined` \| `Chain`, `undefined` \| `Account`\>\> | - |
| `walletClient.getAddresses` | () => `Promise`\<`GetAddressesReturnType`\> | Returns a list of account addresses owned by the wallet or client. - Docs: https://viem.sh/docs/actions/wallet/getAddresses.html - JSON-RPC Methods: [`eth_accounts`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_accounts) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const accounts = await client.getAddresses() ``` |
| `walletClient.getChainId` | () => `Promise`\<`number`\> | Returns the chain ID associated with the current network. - Docs: https://viem.sh/docs/actions/public/getChainId.html - JSON-RPC Methods: [`eth_chainId`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_chainid) **`Example`** ```ts import { createWalletClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const chainId = await client.getChainId() // 1 ``` |
| `walletClient.getPermissions` | () => `Promise`\<`GetPermissionsReturnType`\> | Gets the wallets current permissions. - Docs: https://viem.sh/docs/actions/wallet/getPermissions.html - JSON-RPC Methods: [`wallet_getPermissions`](https://eips.ethereum.org/EIPS/eip-2255) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const permissions = await client.getPermissions() ``` |
| `walletClient.key` | `string` | A key for the client. |
| `walletClient.name` | `string` | A name for the client. |
| `walletClient.pollingInterval` | `number` | Frequency (in ms) for polling enabled actions & events. Defaults to 4_000 milliseconds. |
| `walletClient.prepareTransactionRequest` | \<TChainOverride\>(`args`: `PrepareTransactionRequestParameters`\<`undefined` \| `Chain`, `undefined` \| `Account`, `TChainOverride`\>) => `Promise`\<`PrepareTransactionRequestReturnType`\> | Prepares a transaction request for signing. - Docs: https://viem.sh/docs/actions/wallet/prepareTransactionRequest.html **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const request = await client.prepareTransactionRequest({ account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', to: '0x0000000000000000000000000000000000000000', value: 1n, }) ``` **`Example`** ```ts // Account Hoisting import { createWalletClient, http } from 'viem' import { privateKeyToAccount } from 'viem/accounts' import { mainnet } from 'viem/chains' const client = createWalletClient({ account: privateKeyToAccount('0x…'), chain: mainnet, transport: custom(window.ethereum), }) const request = await client.prepareTransactionRequest({ to: '0x0000000000000000000000000000000000000000', value: 1n, }) ``` |
| `walletClient.request` | `EIP1193RequestFn`\<`WalletRpcSchema`\> | Request function wrapped with friendly error handling |
| `walletClient.requestAddresses` | () => `Promise`\<`RequestAddressesReturnType`\> | Requests a list of accounts managed by a wallet. - Docs: https://viem.sh/docs/actions/wallet/requestAddresses.html - JSON-RPC Methods: [`eth_requestAccounts`](https://eips.ethereum.org/EIPS/eip-1102) Sends a request to the wallet, asking for permission to access the user's accounts. After the user accepts the request, it will return a list of accounts (addresses). This API can be useful for dapps that need to access the user's accounts in order to execute transactions or interact with smart contracts. **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const accounts = await client.requestAddresses() ``` |
| `walletClient.requestPermissions` | (`args`: \{ `eth_accounts`: `Record`\<`string`, `any`\>  }) => `Promise`\<`RequestPermissionsReturnType`\> | Requests permissions for a wallet. - Docs: https://viem.sh/docs/actions/wallet/requestPermissions.html - JSON-RPC Methods: [`wallet_requestPermissions`](https://eips.ethereum.org/EIPS/eip-2255) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const permissions = await client.requestPermissions({ eth_accounts: {} }) ``` |
| `walletClient.sendRawTransaction` | (`args`: `SendRawTransactionParameters`) => `Promise`\<\`0x$\{string}\`\> | Sends a **signed** transaction to the network - Docs: https://viem.sh/docs/actions/wallet/sendRawTransaction.html - JSON-RPC Method: [`eth_sendRawTransaction`](https://ethereum.github.io/execution-apis/api-documentation/) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' import { sendRawTransaction } from 'viem/wallet' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const hash = await client.sendRawTransaction({ serializedTransaction: '0x02f850018203118080825208808080c080a04012522854168b27e5dc3d5839bab5e6b39e1a0ffd343901ce1622e3d64b48f1a04e00902ae0502c4728cbf12156290df99c3ed7de85b1dbfe20b5c36931733a33' }) ``` |
| `walletClient.sendTransaction` | \<TChainOverride\>(`args`: `SendTransactionParameters`\<`undefined` \| `Chain`, `undefined` \| `Account`, `TChainOverride`\>) => `Promise`\<\`0x$\{string}\`\> | Creates, signs, and sends a new transaction to the network. - Docs: https://viem.sh/docs/actions/wallet/sendTransaction.html - Examples: https://stackblitz.com/github/wagmi-dev/viem/tree/main/examples/transactions/sending-transactions - JSON-RPC Methods: - JSON-RPC Accounts: [`eth_sendTransaction`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendtransaction) - Local Accounts: [`eth_sendRawTransaction`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendrawtransaction) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const hash = await client.sendTransaction({ account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', value: 1000000000000000000n, }) ``` **`Example`** ```ts // Account Hoisting import { createWalletClient, http } from 'viem' import { privateKeyToAccount } from 'viem/accounts' import { mainnet } from 'viem/chains' const client = createWalletClient({ account: privateKeyToAccount('0x…'), chain: mainnet, transport: http(), }) const hash = await client.sendTransaction({ to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', value: 1000000000000000000n, }) ``` |
| `walletClient.signMessage` | (`args`: `SignMessageParameters`\<`undefined` \| `Account`\>) => `Promise`\<\`0x$\{string}\`\> | Calculates an Ethereum-specific signature in [EIP-191 format](https://eips.ethereum.org/EIPS/eip-191): `keccak256("\x19Ethereum Signed Message:\n" + len(message) + message))`. - Docs: https://viem.sh/docs/actions/wallet/signMessage.html - JSON-RPC Methods: - JSON-RPC Accounts: [`personal_sign`](https://docs.metamask.io/guide/signing-data.html#personal-sign) - Local Accounts: Signs locally. No JSON-RPC request. With the calculated signature, you can: - use [`verifyMessage`](https://viem.sh/docs/utilities/verifyMessage.html) to verify the signature, - use [`recoverMessageAddress`](https://viem.sh/docs/utilities/recoverMessageAddress.html) to recover the signing address from a signature. **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const signature = await client.signMessage({ account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', message: 'hello world', }) ``` **`Example`** ```ts // Account Hoisting import { createWalletClient, http } from 'viem' import { privateKeyToAccount } from 'viem/accounts' import { mainnet } from 'viem/chains' const client = createWalletClient({ account: privateKeyToAccount('0x…'), chain: mainnet, transport: http(), }) const signature = await client.signMessage({ message: 'hello world', }) ``` |
| `walletClient.signTransaction` | \<TChainOverride\>(`args`: `SignTransactionParameters`\<`undefined` \| `Chain`, `undefined` \| `Account`, `TChainOverride`\>) => `Promise`\<\`0x$\{string}\`\> | Signs a transaction. - Docs: https://viem.sh/docs/actions/wallet/signTransaction.html - JSON-RPC Methods: - JSON-RPC Accounts: [`eth_signTransaction`](https://ethereum.github.io/execution-apis/api-documentation/) - Local Accounts: Signs locally. No JSON-RPC request. **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const request = await client.prepareTransactionRequest({ account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', to: '0x0000000000000000000000000000000000000000', value: 1n, }) const signature = await client.signTransaction(request) ``` **`Example`** ```ts // Account Hoisting import { createWalletClient, http } from 'viem' import { privateKeyToAccount } from 'viem/accounts' import { mainnet } from 'viem/chains' const client = createWalletClient({ account: privateKeyToAccount('0x…'), chain: mainnet, transport: custom(window.ethereum), }) const request = await client.prepareTransactionRequest({ to: '0x0000000000000000000000000000000000000000', value: 1n, }) const signature = await client.signTransaction(request) ``` |
| `walletClient.signTypedData` | \<TTypedData, TPrimaryType\>(`args`: `SignTypedDataParameters`\<`TTypedData`, `TPrimaryType`, `undefined` \| `Account`\>) => `Promise`\<\`0x$\{string}\`\> | Signs typed data and calculates an Ethereum-specific signature in [EIP-191 format](https://eips.ethereum.org/EIPS/eip-191): `keccak256("\x19Ethereum Signed Message:\n" + len(message) + message))`. - Docs: https://viem.sh/docs/actions/wallet/signTypedData.html - JSON-RPC Methods: - JSON-RPC Accounts: [`eth_signTypedData_v4`](https://docs.metamask.io/guide/signing-data.html#signtypeddata-v4) - Local Accounts: Signs locally. No JSON-RPC request. **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const signature = await client.signTypedData({ account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', domain: { name: 'Ether Mail', version: '1', chainId: 1, verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC', }, types: { Person: [ { name: 'name', type: 'string' }, { name: 'wallet', type: 'address' }, ], Mail: [ { name: 'from', type: 'Person' }, { name: 'to', type: 'Person' }, { name: 'contents', type: 'string' }, ], }, primaryType: 'Mail', message: { from: { name: 'Cow', wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826', }, to: { name: 'Bob', wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB', }, contents: 'Hello, Bob!', }, }) ``` **`Example`** ```ts // Account Hoisting import { createWalletClient, http } from 'viem' import { privateKeyToAccount } from 'viem/accounts' import { mainnet } from 'viem/chains' const client = createWalletClient({ account: privateKeyToAccount('0x…'), chain: mainnet, transport: http(), }) const signature = await client.signTypedData({ domain: { name: 'Ether Mail', version: '1', chainId: 1, verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC', }, types: { Person: [ { name: 'name', type: 'string' }, { name: 'wallet', type: 'address' }, ], Mail: [ { name: 'from', type: 'Person' }, { name: 'to', type: 'Person' }, { name: 'contents', type: 'string' }, ], }, primaryType: 'Mail', message: { from: { name: 'Cow', wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826', }, to: { name: 'Bob', wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB', }, contents: 'Hello, Bob!', }, }) ``` |
| `walletClient.switchChain` | (`args`: `SwitchChainParameters`) => `Promise`\<`void`\> | Switch the target chain in a wallet. - Docs: https://viem.sh/docs/actions/wallet/switchChain.html - JSON-RPC Methods: [`eth_switchEthereumChain`](https://eips.ethereum.org/EIPS/eip-3326) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet, optimism } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) await client.switchChain({ id: optimism.id }) ``` |
| `walletClient.transport` | `TransportConfig`\<`string`, `EIP1193RequestFn`\> & `Record`\<`string`, `any`\> | The RPC transport |
| `walletClient.type` | `string` | The type of client. |
| `walletClient.uid` | `string` | A unique ID for the client. |
| `walletClient.watchAsset` | (`args`: `WatchAssetParams`) => `Promise`\<`boolean`\> | Adds an EVM chain to the wallet. - Docs: https://viem.sh/docs/actions/wallet/watchAsset.html - JSON-RPC Methods: [`eth_switchEthereumChain`](https://eips.ethereum.org/EIPS/eip-747) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const success = await client.watchAsset({ type: 'ERC20', options: { address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', decimals: 18, symbol: 'WETH', }, }) ``` |
| `walletClient.writeContract` | \<TAbi, TFunctionName, TChainOverride\>(`args`: `WriteContractParameters`\<`TAbi`, `TFunctionName`, `undefined` \| `Chain`, `undefined` \| `Account`, `TChainOverride`\>) => `Promise`\<\`0x$\{string}\`\> | Executes a write function on a contract. - Docs: https://viem.sh/docs/contract/writeContract.html - Examples: https://stackblitz.com/github/wagmi-dev/viem/tree/main/examples/contracts/writing-to-contracts A "write" function on a Solidity contract modifies the state of the blockchain. These types of functions require gas to be executed, and hence a [Transaction](https://viem.sh/docs/glossary/terms.html) is needed to be broadcast in order to change the state. Internally, uses a [Wallet Client](https://viem.sh/docs/clients/wallet.html) to call the [`sendTransaction` action](https://viem.sh/docs/actions/wallet/sendTransaction.html) with [ABI-encoded `data`](https://viem.sh/docs/contract/encodeFunctionData.html). __Warning: The `write` internally sends a transaction – it does not validate if the contract write will succeed (the contract may throw an error). It is highly recommended to [simulate the contract write with `contract.simulate`](https://viem.sh/docs/contract/writeContract.html#usage) before you execute it.__ **`Example`** ```ts import { createWalletClient, custom, parseAbi } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const hash = await client.writeContract({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi: parseAbi(['function mint(uint32 tokenId) nonpayable']), functionName: 'mint', args: [69420], }) ``` **`Example`** ```ts // With Validation import { createWalletClient, custom, parseAbi } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const { request } = await client.simulateContract({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi: parseAbi(['function mint(uint32 tokenId) nonpayable']), functionName: 'mint', args: [69420], } const hash = await client.writeContract(request) ``` |
| `options?` | `Object` | - |
| `options.defaultGas?` | `number` | - |
| `options.defaultGasPrice?` | `number` | - |

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/secured-finance-client.ts:87](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L87)

___

### isRedemptionRequired

▸ **isRedemptionRequired**(`account`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | `string` |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[src/secured-finance-client.ts:848](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L848)

___

### isTerminated

▸ **isTerminated**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[src/secured-finance-client.ts:818](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L818)

___

### mintERC20Token

▸ **mintERC20Token**(`token`): `Promise`\<\`0x$\{string}\`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `Token` |

#### Returns

`Promise`\<\`0x$\{string}\`\>

#### Defined in

[src/secured-finance-client.ts:538](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L538)

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

[src/secured-finance-client.ts:72](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L72)

___

### placeOrder

▸ **placeOrder**(`ccy`, `maturity`, `side`, `amount`, `sourceWallet`, `unitPrice?`, `onApproved?`): `Promise`\<\`0x$\{string}\`\>

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

[src/secured-finance-client.ts:286](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L286)

___

### placePreOrder

▸ **placePreOrder**(`ccy`, `maturity`, `side`, `amount`, `sourceWallet`, `unitPrice`, `onApproved?`): `Promise`\<\`0x$\{string}\`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ccy` | `Currency` |
| `maturity` | `number` |
| `side` | [`OrderSide`](../enums/OrderSide.md) |
| `amount` | `bigint` |
| `sourceWallet` | [`WalletSource`](../enums/WalletSource.md) |
| `unitPrice` | `number` |
| `onApproved?` | (`isApproved`: `boolean`) => `void` \| `Promise`\<`void`\> |

#### Returns

`Promise`\<\`0x$\{string}\`\>

#### Defined in

[src/secured-finance-client.ts:369](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L369)

___

### unwindPosition

▸ **unwindPosition**(`currency`, `maturity`): `Promise`\<\`0x$\{string}\`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `currency` | `Currency` |
| `maturity` | `number` |

#### Returns

`Promise`\<\`0x$\{string}\`\>

#### Defined in

[src/secured-finance-client.ts:657](https://github.com/Secured-Finance/sf-sdk/blob/52126c3/packages/sf-client/src/secured-finance-client.ts#L657)
