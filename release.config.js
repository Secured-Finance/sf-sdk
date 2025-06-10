module.exports = {
    branches: [
        { name: 'main', channel: 'latest' },
        { name: 'develop', prerelease: 'beta' },
    ],
    tagFormat: '${version}',
    plugins: [
        'semantic-release-monorepo',
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        ['@semantic-release/changelog', { changelogFile: 'CHANGELOG.md' }],
        '@semantic-release/npm',
        ['@semantic-release/git', { assets: ['CHANGELOG.md', 'package.json'] }],
        '@semantic-release/github',
    ],
};
