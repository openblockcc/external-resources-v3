/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerToolboxs () {
    return `
<category name="%{BKY_LCD_CATEGORY}" id="LCD_CATEGORY" colour="#BBBB00" secondaryColour="#888800">
    <block type="lcd_init" id="lcd_init">
    </block>
    <block type="lcd_setCursorPosition" id="lcd_setCursorPosition">
        <value name="X">
            <shadow type="math_whole_number">
                <field name="NUM">0</field>
            </shadow>
        </value>
        <value name="Y">
            <shadow type="math_whole_number">
                <field name="NUM">0</field>
            </shadow>
        </value>
    </block>
    <block type="lcd_print" id="lcd_print">
        <value name="DATA">
            <shadow type="text">
                <field name="TEXT">Hello OpenBlock</field>
            </shadow>
        </value>
    </block>
    <block type="lcd_clear" id="lcd_clear">
    </block>
    <block type="lcd_setBackLight" id="lcd_setBackLight">
    </block>
    <block type="lcd_setCursorStyle" id="lcd_setCursorStyle">
    </block>
    <block type="lcd_up" id="lcd_up">
    </block>
    <block type="lcd_down" id="lcd_down">
    </block>
    <block type="lcd_left" id="lcd_left">
    </block>
    <block type="lcd_right" id="lcd_right">
    </block>
    <block type="lcd_select" id="lcd_select">
    </block>
</category>`;
}

exports = registerToolboxs;
