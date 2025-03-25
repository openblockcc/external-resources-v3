/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerGenerators (Blockly) {
    Blockly.Arduino.lcd_init = function () {
        Blockly.Arduino.includes_.lcd_init = `#include <Wire.h>\n#include <LiquidCrystal.h>
#define __lcdks_pressed(x,y)({int value = analogRead(A0);value>x && value < y;})`;
        Blockly.Arduino.definitions_.lcd_init = `LiquidCrystal lcd( 8,  9,  4,  5,  6,  7);`;

        return `lcd.begin(16, 2);\n`;
    };

    Blockly.Arduino.lcd_setCursorPosition = function (block) {
        const x = Blockly.Arduino.valueToCode(block, 'X', Blockly.Arduino.ORDER_ATOMIC);
        const y = Blockly.Arduino.valueToCode(block, 'Y', Blockly.Arduino.ORDER_ATOMIC);

        return `lcd.setCursor(${x}, ${y});\n`;
    };

    Blockly.Arduino.lcd_print = function (block) {
        const data = Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_ATOMIC);

        return `lcd.print(${data});\n`;
    };

    Blockly.Arduino.lcd_clear = function () {
        return `lcd.clear();\n`;
    };

    Blockly.Arduino.lcd_setBackLight = function (block) {
        const state = block.getFieldValue('STATE');

        if (state === 'on') {
            return `lcd.backlight();\n`;
        }
        return `lcd.noBacklight();\n`;
    };

    Blockly.Arduino.lcd_setCursorStyle = function (block) {
        const state = block.getFieldValue('STATE');
        const style = block.getFieldValue('STYLE');

        let code = '';

        if (state === 'display') {
            code += `lcd.cursor();\n`;
        } else {
            code += `lcd.noCursor();\n`;
        }

        if (style === 'blink') {
            code += `lcd.blink();\n`;
        } else {
            code += `lcd.noBlink();\n`;
        }

        return code;
    };

    Blockly.Arduino.lcd_right = function (block) {
        return [`__lcdks_pressed(0,60)`, Blockly.Arduino.ORDER_ATOMIC];
    };
    Blockly.Arduino.lcd_up = function (block) {
        return [`__lcdks_pressed(60,200)`, Blockly.Arduino.ORDER_ATOMIC];
    };
    Blockly.Arduino.lcd_down = function (block) {
        return [`__lcdks_pressed(200,400)`, Blockly.Arduino.ORDER_ATOMIC];
    };
    Blockly.Arduino.lcd_left = function (block) {
        return [`__lcdks_pressed(400,600)`, Blockly.Arduino.ORDER_ATOMIC];
    };
    Blockly.Arduino.lcd_select = function (block) {
        return [`__lcdks_pressed(600,800)`, Blockly.Arduino.ORDER_ATOMIC];
    };


    return Blockly;
}

exports = registerGenerators;
