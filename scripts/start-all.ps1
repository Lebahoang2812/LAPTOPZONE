$root = Split-Path -Parent $PSScriptRoot
Start-Process powershell -ArgumentList '-NoExit','-Command',"Set-Location '$root\server'; npm run dev"
Start-Process powershell -ArgumentList '-NoExit','-Command',"Set-Location '$root\customer'; npm run dev -- --host 0.0.0.0 --port 5173"
Start-Process powershell -ArgumentList '-NoExit','-Command',"Set-Location '$root\admin'; npm run dev -- --host 0.0.0.0 --port 5174"
Write-Host 'Customer: http://localhost:5173' -ForegroundColor Green
Write-Host 'Admin:    http://localhost:5174/admin-login' -ForegroundColor Green
Write-Host 'API:      http://localhost:5000' -ForegroundColor Green
