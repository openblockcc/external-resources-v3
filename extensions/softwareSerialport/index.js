const softwareSerial = formatMessage => ({
    name: formatMessage({
        id: 'softwareSerial.name',
        default: 'Software Serial'
    }),
    extensionId: 'softwareSerial',
    version: '1.0.0',
    supportDevice: ['arduinoUno', 'arduinoNano', 'arduinoLeonardo', 'arduinoMega2560', 'lgt8f328pNano'],
    author: 'ArthurZheng',
    iconURL: `assets/softwareSerial.png`,
    description: formatMessage({
        id: 'softwareSerial.description',
        default: 'Allow serial communication on other digital pins of the Arduino.'
    }),
    featured: true,
    blocks: 'blocks.js',
    generator: 'generator.js',
    toolbox: 'toolbox.js',
    translations: 'translations.js',
    official: true,
    tags: ['other'],
    helpLink: 'https://wiki.openblock.cc'
});

module.exports = softwareSerial;
