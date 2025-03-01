// eslint-disable-next-line func-style, require-jsdoc
function registerScratchExtension () {
    const _global = (typeof global === 'undefined') ? window : global; // eslint-disable-line no-undef, max-len

    const BlockType = _global.Scratch.BlockType;
    const ArgumentType = _global.Scratch.ArgumentType;
    const formatMessage = _global.Scratch.formatMessage;

    const UNIT = {
        cm: 'CM',
        inc: 'INC'
    };

    /**
     * Scratch 3.0 blocks to interact with a peripheral.
     */
    class OpenBlockUltrasonicBlocks {

        /**
         * The ID of the extension.
         * @return {string} the id
         */
        get EXTENSION_ID () {
            return 'ultrasonic';
        }

        get PINS_MENU () {
            return this.deviceInstance.PINS_MENU;
        }

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
         * Construct a MicroBit communication object.
         * @param {Runtime} _runtime - the Scratch 3.0 runtime
         * @param {DeviceInstance} _deviceInstance - the device instance currently running on the virtual machine
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

        get _peripheral () {
            return this.deviceInstance._peripheral;
        }

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
                                menu: 'pins',
                                defaultValue: this.PINS_MENU[2].value
                            },
                            ECHO: {
                                type: ArgumentType.STRING,
                                menu: 'pins',
                                defaultValue: this.PINS_MENU[3].value
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
                    unit: {
                        items: this.UNIT_MENU
                    }
                }
            }];
        }

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
