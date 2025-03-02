const openai = formatMessage => ({
    name: formatMessage({
        id: 'openai.name',
        default: 'OpenAI'
    }),
    extensionId: 'openai',
    version: '1.0.0',
    author: 'ArthurZheng',
    iconURL: `assets/openai.png`,
    description: formatMessage({
        id: 'openai.description',
        default: 'Allows users to chat with OpenAI, enabling interactive and intelligent conversations.'
    }),
    featured: true,
    internetConnectionRequired: true,
    main: 'main.js',
    translations: 'translations.js',
    official: true,
    tags: ['other'],
    helpLink: 'https://wiki.openblock.cc'
});

module.exports = openai;
