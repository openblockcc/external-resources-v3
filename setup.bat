@echo off
setlocal enabledelayedexpansion

:: Check for administrator privileges
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo.
    echo ERROR: This script must be run as an administrator!
    echo Please right-click the script and select "Run as administrator".
    echo.
    pause
    exit /b
)

:: Get the directory where the current script is located
set "INSTALL_DIR=%~dp0"

:: Remove trailing backslash if present
if "%INSTALL_DIR:~-1%"=="\" set "INSTALL_DIR=%INSTALL_DIR:~0,-1%"
echo %INSTALL_DIR%

:: Set env
setx /m OPENBLOCK_EXTERNAL_RESOURCES "%INSTALL_DIR%"

echo OPENBLOCK_EXTERNAL_RESOURCES has been set to: "%INSTALL_DIR%"
echo.
echo Installation completed.
echo Press any key to exit...
pause >nul
