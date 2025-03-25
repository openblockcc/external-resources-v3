const sdCard = formatMessage => ({
    name: formatMessage({
        id: 'sdCard.name',
        default: 'SD Card Module'
    }),
    extensionId: 'sdCard',
    version: '1.0.0',
    supportDevice: ['arduinoUno', 'arduinoNano', 'arduinoLeonardo',
        'arduinoMega2560', 'arduinoEsp32', 'arduinoEsp8266', 'lgt8f328pNano'],
    author: 'ArthurZheng',
    iconURL: `assets/sdCard.png`,
    description: formatMessage({
        id: 'sdCard.description',
        default: 'Save or read your data in SD card.'
    }),
    featured: true,
    blocks: 'blocks.js',
    generator: 'generator.js',
    toolbox: 'toolbox.js',
    translations: 'translations.js',
    library: 'lib',
    official: true,
    tags: ['other'],
    helpLink: 'https://wiki.openblock.cc'
});

module.exports = sdCard;
