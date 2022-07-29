# Secured Finance - SF Client

## Quick Start

1. Run `npm install @secured-finance/sf-client --save` to install this client.
2. Set the environment variable `SF_ENV`.

```
SF_ENV=development
```

3. Import the `SecuredFinanceClient` and set it into your application.

```ts
import { SecuredFinanceClient } from '@secured-finance/sf-client';

const sfClient = new SecuredFinanceClient();
await sfClient.init(signer, network);
```

## Environment Variables
| Name     | Use    | Value    |
| -------- | -------- | -------- |
| SF_ENV   | Environment of the connection destination | development / staging / production |

## Building

1. Run the `npm run codegen` command to generate the types of smart contracts using `typechain`.
2. Run the `npm run build` command to compile the client files.

## Testing

Run the `npm run test` command to execute unit testing.


## Example codes

Run the `npx ts-node ./examples/<FILE NAME>.ts` command to execute example codes to test `SecuredFinanceClient`.
