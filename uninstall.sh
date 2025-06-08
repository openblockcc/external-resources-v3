#!/bin/bash

# Default interactive mode
interactive_mode=true

# If passed --non-interactive, disable interactive prompts
if [[ "$1" == "--non-interactive" ]]; then
    interactive_mode=false
fi

# Get the directory where the current script is located
INSTALL_DIR="$(cd "$(dirname "$0")" && pwd -P)"

if [[ "$(uname)" == "Darwin" ]]; then
    LAUNCH_AGENT_PLIST="$HOME/Library/LaunchAgents/openblock.cc.openblockExternalResource.setenv.plist"

    if [[ -f "$LAUNCH_AGENT_PLIST" ]]; then
        echo "Removing LaunchAgent plist file: $LAUNCH_AGENT_PLIST"
        rm -f "$LAUNCH_AGENT_PLIST"
    else
        echo "LaunchAgent plist file not found: $LAUNCH_AGENT_PLIST"
    fi

    launchctl unsetenv OPENBLOCK_EXTERNAL_RESOURCES

    echo "Unsetting environment variable OPENBLOCK_EXTERNAL_RESOURCES"
    echo
    echo "Uninstallation completed."

    if [[ "$interactive_mode" == true ]]; then
        echo "Press Enter to exit..."
        read -r
    fi

else
    PAM_ENV_FILE="$HOME/.pam_environment"
    TEMP_FILE="$(mktemp)"

    if [[ -f "$PAM_ENV_FILE" ]]; then
        grep -v '^OPENBLOCK_EXTERNAL_RESOURCES' "$PAM_ENV_FILE" > "$TEMP_FILE"
        mv "$TEMP_FILE" "$PAM_ENV_FILE"
        echo "Removed OPENBLOCK_EXTERNAL_RESOURCES entry"
    else
        echo "No $PAM_ENV_FILE file found, nothing to remove."
    fi

    echo
    echo "Uninstallation completed. Please reboot or log out and log back in to fully remove the environment variable."

    if [[ $interactive_mode == true ]]; then
        read -p "Do you want to restart now? [y/N]: " choice
        if [[ "$choice" =~ ^[Yy]$ ]]; then
            sudo shutdown -r now
        fi
    fi
fi

exit 0
