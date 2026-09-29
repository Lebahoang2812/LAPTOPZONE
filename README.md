# LAPTOPZONE - FULL STACK

## Công nghệ
- Customer: React + Vite + JavaScript
- Admin: React + Vite + JavaScript
- Backend: Node.js + Express
- Database: PostgreSQL/Supabase
- Auth: JWT + bcryptjs
- API: REST

## Cấu trúc
LAPTOPZONE/
  customer/
  admin/
  server/
  database/
  scripts/

## Chạy 1 máy
Yêu cầu: Node.js LTS + Git + Visual Studio 2022.

1. Mở folder LAPTOPZONE bằng Visual Studio 2022.
2. Supabase: chạy toàn bộ database/schema.sql trong SQL Editor.
3. Tạo server/.env từ server/.env.example.
4. Tạo customer/.env từ customer/.env.example.
5. Tạo admin/.env từ admin/.env.example.
6. Ở Terminal gốc:
   npm install
   npm run install:all
   npm run dev
7. Mở:
   Customer http://localhost:5173
   Admin http://localhost:5174/admin-login
   API http://localhost:5000

Tài khoản admin mẫu:
admin@laptopzone.vn
Admin@123

## Chạy bằng 3 Terminal
Terminal API:
cd server
npm install
npm run dev

Terminal Customer:
cd customer
npm install
npm run dev -- --host 0.0.0.0 --port 5173

Terminal Admin:
cd admin
npm install
npm run dev -- --host 0.0.0.0 --port 5174

## 2 máy cùng Wi-Fi
Giả sử máy chạy API là 192.168.1.10.

PC A:
server/.env giữ nguyên.
npm run dev trong server.

PC B customer/.env:
VITE_API_URL=http://192.168.1.10:5000/api

PC B chạy:
npm install
npm run dev -- --host 0.0.0.0 --port 5173

PC B mở:
http://192.168.1.10:5173

Nếu chạy Admin ở PC B, admin/.env cũng dùng:
VITE_API_URL=http://192.168.1.10:5000/api

Windows Firewall: allow Node.js for Private networks.

## Luồng kiểm thử
Customer register/login -> xem laptop -> thêm giỏ -> checkout -> POST /api/orders -> Supabase orders + order_items -> Admin Orders -> đổi trạng thái -> Customer Orders xem trạng thái.

## GitHub
GitHub lưu source code; Supabase lưu database.
Không commit .env.

git init -b main
git add .
git commit -m "Initial LAPTOPZONE"
git remote add origin https://github.com/YOUR_USERNAME/LAPTOPZONE.git
git push -u origin main
