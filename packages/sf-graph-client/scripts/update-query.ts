import { program } from 'commander';
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from 'fs';

const arrowedEnvironments = ['development', 'staging', 'production'] as const;
type Environment = (typeof arrowedEnvironments)[number];

class Main {
    private environment: Environment;

    constructor(environment: string) {
        if (!arrowedEnvironments.includes(environment as Environment)) {
            console.error('error: invalid environment:', environment);
            process.exit(1);
        }

        this.environment = environment as Environment;
    }

    run() {
        const rootDir = process.cwd();
        const baseQueryPath = `${rootDir}/src/queries`;
        const queryPath = `${baseQueryPath}/${this.environment}`;

        if (existsSync(queryPath)) {
            rmSync(queryPath, { recursive: true });
        }
        mkdirSync(queryPath);

        const fileNames = readdirSync(baseQueryPath, {
            withFileTypes: true,
        })
            .filter(dirent => dirent.isFile() && dirent.name.endsWith('.ts'))
            .map(({ name }) => name);

        for (const fileName of fileNames) {
            cpSync(`${baseQueryPath}/${fileName}`, `${queryPath}/${fileName}`);
        }
    }
}

program.option('--environment <name>', 'environment name');
program.parse(process.argv);
const { environment } = program.opts();

new Main(environment).run();
