@echo off
title Brick Builder Challenge V3
echo ===========================================
echo   Starting Brick Builder Challenge V3...
echo ===========================================
echo.

echo Checking and installing missing dependencies...
python -m pip install -r requirements.txt >nul 2>&1

echo.
echo Launching your local Builder's server!
echo Keep this window open while you are playing. Close it to stop the server.
echo.

:: Open the browser immediately
start http://127.0.0.1:5000

:: Start the Flask app
python app.py
