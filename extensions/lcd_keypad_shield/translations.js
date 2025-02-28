// This file was automatically generated. Do not modify.
/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
/* eslint-disable quotes */
/* eslint-disable quote-props */
/* eslint-disable dot-notation */
/* eslint-disable max-len */
function getInterfaceTranslations () {
    return {
        "en": {
            "lcdks.name": "LCD Keypad Shield",
            "lcdks.description": "1602 liquid crystal display with keypad contains 5 keys."
        },
        "ru": {
            "lcdks.name": "LCD клавиатурный щит",
            "lcdks.description": "1602 жидкокристаллический дисплей с клавиатурой содержит 5 клавиш."
        },
        "zh-cn": {
            "lcdks.name": "液晶鍵盤面板",
            "lcdks.description": "1602液晶显示器，带有5个按键。"
        },
        "zh-tw": {
            "lcdks.name": "液晶鍵盤面板",
            "lcdks.description": "帶有5個按鍵的1602液晶顯示模組。"
        }
    };
}

function registerScratchExtensionTranslations () {
    return {};
}

function registerBlocksMessages (Blockly) {
    Object.assign(Blockly.ScratchMsgs.locales["en"],
        {
            "LCD_CATEGORY": "LCD Keypad Shield",
            "LCD_INIT": "Initialize LCD Keypad Shield",
            "LCD_SETCURSORPOSITION": "Set LCD cursor position x: %1 y: %2",
            "LCD_PRINT": "LCD display %1",
            "LCD_CLEAR": "Clear LCD display",
            "LCD_SETBACKLIGHT": "Set LCD backlight %1",
            "LCD_SATE_ON": "On",
            "LCD_SATE_OFF": "Off",
            "LCD_SETCURSORSTYLE": "Set LCD cursor %1 style %2",
            "LCD_SATE_DISPLAY": "Display",
            "LCD_SATE_HIDE": "Hide",
            "LCD_STYLE_BLINK": "Blink",
            "LCD_STYLE_NOBLINK": "No Blink",
            "LCD_UP": "Up pressed",
            "LCD_DOWN": "Down pressed",
            "LCD_LEFT": "Left pressed",
            "LCD_RIGHT": "Right pressed",
            "LCD_SELECT": "Select pressed"
        }
        
    );

    Object.assign(Blockly.ScratchMsgs.locales["ru"],
        {
            "LCD_CATEGORY": "LCD клавиатурный щит",
            "LCD_INIT": "инициализация LCD клавиатурного щита",
            "LCD_SETCURSORPOSITION": "установить позицию курсора LCD x: %1 y: %2",
            "LCD_PRINT": "печать на LCD %1",
            "LCD_CLEAR": "очистить LCD",
            "LCD_SETBACKLIGHT": "установить подсветку LCD %1",
            "LCD_SATE_ON": "включено",
            "LCD_SATE_OFF": "выключено",
            "LCD_SETCURSORSTYLE": "установить стиль курсора LCD %1 %2",
            "LCD_SATE_DISPLAY": "отображение",
            "LCD_SATE_HIDE": "скрыть",
            "LCD_STYLE_BLINK": "мигание",
            "LCD_STYLE_NOBLINK": "не мигать",
            "LCD_UP": "нажата вверх",
            "LCD_DOWN": "нажата вниз",
            "LCD_LEFT": "нажата влево",
            "LCD_RIGHT": "нажата вправо",
            "LCD_SELECT": "выбрана кнопка"
        }        
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"],
        {
            "LCD_CATEGORY": "液晶键盘面板",
            "LCD_INIT": "初始化液晶键盘面板",
            "LCD_SETCURSORPOSITION": "设置液晶显示器光标位置 x: %1 y: %2",
            "LCD_PRINT": "液晶显示器显示 %1",
            "LCD_CLEAR": "清空液晶显示器",
            "LCD_SETBACKLIGHT": "设置液晶显示器背光 %1",
            "LCD_SATE_ON": "开",
            "LCD_SATE_OFF": "关",
            "LCD_SETCURSORSTYLE": "设置液晶显示器光标 %1 样式 %2",
            "LCD_SATE_DISPLAY": "显示",
            "LCD_SATE_HIDE": "隐藏",
            "LCD_STYLE_BLINK": "闪烁",
            "LCD_STYLE_NOBLINK": "不闪烁",
            "LCD_READKEY": "读取键盘信号",
            "LCD_UP": "上被按下",
            "LCD_DOWN": "下被按下",
            "LCD_LEFT": "左被按下",
            "LCD_RIGHT": "右被按下",
            "LCD_SELECT": "选择被按下"
           }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"],
        {
            "LCD_CATEGORY": "液晶鍵盤面板",
            "LCD_INIT": "初始化液晶鍵盤面板",
            "LCD_SETCURSORPOSITION": "設置液晶顯示器光標位置 x: %1 y: %2",
            "LCD_PRINT": "液晶顯示器顯示 %1",
            "LCD_CLEAR": "清空液晶顯示器",
            "LCD_SETBACKLIGHT": "設置液晶顯示器背光 %1",
            "LCD_SATE_ON": "開",
            "LCD_SATE_OFF": "關",
            "LCD_SETCURSORSTYLE": "設置液晶顯示器光標 %1 樣式 %2",
            "LCD_SATE_DISPLAY": "顯示",
            "LCD_SATE_HIDE": "隱藏",
            "LCD_STYLE_BLINK": "閃爍",
            "LCD_STYLE_NOBLINK": "不閃爍",
            "LCD_UP": "上被按下",
            "LCD_DOWN": "下被按下",
            "LCD_LEFT": "左被按下",
            "LCD_RIGHT": "右被按下",
            "LCD_SELECT": "選擇被按下"
        }
    );

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}
exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;
