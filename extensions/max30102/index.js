const max30102 = formatMessage => ({
    name: formatMessage({
        id: 'max30102.name',
        default: 'MAX30102 Sensor'
    }),
    extensionId: 'max30102',
    version: '1.0.0',
    supportDevice: ['arduinoUno', 'arduinoNano', 'arduinoLeonardo',
        'arduinoMega2560', 'arduinoEsp32', 'arduinoEsp8266', 'lgt8f328pNano'],
    author: 'ArthurZheng',
    iconURL: `assets/max30102.png`,
    description: formatMessage({
        id: 'max30102.description',
        default: 'Blood oxygen and heart rate detection module based on MAX30102.'
    }),
    featured: true,
    blocks: 'blocks.js',
    generator: 'generator.js',
    toolbox: 'toolbox.js',
    translations: 'translations.js',
    library: 'lib',
    official: true,
    tags: ['sensor'],
    helpLink: 'https://wiki.openblock.cc'
});

module.exports = max30102;
