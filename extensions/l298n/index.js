const l298n = formatMessage => ({
    name: 'L298N',
    extensionId: 'l298n',
    version: '1.0.0',
    supportDevice: ['arduinoUno', 'arduinoNano', 'arduinoLeonardo',
        'arduinoMega2560', 'arduinoEsp8266', 'lgt8f328pNano'],
    author: 'Liang',
    iconURL: `assets/l298n.png`,
    description: formatMessage({
        id: 'l298n.description',
        default: 'Common high power dual motor drive module.'
    }),
    featured: true,
    blocks: 'blocks.js',
    generator: 'generator.js',
    toolbox: 'toolbox.js',
    translations: 'translations.js',
    library: 'lib',
    official: true,
    tags: ['actuator'],
    helpLink: 'https://wiki.openblock.cc'
});

module.exports = l298n;
