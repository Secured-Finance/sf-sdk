import { program } from 'commander';
import { readFileSync, writeFileSync } from 'fs';
import { dump, load } from 'js-yaml';

class Main {
    private label: string;

    constructor(label: string) {
        if (label == 'false') {
            console.error('Error: label is empty.');
            process.exit(1);
        }

        this.label = label;
    }

    run() {
        const rootDir = process.cwd();
        const yamlText = readFileSync(`${rootDir}/.graphclientrc.yml`, 'utf8');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = load(yamlText) as any;

        for (const source of data.sources) {
            const endpoint: string = source.handler.graphql.endpoint;
            const path = endpoint.substring(0, endpoint.lastIndexOf('/') + 1);
            source.handler.graphql.endpoint = path + this.label;
        }

        const newYamlText = dump(data);

        writeFileSync(`${rootDir}/.graphclientrc.yml`, newYamlText, 'utf8');
    }
}

program.option('--label <label>', 'subgraph version label');
program.parse(process.argv);
const { label } = program.opts();

new Main(label).run();
