/**
 * Registers the Scratch extension for ultrasonic sensor functionality.
 * @return {class} The OpenBlockUltrasonicBlocks class.
 */
function registerScratchExtension () { // eslint-disable-line func-style
    // Determine the global object based on the environment (Node.js or browser).
    const _global = (typeof global === 'undefined') ? window : global; // eslint-disable-line no-undef, max-len

    // Import required Scratch modules from the global object.
    const BlockType = _global.Scratch.BlockType;
    const ArgumentType = _global.Scratch.ArgumentType;
    const formatMessage = _global.Scratch.formatMessage;

    /**
     * Enum for unit types used in the ultrasonic sensor.
     * @enum {string}
     */
    const UNIT = {
        cm: 'CM', // Centimeters
        inc: 'INC' // Inches
    };

    /**
     * Scratch 3.0 blocks to interact with an ultrasonic sensor peripheral.
     */
    class OpenBlockUltrasonicBlocks {

        /**
         * The ID of the extension.
         * @return {string} the ID of the extension.
         */
        get EXTENSION_ID () {
            return 'ultrasonic';
        }

        /**
         * Returns the pins menu from the device instance.
         * @return {Array.<object>} The pins menu items.
         */
        get PINS_MENU () {
            return this.deviceInstance.PINS_MENU;
        }

        /**
         * Returns the pins menu from the device instance.
         * @return {Array.<object>} The out pins menu items.
         */
        get OUT_PINS_MENU () {
            return this.deviceInstance.OUT_PINS_MENU ?? this.deviceInstance.PINS_MENU;
        }


        /**
         * Returns the unit menu for distance measurement.
         * @return {Array.<object>} The unit menu items.
         */
        get UNIT_MENU () {
            return [
                {
                    text: 'cm',
                    value: UNIT.cm
                },
                {
                    text: 'inch',
                    value: UNIT.inc
                }
            ];
        }

        /**
         * Constructs an OpenBlockUltrasonicBlocks instance.
         * @param {Runtime} _runtime - The Scratch 3.0 runtime.
         * @param {DeviceInstance} _deviceInstance - The device instance currently running on the virtual machine.
         */
        constructor (_runtime, _deviceInstance) {
            /**
             * The runtime instantiating this block package.
             * @type {Runtime}
             */
            this.runtime = _runtime;

            /**
             * The peripheral device running in the current runtime.
             * @type {DeviceInstance}
             */
            this.deviceInstance = _deviceInstance;
        }

        /**
         * Returns the peripheral instance associated with the device.
         * @return {object} The peripheral instance.
         */
        get _peripheral () {
            return this.deviceInstance._peripheral;
        }

        /**
         * Returns the metadata for this extension and its blocks.
         * @return {object} The extension metadata.
         */
        getInfo () {
            return [{
                id: 'ultrasonic',
                name: formatMessage({
                    id: 'ultrasonic.categoryName',
                    default: 'Ultrasonic',
                    description: 'Label for the ultrasonic extension category'
                }),

                color1: '#D39DDB',
                color2: '#BA55D3',
                color3: '#BA55D3',

                blocks: [
                    {
                        opcode: 'readDistance',
                        blockType: BlockType.REPORTER,
                        text: formatMessage({
                            id: 'ultrasonic.readDistance',
                            default: 'ultrasonic sensor pin TRIG [TRIG] ECHO [ECHO] read distance [UNIT]',
                            description: 'ultrasonic read distance'
                        }),
                        arguments: {
                            TRIG: {
                                type: ArgumentType.STRING,
                                menu: 'outPins',
                                defaultValue: this.OUT_PINS_MENU[2].value
                            },
                            ECHO: {
                                type: ArgumentType.STRING,
                                menu: 'pins',
                                defaultValue: this.OUT_PINS_MENU[3].value
                            },
                            UNIT: {
                                type: ArgumentType.STRING,
                                menu: 'unit',
                                defaultValue: UNIT.cm
                            }
                        }
                    }
                ],
                menus: {
                    pins: {
                        items: this.PINS_MENU
                    },
                    outPins: {
                        items: this.OUT_PINS_MENU
                    },
                    unit: {
                        items: this.UNIT_MENU
                    }
                }
            }];
        }

        /**
         * Reads the distance from the ultrasonic sensor.
         * @param {object} args - The block arguments.
         * @return {Promise} A promise that resolves with the distance value.
         */
        readDistance (args) {
            let unit = 0;
            if (args.UNIT === UNIT.inc) {
                unit = 1;
            }

            if (this._peripheral.isReady()) {
                return new Promise(resolve => {
                    this._peripheral._firmata.sonarRead(args.TRIG, args.ECHO, unit, value => resolve(value));
                });
            }
        }
    }

    return OpenBlockUltrasonicBlocks;
}

exports = registerScratchExtension;
