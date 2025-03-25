const eitghtTimesEightMatirxDisplay = formatMessage => ({
    name: formatMessage({
        id: 'eitghtTimesEightMatirxDisplay.name',
        default: '8x8 Matrix Display'
    }),
    extensionId: 'eitghtTimesEightMatirxDisplay',
    version: '1.0.0',
    supportDevice: ['arduinoUno', 'arduinoNano', 'arduinoLeonardo',
        'arduinoMega2560', 'arduinoEsp8266', 'arduinoEsp32', 'lgt8f328pNano'],
    author: 'ArthurZheng',
    iconURL: `assets/eitghtTimesEightMatirxDisplay.png`,
    description: formatMessage({
        id: 'eitghtTimesEightMatirxDisplay.description',
        default: '8x8 matrix display module based on MAX7219.'
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

module.exports = eitghtTimesEightMatirxDisplay;
