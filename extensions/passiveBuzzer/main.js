/**
 * Registers the Scratch extension for passive buzzer functionality.
 * @return {class} The OpenBlockPassiveBuzzerBlocks class.
 */
const registerScratchExtension = () => {
    // Determine the global object based on the environment (Node.js or browser).
    const _global = (typeof global === 'undefined') ? window : global; // eslint-disable-line no-undef, max-len

    // Import required Scratch modules from the global object.
    const BlockType = _global.Scratch.BlockType;
    const ArgumentType = _global.Scratch.ArgumentType;
    const formatMessage = _global.Scratch.formatMessage;
    const ProgramModeType = _global.Scratch.ProgramModeType;

    /**
     * Enum for musical notes used in the passive buzzer.
     * @enum {string}
     */
    const NOTE = {
        'C3': 'note_C3',
        'C#3': 'note_Db3',
        'D3': 'note_D3',
        'D#3': 'note_Eb3',
        'E3': 'note_E3',
        'F3': 'note_F3',
        'F#3': 'note_Gb3',
        'G3': 'note_G3',
        'G#3': 'note_Ab3',
        'A3': 'note_A3',
        'A#3': 'note_Bb3',
        'B3': 'note_B3',
        'C4': 'note_C4',
        'C#4': 'note_Db4',
        'D4': 'note_D4',
        'D#4': 'note_Eb4',
        'E4': 'note_E4',
        'F4': 'note_F4',
        'F#4': 'note_Gb4',
        'G4': 'note_G4',
        'G#4': 'note_Ab4',
        'A4': 'note_A4',
        'A#4': 'note_Bb4',
        'B4': 'note_B4',
        'C5': 'note_C5',
        'C#5': 'note_Db5',
        'D5': 'note_D5',
        'D#5': 'note_Eb5',
        'E5': 'note_E5',
        'F5': 'note_F5',
        'F#5': 'note_Gb5',
        'G5': 'note_G5',
        'G#5': 'note_Ab5',
        'A5': 'note_A5',
        'A#5': 'note_Bb5',
        'B5': 'note_B5'
    };

    /**
     * Enum for beat time durations used in the passive buzzer.
     * @enum {string}
     */
    const BEAT_TIME = {
        '1': '1',
        '1/2': '0.5',
        '1/4': '0.25',
        '1/8': '0.125',
        '1/16': '0.0625',
        '2': '2',
        '4': '4'
    };

    /**
     * Enum for ringtones used in the passive buzzer.
     * @enum {string}
     */
    const RINGTONES = {
        'connection': 'R_connection',
        'disconnet': 'R_disconnection',
        'button pushed': 'R_buttonPushed',
        'mode1': 'R_mode1',
        'mode2': 'R_mode2',
        'mode3': 'R_mode3',
        'surprise': 'R_surprise',
        'OhOoh': 'R_OhOoh',
        'OhOoh2': 'R_OhOoh2',
        'cuddly': 'R_cuddly',
        'sleeping': 'R_sleeping',
        'happy': 'R_happy',
        'super happy': 'R_superHappy',
        'happy short': 'R_happy_short',
        'sad': 'R_sad',
        'confused': 'R_confused',
        'fart1': 'R_fart1',
        'fart2': 'R_fart2',
        'fart3': 'R_fart3'
    };

    /**
     * Scratch 3.0 blocks to interact with a passive buzzer peripheral.
     */
    class OpenBlockPassiveBuzzerBlocks {

        /**
         * The ID of the extension.
         * @return {string} the ID of the extension.
         */
        get EXTENSION_ID () {
            return 'passiveBuzzer';
        }

        /**
         * Returns the pins menu from the device instance.
         * @return {Array.<object>} The pins menu items.
         */
        get PINS_MENU () {
            return this.deviceInstance.PINS_MENU;
        }

        /**
         * Returns the note menu for musical notes.
         * @return {Array.<object>} The note menu items.
         */
        get NOTE_MENU () {
            return [
                {
                    text: 'C3',
                    value: NOTE.C3
                },
                {
                    text: 'C#3',
                    value: NOTE['C#3']
                },
                {
                    text: 'D3',
                    value: NOTE.D3
                },
                {
                    text: 'D#3',
                    value: NOTE['D#3']
                },
                {
                    text: 'E3',
                    value: NOTE.E3
                },
                {
                    text: 'E#3',
                    value: NOTE['E#3']
                },
                {
                    text: 'F3',
                    value: NOTE.F3
                },
                {
                    text: 'F#3',
                    value: NOTE['F#3']
                },
                {
                    text: 'G3',
                    value: NOTE.G3
                },
                {
                    text: 'G#3',
                    value: NOTE['G#3']
                },
                {
                    text: 'A3',
                    value: NOTE.A3
                },
                {
                    text: 'A#3',
                    value: NOTE['A#3']
                },
                {
                    text: 'B3',
                    value: NOTE.B3
                },
                {
                    text: 'B#3',
                    value: NOTE['B#3']
                },
                {
                    text: 'C4',
                    value: NOTE.C4
                },
                {
                    text: 'C#4',
                    value: NOTE['C#4']
                },
                {
                    text: 'D4',
                    value: NOTE.D4
                },
                {
                    text: 'D#4',
                    value: NOTE['D#4']
                },
                {
                    text: 'E4',
                    value: NOTE.E4
                },
                {
                    text: 'E#4',
                    value: NOTE['E#4']
                },
                {
                    text: 'F4',
                    value: NOTE.F4
                },
                {
                    text: 'F#4',
                    value: NOTE['F#4']
                },
                {
                    text: 'G4',
                    value: NOTE.G4
                },
                {
                    text: 'G#4',
                    value: NOTE['G#4']
                },
                {
                    text: 'A4',
                    value: NOTE.A4
                },
                {
                    text: 'A#4',
                    value: NOTE['A#4']
                },
                {
                    text: 'B4',
                    value: NOTE.B4
                },
                {
                    text: 'B#4',
                    value: NOTE['B#4']
                },
                {
                    text: 'C5',
                    value: NOTE.C5
                },
                {
                    text: 'C#5',
                    value: NOTE['C#5']
                },
                {
                    text: 'D5',
                    value: NOTE.D5
                },
                {
                    text: 'D#5',
                    value: NOTE['D#5']
                },
                {
                    text: 'E5',
                    value: NOTE.E5
                },
                {
                    text: 'E#5',
                    value: NOTE['E#5']
                },
                {
                    text: 'F5',
                    value: NOTE.F5
                },
                {
                    text: 'F#5',
                    value: NOTE['F#5']
                },
                {
                    text: 'G5',
                    value: NOTE.G5
                },
                {
                    text: 'G#5',
                    value: NOTE['G#5']
                },
                {
                    text: 'A5',
                    value: NOTE.A5
                },
                {
                    text: 'A#5',
                    value: NOTE['A#5']
                },
                {
                    text: 'B5',
                    value: NOTE.B5
                }
            ];
        }

        /**
         * Returns the beat time menu for note durations.
         * @return {Array.<object>} The beat time menu items.
         */
        get BEAT_TIME_MENU () {
            return [
                {
                    text: '1',
                    value: BEAT_TIME['1']
                },
                {
                    text: '1/2',
                    value: BEAT_TIME['1/2']
                },
                {
                    text: '1/4',
                    value: BEAT_TIME['1/4']
                },
                {
                    text: '1/8',
                    value: BEAT_TIME['1/8']
                },
                {
                    text: '1/16',
                    value: BEAT_TIME['1/16']
                },
                {
                    text: '2',
                    value: BEAT_TIME['2']
                },
                {
                    text: '4',
                    value: BEAT_TIME['4']
                }
            ];
        }

        /**
         * Returns the ringtones menu for predefined sounds.
         * @return {Array.<object>} The ringtones menu items.
         */
        get RINGTONES_MENU () {
            return [
                {
                    text: formatMessage({
                        id: 'passiveBuzzer.ringtonesMenu.connection',
                        default: 'connection',
                        description: 'label for connection ringtone'
                    }),
                    value: RINGTONES.connection
                },
                {
                    text: formatMessage({
                        id: 'passiveBuzzer.ringtonesMenu.disconnet',
                        default: 'disconnet',
                        description: 'label for disconnet ringtone'
                    }),
                    value: RINGTONES.disconnet
                },
                {
                    text: formatMessage({
                        id: 'passiveBuzzer.ringtonesMenu.buttonPushed',
                        default: 'button pushed',
                        description: 'label for button pushed ringtone'
                    }),
                    value: RINGTONES['button pushed']
                },
                {
                    text: formatMessage({
                        id: 'passiveBuzzer.ringtonesMenu.mode1',
                        default: 'mode1',
                        description: 'label for mode1 ringtone'
                    }),
                    value: RINGTONES.mode1
                },
                {
                    text: formatMessage({
                        id: 'passiveBuzzer.ringtonesMenu.mode2',
                        default: 'mode2',
                        description: 'label for mode2 ringtone'
                    }),
                    value: RINGTONES.mode2
                },
                {
                    text: formatMessage({
                        id: 'passiveBuzzer.ringtonesMenu.mode3',
                        default: 'mode3',
                        description: 'label for mode3 ringtone'
                    }),
                    value: RINGTONES.mode3
                },
                {
                    text: formatMessage({
                        id: 'passiveBuzzer.ringtonesMenu.surprise',
                        default: 'surprise',
                        description: 'label for surprise ringtone'
                    }),
                    value: RINGTONES.surprise
                },
                {
                    text: formatMessage({
                        id: 'passiveBuzzer.ringtonesMenu.OhOoh',
                        default: 'OhOoh',
                        description: 'label for OhOoh ringtone'
                    }),
                    value: RINGTONES.OhOoh
                },
                {
                    text: formatMessage({
                        id: 'passiveBuzzer.ringtonesMenu.OhOoh2',
                        default: 'OhOoh2',
                        description: 'label for OhOoh2 ringtone'
                    }),
                    value: RINGTONES.OhOoh2
                },
                {
                    text: formatMessage({
                        id: 'passiveBuzzer.ringtonesMenu.cuddly',
                        default: 'cuddly',
                        description: 'label for cuddly ringtone'
                    }),
                    value: RINGTONES.cuddly
                },
                {
                    text: formatMessage({
                        id: 'passiveBuzzer.ringtonesMenu.sleeping',
                        default: 'sleeping',
                        description: 'label for sleeping ringtone'
                    }),
                    value: RINGTONES.sleeping
                },
                {
                    text: formatMessage({
                        id: 'passiveBuzzer.ringtonesMenu.happy',
                        default: 'happy',
                        description: 'label for happy ringtone'
                    }),
                    value: RINGTONES.happy
                },
                {
                    text: formatMessage({
                        id: 'passiveBuzzer.ringtonesMenu.superHappy',
                        default: 'super happy',
                        description: 'label for super happy ringtone'
                    }),
                    value: RINGTONES['super happy']
                },
                {
                    text: formatMessage({
                        id: 'passiveBuzzer.ringtonesMenu.happyShort',
                        default: 'happy short',
                        description: 'label for happy short ringtone'
                    }),
                    value: RINGTONES['happy short']
                },
                {
                    text: formatMessage({
                        id: 'passiveBuzzer.ringtonesMenu.sad',
                        default: 'sad',
                        description: 'label for sad ringtone'
                    }),
                    value: RINGTONES.sad
                },
                {
                    text: formatMessage({
                        id: 'passiveBuzzer.ringtonesMenu.confused',
                        default: 'confused',
                        description: 'label for confused ringtone'
                    }),
                    value: RINGTONES.confused
                },
                {
                    text: formatMessage({
                        id: 'passiveBuzzer.ringtonesMenu.fart1',
                        default: 'fart1',
                        description: 'label for fart1 ringtone'
                    }),
                    value: RINGTONES.fart1
                },
                {
                    text: formatMessage({
                        id: 'passiveBuzzer.ringtonesMenu.fart2',
                        default: 'fart2',
                        description: 'label for fart2 ringtone'
                    }),
                    value: RINGTONES.fart2
                },
                {
                    text: formatMessage({
                        id: 'passiveBuzzer.ringtonesMenu.fart3',
                        default: 'fart3',
                        description: 'label for fart3 ringtone'
                    }),
                    value: RINGTONES.fart3
                }
            ];
        }

        /**
         * Constructs an OpenBlockPassiveBuzzerBlocks instance.
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

            /**
             * The pin number connected to the passive buzzer.
             * @type {string}
             */
            this._pin = '';

            /**
             * The tempo (beats per minute) for playing notes.
             * @type {string}
             */
            this._Tempo = '120';
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
                id: 'passiveBuzzer',
                name: formatMessage({
                    id: 'passiveBuzzer.categoryName',
                    default: 'Passive Buzzer',
                    description: 'Label for the passiveBuzzer extension category'
                }),

                color1: '#B943FF',
                color2: '#9900FF',
                color3: '#9900FF',

                blocks: [
                    {
                        opcode: 'init',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'passiveBuzzer.init',
                            default: 'init passive buzzer pin [PIN]',
                            description: 'Init passive buzzer'
                        }),
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'outPins',
                                defaultValue: this.PINS_MENU[0].value
                            }
                        }
                    },
                    {
                        opcode: 'playToneForBeat',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'passiveBuzzer.playToneForBeat',
                            default: 'play tone [FREQ] for [TIME] beat',
                            description: 'Passive buzzer play tone for beat'
                        }),
                        arguments: {
                            FREQ: {
                                type: ArgumentType.STRING,
                                menu: 'note',
                                defaultValue: NOTE.C4
                            },
                            TIME: {
                                type: ArgumentType.STRING,
                                menu: 'beatTime',
                                defaultValue: BEAT_TIME['1']
                            }
                        }
                    },
                    {
                        opcode: 'setTempo',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'passiveBuzzer.setTempo',
                            default: 'set tempo to (bpm) [BPM]',
                            description: 'Passive buzzer set tempo'
                        }),
                        arguments: {
                            BPM: {
                                type: 'custom_math_whole_number',
                                defaultValue: '120'
                            }
                        }
                    },
                    {
                        opcode: 'playRingtone',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'passiveBuzzer.playRingtone',
                            default: 'play ringtone [NO]',
                            description: 'Passive play ringtone'
                        }),
                        arguments: {
                            NO: {
                                type: ArgumentType.STRING,
                                menu: 'ringtones',
                                defaultValue: RINGTONES.connection
                            }
                        },
                        programMode: [ProgramModeType.UPLOAD]
                    }
                ],
                customFieldTypes: {
                    custom_math_whole_number: {
                        output: 'Number',
                        outputShape: 2,
                        color1: '#FFFFFF',
                        color2: '#FFFFFF',
                        color3: '#FFFFFF',
                        args0: [
                            {
                                type: 'field_number',
                                name: 'NUM',
                                min: 0,
                                precision: 1
                            }
                        ]
                    }
                },
                menus: {
                    outPins: {
                        items: this.PINS_MENU
                    },
                    note: {
                        items: this.NOTE_MENU
                    },
                    beatTime: {
                        items: this.BEAT_TIME_MENU
                    },
                    ringtones: {
                        items: this.RINGTONES_MENU
                    }
                }
            }];
        }

        /**
         * Initializes the passive buzzer with the specified pin.
         * @param {object} args - The block arguments.
         * @return {Promise} A promise that resolves when the initialization is complete.
         */
        init (args) {
            if (this._peripheral.isReady()) {
                this._pin = args.PIN;
                return Promise.resolve();
            }
        }

        /**
         * Plays a tone for a specified duration.
         * @param {object} args - The block arguments.
         * @return {Promise} A promise that resolves when the tone has finished playing.
         */
        playToneForBeat (args) {
            const noteFreqTable = {
                note_C3: 130.81,
                note_Db3: 138.59,
                note_D3: 146.83,
                note_Eb3: 155.56,
                note_E3: 164.81,
                note_F3: 174.61,
                note_Gb3: 185,
                note_G3: 196,
                note_Ab3: 207.65,
                note_A3: 220,
                note_Bb3: 233.08,
                note_B3: 246.94,
                note_C4: 261.63,
                note_Db4: 277.18,
                note_D4: 293.66,
                note_Eb4: 311.13,
                note_E4: 329.63,
                note_F4: 349.23,
                note_Gb4: 369.99,
                note_G4: 392,
                note_Ab4: 415.3,
                note_A4: 440,
                note_Bb4: 466.16,
                note_B4: 493.88,
                note_C5: 523.25,
                note_Db5: 554.37,
                note_D5: 587.33,
                note_Eb5: 622.25,
                note_E5: 659.26,
                note_F5: 698.46,
                note_Gb5: 739.99,
                note_G5: 783.99,
                note_Ab5: 830.61,
                note_A5: 880,
                note_Bb5: 932.33,
                note_B5: 987.77
            };

            if (this._peripheral.isReady() && this._pin !== '') {
                const time = parseFloat(args.TIME);
                return new Promise(resolve => {
                    this._peripheral._firmata.buzzerTone(this._pin, noteFreqTable[`${args.FREQ}`]);
                    setTimeout(() => {
                        this._peripheral._firmata.buzzerNoTone(this._pin);
                        resolve();
                    }, time * 1000 * 60 / this._Tempo);
                });
            }
        }

        /**
         * Sets the tempo (beats per minute) for playing notes.
         * @param {object} args - The block arguments.
         * @return {Promise} A promise that resolves when the tempo is set.
         */
        setTempo (args) {
            this._Tempo = args.BPM;
            return Promise.resolve();
        }
    }

    return OpenBlockPassiveBuzzerBlocks;
};

exports = registerScratchExtension;
