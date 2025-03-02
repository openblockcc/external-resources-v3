const deepseek = formatMessage => ({
    name: formatMessage({
        id: 'deepseek.name',
        default: 'DeepSeek'
    }),
    extensionId: 'deepseek',
    version: '1.0.0',
    author: 'ArthurZheng',
    iconURL: `assets/deepseek.png`,
    description: formatMessage({
        id: 'deepseek.description',
        default: 'Allows users to chat with DeepSeek, enabling interactive and intelligent conversations.'
    }),
    featured: true,
    internetConnectionRequired: true,
    main: 'main.js',
    translations: 'translations.js',
    official: true,
    tags: ['other'],
    helpLink: 'https://wiki.openblock.cc'
});

module.exports = deepseek;
