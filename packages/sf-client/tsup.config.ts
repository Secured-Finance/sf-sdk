import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    clean: true,
    external: [
        'viem',
        '@secured-finance/sf-core',
        '@secured-finance/contracts',
    ],
});
