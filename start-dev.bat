@echo off
echo Starting UPI Payment Gateway...

cd server
if not exist node_modules (
    echo Installing Server Dependencies...
    call npm install
)
start "UPI Backend" npm start

cd ..\client
if not exist node_modules (
    echo Installing Client Dependencies...
    call npm install
)
start "UPI Frontend" npm run dev

echo Application started!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
