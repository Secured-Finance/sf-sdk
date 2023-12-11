export const directories = [
    'atoms',
    'molecules',
    'organisms',
    'pages',
    'templates',
];

export const fileTemplates = {
    index: (componentName: string) => `export * from './${componentName}';\n`,
    component: (componentName: string) => `\
export const ${componentName} = ({}) => {
    return <div>${componentName}</div>;
};
`,
    story: (
        componentName: string,
        type: string
    ) => `import type { Meta, StoryFn } from '@storybook/react';
import { ${componentName} } from './${componentName}';
export default {
    title: '${type.charAt(0).toUpperCase() + type.slice(1)}/${componentName}',
    component: ${componentName},
    args: {},
    argTypes: {},
} as Meta<typeof ${componentName}>;

const Template: StoryFn<typeof ${componentName}> = args => <${componentName} {...args} />;

export const Default = Template.bind({});
`,
    test: (
        componentName: string
    ) => `import { composeStories } from '@storybook/react';
import { render } from 'src/test-utils.js';
import * as stories from './${componentName}.stories';
const { Default } = composeStories(stories);

describe('${componentName} component', () => {
    it('should render a ${componentName}', () => {
        render(<Default />);
    });
});
`,
};
