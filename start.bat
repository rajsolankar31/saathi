@echo off
title SchemeSaathi - Local Server
cls
echo =======================================================
echo               SchemeSaathi (स्कीमसाथी)
echo      Local Development Server Launcher
echo =======================================================
echo.

:: Step 1: Check for Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in your PATH!
    echo Please install Node.js (LTS recommended) from:
    echo   https://nodejs.org/
    echo.
    echo After installing Node.js, re-run this start.bat file.
    echo.
    pause
    exit /b 1
)

echo [1/3] Node.js is ready:
node -v
echo.

:: Step 2: Install dependencies if missing
if not exist "node_modules" (
    echo [2/3] First-time setup detected. Installing packages...
    call npx pnpm install --ignore-scripts
    if %errorlevel% neq 0 (
        echo [ERROR] Dependency installation failed! Check your internet connection.
        pause
        exit /b 1
    )
) else (
    echo [2/3] Dependencies verified.
)
echo.

:: Step 3: Launch browser and dev server
echo [3/3] Launching SchemeSaathi on localhost...
echo.
echo =======================================================
echo   Opening: http://localhost:5173/
echo   To STOP the server at any time, press Ctrl + C.
echo =======================================================
echo.

:: Open browser
start "" "http://localhost:5173"

:: Run the Vite dev server
call npx pnpm --filter @workspace/scheme-saathi run dev

pause
