const eightDigitDisplay = formatMessage => ({
    name: formatMessage({
        id: 'eightDigitDisplay.name',
        default: '8-Digit Display'
    }),
    extensionId: 'eightDigitDisplay',
    version: '1.0.0',
    supportDevice: ['arduinoUno', 'arduinoNano', 'arduinoLeonardo',
        'arduinoMega2560', 'arduinoEsp8266', 'arduinoEsp32', 'lgt8f328pNano'],
    author: 'ArthurZheng',
    iconURL: `assets/eightDigitDisplay.png`,
    description: formatMessage({
        id: 'eightDigitDisplay.description',
        default: '8-digit display module based on MAX7219.'
    }),
    featured: true,
    blocks: 'blocks.js',
    generator: 'generator.js',
    toolbox: 'toolbox.js',
    translations: 'translations.js',
    library: 'lib',
    official: true,
    tags: ['display'],
    helpLink: 'https://wiki.openblock.cc'
});

module.exports = eightDigitDisplay;
