const u8g2 = formatMessage => ({
    name: 'U8G2',
    extensionId: 'u8g2',
    version: '1.0.0',
    supportDevice: ['arduinoUno', 'arduinoNano', 'arduinoLeonardo',
        'arduinoMega2560', 'arduinoEsp8266', 'arduinoEsp32', 'lgt8f328pNano'],
    author: 'ArthurZheng',
    iconURL: `assets/u8g2.png`,
    description: formatMessage({
        id: 'u8g2.description',
        default: 'U8g2 is a general graphics library for multiple screens, which is suitable for LCD (base on ST7920) or OLED (base on SSD1306) screens.'
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

module.exports = u8g2;
