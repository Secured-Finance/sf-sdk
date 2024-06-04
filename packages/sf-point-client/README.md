# Secured Finance - SF Point Client

## Quick Start

1. Run `npm install @secured-finance/sf-point-client @apollo/client graphql --save` to install this client and Apollo Client.
2. Set up the Apollo Client according to the official [documentation](https://www.apollographql.com/docs/react/)
3. Use the exported React hooks.

```typescript
import { useGetQuestsQuery} from '@secured-finance/sf-point-client';

const QuestPage = () => {
  const { data, loading } = useGetQuestsQuery();
      :
}
```

## Building

1. Refer to `.env.sample` and create `.env`.
2. Run the `npm run codegen` command to generate the code out of the point system GraphQL schema.
3. Run the `npm run build` command to compile the generated code.