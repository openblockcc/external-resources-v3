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
    echo
    echo "Environment variable OPENBLOCK_EXTERNAL_RESOURCES has been set to: $INSTALL_DIR"
else
    display_restart_dialog() {
        echo
        echo "The installation is complete. To make the environment variable effective, please restart your computer"
        read -p "Do you want to restart now? [y/N]: " choice
        if [[ "$choice" =~ ^[Yy]$ ]]; then
            sudo shutdown -r now
        fi
    }

    PROFILE_FILE="/etc/profile.d/openblock-external-resource-setenv.sh"
    ENVIRONMENT_VARIABLE="export OPENBLOCK_EXTERNAL_RESOURCES=\"$INSTALL_DIR\""

    if [ -f "$PROFILE_FILE" ]; then
        sudo rm "$PROFILE_FILE"
    fi

    sudo bash -c "echo '$ENVIRONMENT_VARIABLE' > $PROFILE_FILE"
    sudo chmod +x "$PROFILE_FILE"

    if [[ $interactive_mode == true ]]; then
        display_restart_dialog
    else
        echo
        echo "The installation is complete. To apply all changes, please reboot or log out and log in again for the changes to take effect."
    fi
fi

echo
echo "Installation completed in $INSTALL_DIR"

if [[ "$interactive_mode" == true && "$(uname)" == "Darwin" ]]; then
    echo "Press Enter to exit..."
    read -r
fi

exit 0
