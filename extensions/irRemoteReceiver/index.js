const irRemoteReceiver = formatMessage => ({
    name: formatMessage({
        id: 'irRemoteReceiver.name',
        default: 'IR Remote Receiver'
    }),
    extensionId: 'irRemoteReceiver',
    version: '1.0.0',
    supportDevice: ['arduinoUno', 'arduinoNano', 'arduinoLeonardo',
        'arduinoMega2560', 'arduinoEsp32', 'arduinoEsp8266', 'lgt8f328pNano'],
    author: 'ArthurZheng',
    iconURL: `assets/irRemoteReceiver.png`,
    description: formatMessage({
        id: 'irRemoteReceiver.description',
        default: 'Receiving and decoding data in infrared carrier.'
    }),
    featured: true,
    blocks: 'blocks.js',
    generator: 'generator.js',
    toolbox: 'toolbox.js',
    translations: 'translations.js',
    library: 'lib',
    official: true,
    tags: ['communication'],
    helpLink: 'https://wiki.openblock.cc'
});

module.exports = irRemoteReceiver;
