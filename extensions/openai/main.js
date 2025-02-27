// eslint-disable-next-line func-style, require-jsdoc
function registerScratchExtension () {
    const _global = (typeof global === 'undefined') ? window : global; // eslint-disable-line no-undef, max-len

    const BlockType = _global.Scratch.BlockType;
    const ArgumentType = _global.Scratch.ArgumentType;
    const formatMessage = _global.Scratch.formatMessage;
    const fetch = _global.fetch;

    const Temperature = {
        VERY_CONSERVATIVE: '0.0',
        CONSERVATIVE: '0.2',
        BALANCED: '1',
        CREATIVE: '1.5',
        VERY_CREATIVE: '2.0'
    };

    const Model = {
        'GPT_4O': 'gpt-4o',
        'GPT_4O_MINI': 'gpt-4o-mini',
        'GPT_4': 'gpt-4',
        'GPT_3.5_TURBO': 'gpt-3.5-turbo'
    };

    /**
     * Scratch 3.0 extension for interacting with OpenAI.
     */
    class OpenBlockOpenaiBlocks {
        /**
         * The ID of the extension.
         * @return {string} The extension ID
         */
        get EXTENSION_ID () {
            return 'openai';
        }

        /**
         * Menu for selecting temperature values.
         * @return {Array} The temperature selection menu
         */
        get TEMPERATURE_MENU () {
            return [
                {
                    text: formatMessage({
                        id: 'openai.temperature.veryConservative',
                        default: 'Very Conservative',
                        description: 'Very conservative response style'
                    }),
                    value: Temperature.VERY_CONSERVATIVE
                },
                {
                    text: formatMessage({
                        id: 'openai.temperature.conservative',
                        default: 'Conservative',
                        description: 'Conservative response style'
                    }),
                    value: Temperature.CONSERVATIVE
                },
                {
                    text: formatMessage({
                        id: 'openai.temperature.balanced',
                        default: 'Balanced',
                        description: 'Balanced response style'
                    }),
                    value: Temperature.BALANCED
                },
                {
                    text: formatMessage({
                        id: 'openai.temperature.creative',
                        default: 'Creative',
                        description: 'Creative response style'
                    }),
                    value: Temperature.CREATIVE
                },
                {
                    text: formatMessage({
                        id: 'openai.temperature.veryCreative',
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
                    text: 'GPT-4o',
                    value: Model.GPT_4O
                },
                {
                    text: 'GPT-4o mini',
                    value: Model.GPT_4O_MINI
                },
                {
                    text: 'GPT-4',
                    value: Model.GPT_4
                },
                {
                    text: 'GPT-3.5 Turbo',
                    value: Model['GPT_3.5_TURBO']
                }
            ];
        }

        /**
         * Constructor for the OpenAI block package.
         * @param {Runtime} _runtime - The Scratch 3.0 runtime
         */
        constructor (_runtime) {
            this.runtime = _runtime;

            this.apiKey = '';
            this.conversationHistory = []; // Stores the conversation history to maintain context
        }

        /**
         * Defines the blocks available in this extension.
         * @return {Array} The list of blocks
         */
        getInfo () {
            return [{
                id: 'openai',
                name: formatMessage({
                    id: 'openai.categoryName',
                    default: 'OpenAI',
                    description: 'Label for the OpenAI extension category'
                }),

                color1: '#159C7E',
                color2: '#167A64',
                color3: '#167A64',

                blocks: [
                    {
                        opcode: 'setApiKey',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'openai.setApiKey',
                            default: 'set OpenAI API Key to [API_KEY]',
                            description: 'Set OpenAI API key'
                        }),
                        arguments: {
                            API_KEY: {
                                type: ArgumentType.STRING,
                                defaultValue: 'OPENAI_API_KEY'
                            }
                        }
                    },
                    {
                        opcode: 'askOpenAI',
                        blockType: BlockType.REPORTER,
                        text: formatMessage({
                            id: 'openai.askOpenAI',
                            default: 'ask OpenAI [PROMPT]',
                            description: 'Ask OpenAI a question'
                        }),
                        arguments: {
                            PROMPT: {
                                type: ArgumentType.STRING,
                                defaultValue: formatMessage({
                                    id: 'openai.askOpenAI.default',
                                    default: 'Hello, OpenAI!',
                                    description: 'Default prompt for the askOpenAI block'
                                })
                            }
                        }
                    },
                    {
                        opcode: 'tellOpenAI',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'openai.tellOpenAI',
                            default: 'Set the pre-instruction for OpenAI [CONTENT]',
                            description: 'Set an instruction to be added at the beginning of OpenAI\'s conversation'
                        }),
                        arguments: {
                            CONTENT: {
                                type: ArgumentType.STRING,
                                defaultValue: formatMessage({
                                    id: 'openai.tellOpenAI.default',
                                    default: 'You are a cute devil bird.',
                                    description: 'Default content for the tellOpenAI block'
                                })
                            }
                        }
                    },
                    {
                        opcode: 'clearHistory',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'openai.clearHistory',
                            default: 'clear conversation history',
                            description: 'Clear openai conversation history'
                        })
                    },
                    '---',
                    {
                        opcode: 'chooseModel',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'openai.chooseModel',
                            default: 'set AI model to [MODEL]',
                            description: 'Choose openai model'
                        }),
                        arguments: {
                            MODEL: {
                                type: ArgumentType.STRING,
                                menu: 'model',
                                defaultValue: Model.GPT_4O_MINI
                            }
                        }
                    },
                    {
                        opcode: 'setTemperature',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'openai.setTemperature',
                            default: 'set response style to [STYLE]',
                            description: 'Set openai response style'
                        }),
                        arguments: {
                            STYLE: {
                                type: ArgumentType.STRING,
                                menu: 'temperature',
                                defaultValue: Temperature.BALANCED
                            }
                        }
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
         * Sets the OpenAI API key.
         * @param {object} args - The block arguments
         */
        setApiKey (args) {
            this.apiKey = args.API_KEY;
        }

        /**
         * Sets the content to be remembered or used by OpenAI.
         * @param {object} args - The block arguments containing the content to be set.
         */
        tellOpenAI (args) {
            this.promoteContent = args.CONTENT;
        }

        /**
         * Requests a response from OpenAI.
         * @param {object} args - The block arguments
         * @return {Promise<string>} A promise resolving with the response text
         */
        askOpenAI (args) {
            return new Promise(resolve => {
                if (!this.apiKey) {
                    resolve(formatMessage({
                        id: 'openai.missingApiKey',
                        default: 'Oops! It seems like you forgot to set the API Key. Please make sure it\'s set before asking OpenAI.', // eslint-disable-line max-len
                        description: 'Message shown when API key is missing'
                    }));
                    return;
                }

                const prompt = args.PROMPT;
                const model = this.model || Model['gpt-3.5-turbo'];
                const temperature = this.temperature || 0.7;

                this.conversationHistory.push({role: 'user', content: prompt});

                this.fetchOpenAIResponse(prompt, model, temperature)
                    .then(response => {
                        if (response && response.choices.length > 0) {
                            const answer = response.choices[0].message.content.trim();
                            this.conversationHistory.push({role: 'assistant', content: answer});
                            resolve(answer);
                        } else {
                            resolve(formatMessage({
                                id: 'openai.invalidResponse',
                                default: 'Something went wrong. OpenAI didn\'t respond as expected. Please try again.',
                                description: 'Message shown when the response from OpenAI is invalid'
                            }));
                        }
                    })
                    .catch(error => resolve(error));
            });
        }

        /**
         * Fetches a response from OpenAI API.
         * @param {string} prompt - The user's prompt
         * @param {string} model - The AI model
         * @param {number} temperature - Response randomness level
         * @param {number} timeout - Timeout duration in milliseconds
         * @return {Promise<object>} A promise resolving with the API response
         */
        fetchOpenAIResponse (prompt, model, temperature, timeout = 5000) {
            // Prepare the messages array, including the promote content if set
            const messages = [...this.conversationHistory];

            // Add promoteContent to the beginning of the messages if it exists
            if (this.promoteContent) {
                messages.unshift({role: 'system', content: this.promoteContent});
            }

            // Add the user's prompt to the conversation
            messages.push({role: 'user', content: prompt});

            const url = 'https://api.openai.com/v1/chat/completions';
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
                            id: 'openai.connectionError',
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
                    id: 'openai.networkError',
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

    return OpenBlockOpenaiBlocks;
}

exports = registerScratchExtension;
