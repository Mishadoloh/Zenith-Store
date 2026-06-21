Write-Host "Setting up and starting Zenith Store locally..." -ForegroundColor Green

Write-Host "1/4 Setting up Python Catalog Service..." -ForegroundColor Cyan
cd backend/catalog-service
pip install fastapi uvicorn sqlalchemy pydantic --trusted-host pypi.org --trusted-host files.pythonhosted.org
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend/catalog-service; uvicorn app.main:app --host 0.0.0.0 --port 8000"
cd ../..

Write-Host "2/4 Setting up Go Order Service..." -ForegroundColor Cyan
cd backend/order-service
go mod tidy
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend/order-service; go run cmd/api/main.go"
cd ../..

Write-Host "3/4 Setting up Vue Admin Dashboard..." -ForegroundColor Cyan
cd frontend/admin-vue
npm install
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend/admin-vue; npm run dev"
cd ../..

Write-Host "4/4 Setting up Next.js Storefront..." -ForegroundColor Cyan
cd frontend/storefront-next
npm install
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend/storefront-next; `$env:NEXT_PUBLIC_CATALOG_API='http://localhost:8000'; `$env:NEXT_PUBLIC_ORDER_API='http://localhost:8081'; npm run dev"
cd ../..

Write-Host "All services are starting in separate terminal windows!" -ForegroundColor Green
Write-Host "Storefront: http://localhost:3000"
Write-Host "Admin Panel: http://localhost:8080"
