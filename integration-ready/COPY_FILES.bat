@echo off
echo ========================================
echo RYGNECO REPORTING MODULE INSTALLER
echo ========================================
echo.
echo This will copy the reporting module to your Green Tech Vault dashboard.
echo.
pause

set SOURCE_DIR=C:\path\to\rygneco-reporting-engine
set DEST_DIR=C:\path\to\your-dashboard\client

echo.
echo Step 1: Creating directories...
if not exist "%DEST_DIR%\src\modules" mkdir "%DEST_DIR%\src\modules"
if not exist "%DEST_DIR%\src\modules\reporting" mkdir "%DEST_DIR%\src\modules\reporting"

echo.
echo Step 2: Copying reporting module files...
xcopy "%SOURCE_DIR%\src" "%DEST_DIR%\src\modules\reporting\src" /E /I /Y
copy "%SOURCE_DIR%\package.json" "%DEST_DIR%\src\modules\reporting\" /Y

echo.
echo Step 3: Copying integration component...
copy "%SOURCE_DIR%\integration-ready\ReportingModule.js" "%DEST_DIR%\src\components\" /Y

echo.
echo Step 4: Backing up existing ClientReports.js...
if exist "%DEST_DIR%\src\pages\ClientReports.js" (
    copy "%DEST_DIR%\src\pages\ClientReports.js" "%DEST_DIR%\src\pages\ClientReports-backup.js" /Y
)

echo.
echo Step 5: Copying new ClientReports.js...
copy "%SOURCE_DIR%\integration-ready\ClientReports-Updated.js" "%DEST_DIR%\src\pages\ClientReports.js" /Y

echo.
echo ========================================
echo FILES COPIED SUCCESSFULLY!
echo ========================================
echo.
echo Now you need to:
echo 1. Open Command Prompt
echo 2. Navigate to: %DEST_DIR%
echo 3. Run: npm install handlebars html2canvas lodash-es
echo 4. Run: npm start
echo.
echo Press any key to open the client folder...
pause
explorer "%DEST_DIR%" 