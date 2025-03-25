const nrf24l01 = formatMessage => ({
    name: 'NRF24l01',
    extensionId: 'nrf24l01',
    version: '1.0.0',
    supportDevice: ['arduinoUno', 'arduinoNano', 'arduinoLeonardo',
        'arduinoMega2560', 'arduinoEsp8266', 'arduinoEsp32', 'lgt8f328pNano'],
    author: 'ArthurZheng',
    iconURL: `assets/nrf24l01.png`,
    description: formatMessage({
        id: 'nrf24l01.description',
        default: '2.4G RF transceiver module.'
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

module.exports = nrf24l01;
