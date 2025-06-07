#!/bin/bash

# Default interactive mode
interactive_mode=true

# If passed --non-interactive, disable interactive prompts
if [[ "$1" == "--non-interactive" ]]; then
    interactive_mode=false
fi

# Get the directory where the current script is located
INSTALL_DIR="$(cd "$(dirname "$0")" && pwd -P)"

# Uninstall procedure
if [[ "$(uname)" == "Darwin" ]]; then
    LAUNCH_AGENT_PLIST="$HOME/Library/LaunchAgents/openblock.cc.openblockExternalResource.setenv.plist"

    if [[ -f "$LAUNCH_AGENT_PLIST" ]]; then
        echo "Removing LaunchAgent plist file: $LAUNCH_AGENT_PLIST"
        rm -f "$LAUNCH_AGENT_PLIST"
    else
        echo "LaunchAgent plist file not found: $LAUNCH_AGENT_PLIST"
    fi

    echo "Unsetting environment variable OPENBLOCK_EXTERNAL_RESOURCES"
    launchctl unsetenv OPENBLOCK_EXTERNAL_RESOURCES

    echo
    echo "Uninstallation completed."

else
    display_restart_dialog() {
        echo
        echo "The uninstallation is complete. To fully remove the environment variable, please restart your computer or log out and log in again."
        read -p "Do you want to restart now? [y/N]: " choice
        if [[ "$choice" =~ ^[Yy]$ ]]; then
            sudo shutdown -r now
        fi
    }

    PROFILE_FILE="/etc/profile.d/openblock-external-resource-setenv.sh"

    if [[ -f "$PROFILE_FILE" ]]; then
        echo "Removing profile script: $PROFILE_FILE"
        sudo rm -f "$PROFILE_FILE"
    else
        echo "Profile script not found: $PROFILE_FILE"
    fi

    if [[ $interactive_mode == true ]]; then
        display_restart_dialog
    else
        echo
        echo "Please reboot or log out and log in again to fully remove the environment variable."
        echo "Uninstallation completed."
    fi
fi

if [[ "$interactive_mode" == true && "$(uname)" == "Darwin" ]]; then
    echo "Press Enter to exit..."
    read -r
fi

exit 0
