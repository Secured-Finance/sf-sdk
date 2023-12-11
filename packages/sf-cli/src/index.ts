#!/usr/bin/env node
import inquirer from 'inquirer';
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import { directories, fileTemplates } from './config.js';

export function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function createComponent(): Promise<void> {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'directory',
            message: 'Choose a directory to create the component:',
            choices: directories,
        },
        {
            type: 'input',
            name: 'componentName',
            message: 'What is the name of the component?',
            validate: (input: string) => input !== '',
        },
    ]);

    const confirmationMessage = `A component named ${chalk.redBright.bold(
        capitalizeFirstLetter(answers.componentName)
    )} will be created in ${chalk.green.bold(
        answers.directory
    )}. Confirm creation?`;

    const confirmation = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirm',
            message: confirmationMessage,
        },
    ]);

    if (confirmation.confirm) {
        const componentName = capitalizeFirstLetter(answers.componentName);
        const componentDir = path.join(
            'src/components',
            answers.directory,
            componentName
        );

        if (!fs.existsSync(componentDir)) {
            fs.mkdirSync(componentDir, { recursive: true });
        }

        fs.writeFileSync(
            path.join(componentDir, 'index.ts'),
            fileTemplates.index(componentName)
        );
        fs.writeFileSync(
            path.join(componentDir, `${componentName}.tsx`),
            fileTemplates.component(componentName)
        );
        fs.writeFileSync(
            path.join(componentDir, `${componentName}.stories.tsx`),
            fileTemplates.story(componentName, answers.directory)
        );
        fs.writeFileSync(
            path.join(componentDir, `${componentName}.test.tsx`),
            fileTemplates.test(componentName)
        );

        console.log(
            chalk.green.bold(
                `${componentName} component has been created in the ${answers.directory} folder.`
            )
        );
    } else {
        console.log(chalk.red('Operation cancelled'));
    }
}

createComponent();
