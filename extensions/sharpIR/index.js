const sharpIR = formatMessage => ({
    name: formatMessage({
        id: 'sharpIR.name',
        default: 'Sharp IR Sensor'
    }),
    extensionId: 'sharpIR',
    version: '1.0.0',
    supportDevice: ['arduinoUno', 'arduinoNano', 'arduinoLeonardo',
        'arduinoMega2560', 'arduinoEsp8266', 'lgt8f328pNano'],
    author: 'ArthurZheng',
    iconURL: `assets/sharpIR.png`,
    description: formatMessage({
        id: 'sharpIR.description',
        default: 'Infrared distance sensor based on the principle of triangle ranging.'
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

module.exports = sharpIR;
