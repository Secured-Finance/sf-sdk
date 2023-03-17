# Secured Finance - SF Graph Client

## Quick Start

1. Run `npm install @secured-finance/sf-graph-client --save` to install this client.
2. Set the environment variable `SF_ENV`.

```
SF_ENV=development
```

3. Import the `GraphClientProvider` and set it into your application root.

```tsx
import { GraphClientProvider } from '@secured-finance/sf-graph-client';

const App = () => {
    return (
        <GraphClientProvider network="goerli">
            <YourPage />
        </GraphClientProvider>
    );
};

export default App;
```

4. Import the `useQuery` hook and use it to query the graph.
5. Import all queries from `@secured-finance/sf-graph-client` to use with `useQuery`.

```ts
import { useQuery } from '@secured-finance/sf-graph-client';
import queries from '@secured-finance/sf-graph-client/dist/graphclients';

```

## Environment Variables
| Name     | Use    | Value    |
| -------- | -------- | -------- |
| SF_ENV   | Environment of the connection destination | development / staging / production |

## Building

1. Run the `npm run codegen` command to generate the graph client to access the Subgraph.
2. Run the `npm run build` command to compile the graph client.
