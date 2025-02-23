// eslint-disable-next-line func-style, require-jsdoc
function registerScratchExtension () {
    const _global = (typeof global === 'undefined') ? window : global; // eslint-disable-line no-undef, max-len

    const BlockType = _global.Scratch.BlockType;
    const ArgumentType = _global.Scratch.ArgumentType;
    const formatMessage = _global.Scratch.formatMessage;
    const fetch = _global.fetch;

    const TEMPERATURE = {
        precise: '0.0',
        focused: '0.3',
        balanced: '0.7',
        creative: '1.2',
        imaginative: '1.6',
        unpredictable: '2.0'
    };

    const MODEL = {
        'gpt-4o': 'gpt-4o',
        'gpt-4o-mini': 'gpt-4o-mini',
        'gpt-4': 'gpt-4',
        'gpt-3.5-turbo': 'gpt-3.5-turbo'
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
                    text: 'precise',
                    value: TEMPERATURE.precise
                },
                {
                    text: 'focused',
                    value: TEMPERATURE.focused
                },
                {
                    text: 'balanced',
                    value: TEMPERATURE.balanced
                },
                {
                    text: 'creative',
                    value: TEMPERATURE.creative
                },
                {
                    text: 'imaginative',
                    value: TEMPERATURE.imaginative
                },
                {
                    text: 'unpredictable',
                    value: TEMPERATURE.unpredictable
                }
            ];
        }

        get MODEL_MENU () {
            return [
                {
                    text: 'gpt-4o',
                    value: MODEL['gpt-4o']
                },
                {
                    text: 'gpt-4o-mini',
                    value: MODEL['gpt-4o-mini']
                }, {
                    text: 'gpt-4',
                    value: MODEL['gpt-4']
                }, {
                    text: 'gpt-3.5-turbo',
                    value: MODEL['gpt-3.5-turbo']
                }
            ];
        }

        /**
         * Constructor for the OpenAI block package.
         * @param {Runtime} _runtime - The Scratch 3.0 runtime
         */
        constructor (_runtime) {
            this.runtime = _runtime;

            // this.apiKey = ''; // Default API key and conversation history initialization
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
                            description: 'set OpenAI API key'
                        }),
                        arguments: {
                            API_KEY: {
                                type: ArgumentType.STRING,
                                defaultValue: 'OPENAI_API_KEY'
                            }
                        }
                    },
                    {
                        opcode: 'generateText',
                        blockType: BlockType.REPORTER,
                        text: formatMessage({
                            id: 'openai.generateText',
                            default: 'ask OpenAI [PROMPT]',
                            description: 'ask OpenAI'
                        }),
                        arguments: {
                            PROMPT: {
                                type: ArgumentType.STRING,
                                defaultValue: 'Hello, OpenAI!'
                            }
                        }
                    },
                    {
                        opcode: 'clearHistory',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'openai.clearHistory',
                            default: 'clear conversation history',
                            description: 'clear openai conversation history'
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
                                defaultValue: MODEL['gpt-4o-mini']
                            }
                        }
                    },
                    {
                        opcode: 'setTemperature',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'openai.setTemperature',
                            default: 'set response style to [STYLE]',
                            description: 'set openai response style'
                        }),
                        arguments: {
                            STYLE: {
                                type: ArgumentType.STRING,
                                menu: 'temperature',
                                defaultValue: TEMPERATURE.balanced
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
         * Requests a response from OpenAI.
         * @param {object} args - The block arguments
         * @return {Promise<string>} A promise resolving with the response text
         */
        generateText (args) {
            return new Promise((resolve, reject) => {
                if (!this.apiKey) {
                    reject('API Key is not set');
                    return;
                }

                const prompt = args.PROMPT;
                const model = this.model || 'gpt-3.5-turbo';
                const temperature = this.temperature || 0.7;

                this.conversationHistory.push({role: 'user', content: prompt});

                this.fetchOpenAIResponse(prompt, model, temperature)
                    .then(response => {
                        if (response && response.choices.length > 0) {
                            const answer = response.choices[0].message.content.trim();
                            this.conversationHistory.push({role: 'assistant', content: answer});
                            resolve(answer);
                        } else {
                            reject('No response');
                        }
                    })
                    .catch(error => reject(`Error fetching OpenAI response: ${error}`));
            });
        }

        /**
         * Fetches a response from OpenAI API.
         * @param {string} prompt - The user's prompt
         * @param {string} model - The AI model
         * @param {number} temperature - Response randomness level
         * @return {Promise<object>} A promise resolving with the API response
         */
        fetchOpenAIResponse (prompt, model, temperature) {
            const url = 'https://api.openai.com/v1/chat/completions';
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            };
            const data = {
                model,
                messages: [...this.conversationHistory, {role: 'user', content: prompt}],
                temperature
            };

            return fetch(url, {method: 'POST', headers, body: JSON.stringify(data)})
                // eslint-disable-next-line no-confusing-arrow
                .then(response => response.ok ? response.json() : Promise.reject('OpenAI API request failed'));
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
