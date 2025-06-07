#!/bin/bash

# Check if this script is being sourced or directly executed
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    interactive_mode=true
else
    interactive_mode=false
fi

# Check if the system is macOS
if [[ "$(uname)" == "Darwin" ]]; then

    LAUNCH_AGENT_PLIST=/Library/LaunchAgents/openblock.cc.openblockExternalResource.setenv.plist

    if [ -f "$LAUNCH_AGENT_PLIST" ]; then
        echo "Removing LaunchAgent plist: $LAUNCH_AGENT_PLIST"
        sudo rm "$LAUNCH_AGENT_PLIST"
    else
        echo "LaunchAgent plist not found: $LAUNCH_AGENT_PLIST"
    fi

    # Prompt for restart
    osascript <<EOF
tell application "System Events"
    activate
    display dialog "The uninstallation is complete. To fully remove the environment variable, please restart your computer." buttons {"Restart Now", "Later"} default button "Later" with icon caution
    set userChoice to button returned of result
    if userChoice is "Restart Now" then
        tell application "System Events" to restart
    end if
end tell
EOF

else
    PROFILE_FILE="/etc/profile.d/openblock-external-resource-setenv.sh"

    if [ -f "$PROFILE_FILE" ]; then
        echo "Removing environment variable script: $PROFILE_FILE"
        sudo rm "$PROFILE_FILE"
    else
        echo "Environment variable script not found: $PROFILE_FILE"
    fi

    # Restart prompt for Linux
    zenity --question --text="The uninstallation is complete. Please restart your computer to fully remove the environment variable." \
    --title="Restart Required" --ok-label="Restart Now" --cancel-label="Later" --width=400

    if [ $? -eq 0 ]; then
        sudo shutdown -r now
    else
        echo "You chose to restart later."
    fi
fi

echo
echo "Uninstallation completed."

# Optional: Pause if in interactive mode
if [[ $interactive_mode == true ]]; then
    echo "Press Enter to exit..."
    read -r
fi

exit 0
