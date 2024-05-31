import { CodegenConfig } from '@graphql-codegen/cli';
import 'dotenv/config';

const config: CodegenConfig = {
    schema: process.env.SCHEMA_URL,
    documents: ['src/**/*.graphql'],
    ignoreNoDocuments: true,
    generates: {
        './src/types.ts': {
            plugins: [
                'typescript',
                'typescript-resolvers',
                'typescript-react-apollo',
                'typescript-operations',
            ],
        },
    },
};

export default config;
