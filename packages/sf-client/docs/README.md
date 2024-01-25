@secured-finance/sf-client / [Exports](modules.md)

# Secured Finance - SF Client

## Quick Start

1. Save your NPM auth token by storing it directly in the .npmrc file or through terminal(run `NPM_AUTH_TOKEN="Personal Access Token"`)
Note: If you face an authentication issue please repeat this step for all packages individually. 
2. Run `npm install @secured-finance/sf-client --save` to install this client.
3. Set the environment variable `SF_ENV`.

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

## Working with SDK

To test your changes in the SDK within the web app, you should create a local version of SDK.

Note: Please run all checks before creating the package i.e build, codegen and tests.

Go to sf-client:

`cd packages/sf-client`. 

Run `npm pack` to generate a package that includes your changes. 

The output of this command will display the name of the package in the last line, which usually is `secured-finance-sf-client-0.2.0-beta.62.tgz`.

Go to the root directory of the web app  and run `npm install ../sf-sdk/packages/sf-client/secured-finance-sf-client-0.2.0-beta.62.tgz` to install the package within your web app, 
 
Note: The path to the package must be relative to the root directory of your web app, and ensure that you use the correct name of the package.

The web app will now use the local version of the SDK that you've created!
