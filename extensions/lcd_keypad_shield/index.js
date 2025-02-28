const lcd = formatMessage => ({
    name: formatMessage({
        id: 'lcdks.name',
        default: 'LCD Keypad Shield'
    }),
    extensionId: 'lcdks',
    version: '1.0.0',
    supportDevice: ['arduinoUno', 'arduinoNano', 'arduinoLeonardo',
        'arduinoMega2560', 'arduinoEsp8266', 'arduinoEsp32'],
    author: 'Kautism',
    iconURL: `assets/lcd_keypad_shield.png`,
    description: formatMessage({
        id: 'lcdks.description',
        default: '1602 liquid crystal display with keypad contains 5 keys.'
    }),
    featured: true,
    blocks: 'blocks.js',
    generator: 'generator.js',
    toolbox: 'toolbox.js',
    translations: 'translations.js',
    library: 'lib',
    official: true,
    tags: ['display'],
    helpLink: 'https://wiki.dfrobot.com/LCD_KeyPad_Shield_For_Arduino_SKU__DFR0009'
});

module.exports = lcd;
