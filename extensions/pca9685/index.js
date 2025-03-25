const pca9685 = formatMessage => ({
    name: formatMessage({
        id: 'pca9685.name',
        default: 'PCA9685 Module'
    }),
    extensionId: 'pca9685',
    version: '1.0.0',
    supportDevice: ['arduinoUno', 'arduinoNano', 'arduinoLeonardo',
        'arduinoMega2560', 'arduinoEsp32', 'arduinoEsp8266', 'lgt8f328pNano'],
    author: 'ArthurZheng',
    iconURL: `assets/pca9685.png`,
    description: formatMessage({
        id: 'pca9685.description',
        default: 'The 16 channel PWM driver module based on PCA9685, uses IIC bus for communication.'
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

module.exports = pca9685;
