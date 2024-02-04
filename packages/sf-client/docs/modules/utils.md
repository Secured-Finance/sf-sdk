[@secured-finance/sf-client](../README.md) / [Exports](../modules.md) / utils

# Namespace: utils

## Table of contents

### Type Aliases

- [ContractEnvironments](utils.md#contractenvironments)
- [Network](utils.md#network)
- [NetworkName](utils.md#networkname)

### Variables

- [CHAINS](utils.md#chains)
- [NETWORKS](utils.md#networks)
- [networkNames](utils.md#networknames)

### Functions

- [getContractEnvironment](utils.md#getcontractenvironment)

## Type Aliases

### ContractEnvironments

Ƭ **ContractEnvironments**: typeof `contractEnvironments`[`number`]

#### Defined in

[packages/sf-client/src/utils/networks.ts:59](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/utils/networks.ts#L59)

___

### Network

Ƭ **Network**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |
| `name` | `string` |

#### Defined in

[packages/sf-client/src/utils/networks.ts:39](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/utils/networks.ts#L39)

___

### NetworkName

Ƭ **NetworkName**: typeof [`networkNames`](utils.md#networknames)[`number`]

#### Defined in

[packages/sf-client/src/utils/networks.ts:37](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/utils/networks.ts#L37)

## Variables

### CHAINS

• `Const` **CHAINS**: `Object`

#### Index signature

▪ [key: `number`]: `Chain`

#### Defined in

[packages/sf-client/src/utils/networks.ts:20](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/utils/networks.ts#L20)

___

### NETWORKS

• `Const` **NETWORKS**: `Object`

#### Index signature

▪ [key: `number`]: `string`

#### Defined in

[packages/sf-client/src/utils/networks.ts:11](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/utils/networks.ts#L11)

___

### networkNames

• `Const` **networkNames**: readonly [``"sepolia"``, ``"mainnet"``, ``"arbitrum-sepolia"``, ``"arbitrum-one"``, ``"avalanche-fuji"``, ``"avalanche-mainnet"``]

#### Defined in

[packages/sf-client/src/utils/networks.ts:29](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/utils/networks.ts#L29)

## Functions

### getContractEnvironment

▸ **getContractEnvironment**(`networkName`): ``"mainnet"`` \| ``"sepolia"`` \| ``"arbitrum-one"`` \| ``"arbitrum-sepolia"`` \| ``"avalanche-mainnet"`` \| ``"development"`` \| ``"staging"`` \| ``"development-arb"`` \| ``"development-ava"`` \| ``"staging-arb"`` \| ``"staging-ava"``

#### Parameters

| Name | Type |
| :------ | :------ |
| `networkName` | ``"mainnet"`` \| ``"sepolia"`` \| ``"arbitrum-one"`` \| ``"arbitrum-sepolia"`` \| ``"avalanche-mainnet"`` \| ``"avalanche-fuji"`` |

#### Returns

``"mainnet"`` \| ``"sepolia"`` \| ``"arbitrum-one"`` \| ``"arbitrum-sepolia"`` \| ``"avalanche-mainnet"`` \| ``"development"`` \| ``"staging"`` \| ``"development-arb"`` \| ``"development-ava"`` \| ``"staging-arb"`` \| ``"staging-ava"``

#### Defined in

[packages/sf-client/src/utils/networks.ts:82](https://github.com/Secured-Finance/sf-sdk/blob/3fc4a6d/packages/sf-client/src/utils/networks.ts#L82)
