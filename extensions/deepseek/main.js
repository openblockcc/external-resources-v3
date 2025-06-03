// eslint-disable-next-line func-style, require-jsdoc
function registerScratchExtension () {
    const BlockType = window.Scratch.BlockType;
    const ArgumentType = window.Scratch.ArgumentType;
    const formatMessage = window.Scratch.formatMessage;
    const ProgramModeType = window.Scratch.ProgramModeType;
    const fetch = window.fetch;

    const Temperature = {
        VERY_CONSERVATIVE: '0.0',
        CONSERVATIVE: '1.0',
        BALANCED: '1.3',
        CREATIVE: '1.5',
        VERY_CREATIVE: '2.0'
    };

    const Model = {
        DEEPSEEK_CHAT: 'deepseek-chat',
        DEEPSEEK_REASONER: 'deepseek-reasoner'
    };

    /**
     * Scratch 3.0 extension for interacting with DeepSeek.
     */
    class OpenBlockDeepseekBlocks {
        /**
         * The ID of the extension.
         * @return {string} The extension ID
         */
        get EXTENSION_ID () {
            return 'deepseek';
        }

        /**
         * Menu for selecting temperature values.
         * @return {Array} The temperature selection menu
         */
        get TEMPERATURE_MENU () {
            return [
                {
                    text: formatMessage({
                        id: 'deepseek.temperature.veryConservative',
                        default: 'Very Conservative',
                        description: 'Very conservative response style'
                    }),
                    value: Temperature.VERY_CONSERVATIVE
                },
                {
                    text: formatMessage({
                        id: 'deepseek.temperature.conservative',
                        default: 'Conservative',
                        description: 'Conservative response style'
                    }),
                    value: Temperature.CONSERVATIVE
                },
                {
                    text: formatMessage({
                        id: 'deepseek.temperature.balanced',
                        default: 'Balanced',
                        description: 'Balanced response style'
                    }),
                    value: Temperature.BALANCED
                },
                {
                    text: formatMessage({
                        id: 'deepseek.temperature.creative',
                        default: 'Creative',
                        description: 'Creative response style'
                    }),
                    value: Temperature.CREATIVE
                },
                {
                    text: formatMessage({
                        id: 'deepseek.temperature.veryCreative',
                        default: 'Very Creative',
                        description: 'Very creative response style'
                    }),
                    value: Temperature.VERY_CREATIVE
                }
            ];
        }

        get MODEL_MENU () {
            return [
                {
                    text: 'DeepSeek-V3',
                    value: Model.DEEPSEEK_CHAT
                },
                {
                    text: 'DeepSeek-R1',
                    value: Model.DEEPSEEK_REASONER
                }
            ];
        }

        /**
         * Constructor for the DeepSeek block package.
         * @param {Runtime} _runtime - The Scratch 3.0 runtime
         */
        constructor (_runtime) {
            this.runtime = _runtime;

            this.apiKey = '';
            this.conversationHistory = []; // Stores the conversation history to maintain context
            this.promoteContent = '';
            this.model = Model.DEEPSEEK_CHAT;
            this.temperature = 1.0;
        }

        /**
         * Defines the blocks available in this extension.
         * @return {Array} The list of blocks
         */
        getInfo () {
            return [{
                id: 'deepseek',
                name: formatMessage({
                    id: 'deepseek.categoryName',
                    default: 'DeepSeek',
                    description: 'Label for the DeepSeek extension category'
                }),

                color1: '#4f6bfe',
                color2: '#2e4ce7',
                color3: '#2e4ce7',

                blocks: [
                    {
                        opcode: 'setApiKey',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'deepseek.setApiKey',
                            default: 'set DeepSeek API Key to [API_KEY]',
                            description: 'Set DeepSeek API key'
                        }),
                        arguments: {
                            API_KEY: {
                                type: ArgumentType.STRING,
                                defaultValue: 'DEEPSEEK_API_KEY'
                            }
                        },
                        programMode: [ProgramModeType.REALTIME]
                    },
                    {
                        opcode: 'askDeepSeek',
                        blockType: BlockType.REPORTER,
                        text: formatMessage({
                            id: 'deepseek.askDeepSeek',
                            default: 'ask DeepSeek [PROMPT]',
                            description: 'Ask DeepSeek a question'
                        }),
                        arguments: {
                            PROMPT: {
                                type: ArgumentType.STRING,
                                defaultValue: formatMessage({
                                    id: 'deepseek.askDeepSeek.default',
                                    default: 'Hello, DeepSeek!',
                                    description: 'Default prompt for the askDeepSeek block'
                                })
                            }
                        },
                        programMode: [ProgramModeType.REALTIME]
                    },
                    {
                        opcode: 'tellDeepSeek',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'deepseek.tellDeepSeek',
                            default: 'Set the pre-instruction for DeepSeek [CONTENT]',
                            description: 'Set an instruction to be added at the beginning of DeepSeek\'s conversation'
                        }),
                        arguments: {
                            CONTENT: {
                                type: ArgumentType.STRING,
                                defaultValue: formatMessage({
                                    id: 'deepseek.tellDeepSeek.default',
                                    default: 'You are a cute devil bird.',
                                    description: 'Default content for the tellDeepSeek block'
                                })
                            }
                        },
                        programMode: [ProgramModeType.REALTIME]
                    },
                    {
                        opcode: 'clearHistory',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'deepseek.clearHistory',
                            default: 'clear conversation history',
                            description: 'Clear DeepSeek conversation history'
                        }),
                        programMode: [ProgramModeType.REALTIME]
                    },
                    '---',
                    {
                        opcode: 'chooseModel',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'deepseek.chooseModel',
                            default: 'set AI model to [MODEL]',
                            description: 'Choose DeepSeek model'
                        }),
                        arguments: {
                            MODEL: {
                                type: ArgumentType.STRING,
                                menu: 'model',
                                defaultValue: Model.DEEPSEEK_CHAT
                            }
                        },
                        programMode: [ProgramModeType.REALTIME]
                    },
                    {
                        opcode: 'setTemperature',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'deepseek.setTemperature',
                            default: 'set response style to [STYLE]',
                            description: 'Set DeepSeek response style'
                        }),
                        arguments: {
                            STYLE: {
                                type: ArgumentType.STRING,
                                menu: 'temperature',
                                defaultValue: Temperature.BALANCED
                            }
                        },
                        programMode: [ProgramModeType.REALTIME]
                    }
                ],
                menus: {
                    model: {
                        items: this.MODEL_MENU
                    },
                    temperature: {
                        items: this.TEMPERATURE_MENU
                    }
                }
            }];
        }

        /**
         * Sets the DeepSeek API key.
         * @param {object} args - The block arguments
         */
        setApiKey (args) {
            this.apiKey = args.API_KEY;
        }

        /**
         * Sets the content to be remembered or used by DeepSeek.
         * @param {object} args - The block arguments containing the content to be set.
         */
        tellDeepSeek (args) {
            this.promoteContent = args.CONTENT;
        }

        /**
         * Requests a response from DeepSeek.
         * @param {object} args - The block arguments
         * @return {Promise<string>} A promise resolving with the response text
         */
        askDeepSeek (args) {
            return new Promise(resolve => {
                if (!this.apiKey) {
                    resolve(formatMessage({
                        id: 'deepseek.missingApiKey',
                        default: 'Oops! It seems like you forgot to set the API Key. Please make sure it\'s set before asking DeepSeek.', // eslint-disable-line max-len
                        description: 'Message shown when API key is missing'
                    }));
                    return;
                }

                const prompt = args.PROMPT;
                const model = this.model;
                const temperature = this.temperature;

                this.conversationHistory.push({role: 'user', content: prompt});

                this.fetchDeepSeekResponse(model, temperature)
                    .then(response => {
                        if (response && response.choices.length > 0) {
                            const answer = response.choices[0].message.content.trim();
                            this.conversationHistory.push({role: 'assistant', content: answer});
                            resolve(answer);
                        } else {
                            this.conversationHistory.pop();
                            resolve(formatMessage({
                                id: 'deepseek.invalidResponse',
                                default: 'Something went wrong. DeepSeek didn\'t respond as expected. Please try again.', // eslint-disable-line max-len
                                description: 'Message shown when the response from DeepSeek is invalid'
                            }));
                        }
                    })
                    .catch(error => {
                        this.conversationHistory.pop();
                        return resolve(error);
                    });
            });
        }

        /**
         * Fetches a response from DeepSeek API.
         * @param {string} model - The AI model
         * @param {number} temperature - Response randomness level
         * @param {number} timeout - Timeout duration in milliseconds
         * @return {Promise<object>} A promise resolving with the API response
         */
        fetchDeepSeekResponse (model, temperature, timeout = 30000) {
            // Prepare the messages array, including the promote content if set
            const messages = [...this.conversationHistory];

            // Add promoteContent to the beginning of the messages if it exists
            if (this.promoteContent) {
                messages.unshift({role: 'system', content: this.promoteContent});
            }

            const url = 'https://api.deepseek.com/chat/completions';
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            };
            const data = {
                model,
                messages,
                temperature
            };

            // Create a timeout promise that rejects after the specified duration
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('timeout')), timeout)
            );

            // Create the fetch promise
            const fetchPromise = fetch(url, {method: 'POST', headers, body: JSON.stringify(data)})
                .then(response => {
                    if (!response.ok) {
                        return Promise.reject(formatMessage({
                            id: 'deepseek.connectionError',
                            default: 'Something went wrong with the connection. Please check your internet and API key, and try again.', // eslint-disable-line max-len
                            description: 'Message shown when there is a network or server issue'
                        }));
                    }
                    return response.json();
                });

            // Race between the fetch promise and the timeout promise
            return Promise.race([fetchPromise, timeoutPromise])
                .then(response => response)
                .catch(() => Promise.reject(formatMessage({
                    id: 'deepseek.networkError',
                    default: 'There seems to be a network issue. Please check your connection and try again.',
                    description: 'Message shown when there is a network error'
                })));
        }

        /**
         * Clears conversation history.
         */
        clearHistory () {
            this.conversationHistory = [];
        }

        /**
         * Sets the AI model.
         * @param {object} args - The block arguments
         */
        chooseModel (args) {
            this.model = args.MODEL;
        }

        /**
         * Sets the response style (temperature).
         * @param {object} args - The block arguments
         */
        setTemperature (args) {
            this.temperature = parseFloat(args.STYLE);
        }
    }

    return OpenBlockDeepseekBlocks;
}

exports = registerScratchExtension;
