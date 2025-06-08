#!/bin/bash

# Default interactive mode
interactive_mode=true

# If passed --non-interactive, disable interactive prompts
if [[ "$1" == "--non-interactive" ]]; then
    interactive_mode=false
fi

# Get the directory where the current script is located
INSTALL_DIR="$(cd "$(dirname "$0")" && pwd -P)"

# Check if the system is macOS
if [[ "$(uname)" == "Darwin" ]]; then
    LAUNCH_AGENT_PLIST="$HOME/Library/LaunchAgents/openblock.cc.openblockExternalResource.setenv.plist"

    mkdir -p "$(dirname "$LAUNCH_AGENT_PLIST")"
    cat <<EOF > "$LAUNCH_AGENT_PLIST"
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>openblock.cc.openblockExternalResource.setenv</string>
    <key>ProgramArguments</key>
    <array>
        <string>launchctl</string>
        <string>setenv</string>
        <string>OPENBLOCK_EXTERNAL_RESOURCES</string>
        <string>$INSTALL_DIR</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
</dict>
</plist>
EOF

    launchctl setenv OPENBLOCK_EXTERNAL_RESOURCES "$INSTALL_DIR"

    echo "Environment variable OPENBLOCK_EXTERNAL_RESOURCES has been set to: $INSTALL_DIR"
    echo
    echo "Installation completed."

    if [[ "$interactive_mode" == true ]]; then
        echo "Press Enter to exit..."
        read -r
    fi
else
    PAM_ENV_FILE="$HOME/.pam_environment"
    TEMP_FILE="$(mktemp)"

    if [[ -f "$PAM_ENV_FILE" ]]; then
        grep -v '^OPENBLOCK_EXTERNAL_RESOURCES' "$PAM_ENV_FILE" > "$TEMP_FILE"
    else
        touch "$TEMP_FILE"
    fi

    echo "OPENBLOCK_EXTERNAL_RESOURCES=$INSTALL_DIR" >> "$TEMP_FILE"

    mv "$TEMP_FILE" "$PAM_ENV_FILE"

    echo "Environment variable OPENBLOCK_EXTERNAL_RESOURCES has been set to: $INSTALL_DIR"
    echo
    echo "Installation completed. To apply the environment variable, please reboot or log out and log back in."

    if [[ "$interactive_mode" == true ]]; then
        read -p "Do you want to restart now? [y/N]: " choice
        if [[ "$choice" =~ ^[Yy]$ ]]; then
            sudo shutdown -r now
        fi
    fi
fi

exit 0
