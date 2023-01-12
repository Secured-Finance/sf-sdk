import { readFileSync, writeFileSync } from 'fs';

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
        const path = `${process.cwd()}/deployment.json`;
        const jsonText = readFileSync(path, 'utf8');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = JSON.parse(jsonText) as any;

        const { version, isMajorUpdate, isMinorUpdate } =
            data[this.environment];
        const versions: string[] = version.split('.');

        if (isMajorUpdate) {
            versions[0] = String(Number(versions[0]) + 1);
            versions[1] = '0';
            versions[2] = '0';
        } else if (isMinorUpdate) {
            versions[1] = String(Number(versions[1]) + 1);
            versions[2] = '0';
        } else {
            versions[2] = String(Number(versions[2]) + 1);
        }

        data[this.environment].version = versions.join('.');
        data[this.environment].isMajorUpdate = false;
        data[this.environment].isMinorUpdate = false;
        const newYamlText = JSON.stringify(data, null, 2);

        writeFileSync(path, newYamlText, 'utf8');
    }
}

const [, , environment] = process.argv;

new Main(environment).run();
