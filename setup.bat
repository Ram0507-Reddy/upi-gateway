@echo off
echo ==========================================
echo   UPI Gateway - GitHub Setup Automation
echo ==========================================

echo.
echo [1/4] Initializing Git Repository...
git init
git add .
git commit -m "Initial launch of UPI Gateway"
git branch -M main

echo.
echo [2/4] Adding Remote Origin...
git remote add origin https://github.com/Ram0507-Reddy/upi-gateway.git

echo.
echo [3/4] Pushing to GitHub...
echo (You may be asked to sign in to GitHub in a browser window)
git push -u origin main

echo.
echo ==========================================
echo   Deployment Ready!
echo   1. Go to https://dashboard.render.com
echo   2. Click "New +" -> "Blueprint"
echo   3. Connect your 'upi-gateway' repo
echo   4. Render will auto-detect 'render.yaml'
echo ==========================================
pause
