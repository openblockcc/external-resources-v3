@echo off
setlocal enabledelayedexpansion

:: Check for administrator privileges
net session >nul 2>&1
if %errorLevel% neq 0 (
    :: If not running as administrator, request elevation
    echo Set UAC = CreateObject^("Shell.Application"^) > "%temp%\getadmin.vbs"
    echo UAC.ShellExecute "%~fs0", "", "", "runas", 1 >> "%temp%\getadmin.vbs"
    "%temp%\getadmin.vbs"
    del "%temp%\getadmin.vbs"
    exit /b
)

:: Check if the environment variable exists
reg query "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Environment" /v "OPENBLOCK_EXTERNAL_RESOURCES" >nul 2>&1
if %errorlevel% equ 0 (
    :: Variable exists, proceed to delete
    reg delete "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Environment" /v "OPENBLOCK_EXTERNAL_RESOURCES" /f >nul
    echo Environment variable OPENBLOCK_EXTERNAL_RESOURCES has been removed.
) else (
    :: Variable does not exist, skip deletion
    echo Environment variable OPENBLOCK_EXTERNAL_RESOURCES does not exist. No action needed.
)

echo.
echo Uninstallation cleanup completed.
echo Press any key to exit...
pause >nul
