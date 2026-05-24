🚀 Inventory Reservation System
🧠 About the Project

A full-stack Inventory Reservation System built with Next.js, Prisma, and PostgreSQL, enabling real-time stock management with reservation locking and countdown expiry.

Users can browse products, reserve items temporarily, and either confirm or auto-release stock when the timer expires.

🖼️ Live Demo
https://inventory-reservation-system-4mup.vercel.app/

📦 GitHub Repository
https://github.com/HariniMurali04/inventory-reservation-system


✨ Features
📦 Inventory System
Products mapped to multiple warehouses
Stock tracked per warehouse
Available stock = total - reserved
⏳ Reservation System
Temporary stock locking
Countdown expiry timer (frontend)
Auto release on timeout (backend logic supported)
🔁 Reservation Lifecycle
pending → created reservation
confirmed → payment success
released → cancelled or expired


⚡ API Features
RESTful Next.js API routes
Proper HTTP status codes:
409 → insufficient stock
410 → reservation expired
🗄️ Database
PostgreSQL via Prisma ORM
Relational schema for products, warehouses, inventory, reservations
🛠️ Tech Stack
Frontend: Next.js (App Router), TypeScript, Tailwind CSS
Backend: Next.js API Routes
Database: PostgreSQL (Prisma ORM)
Deployment: Vercel
Validation (optional): Zod (if used)


🧱 System Architecture
Frontend (Next.js UI)
        ↓
API Routes (Next.js Backend)
        ↓
Prisma ORM Layer
        ↓
PostgreSQL Database


📊 Data Model Overview
Entities:
Product
Warehouse
Inventory
Reservation
Core logic:
Inventory tracks:
totalQuantity
reservedQuantity
Available stock:
available = totalQuantity - reservedQuantity


🔌 API Endpoints
📦 Products
GET /api/products

Returns products with stock per warehouse.

🏬 Warehouses
GET /api/warehouses

🧾 Create Reservation
POST /api/reservations
Behavior:
Checks available stock
If insufficient → returns 409
If success → creates pending reservation and locks stock

✅ Confirm Reservation
POST /api/reservations/:id/confirm
Behavior:
Confirms payment
Updates reservation status → confirmed
Returns 410 if expired

❌ Release Reservation
POST /api/reservations/:id/release
Behavior:
Cancels reservation
Marks as released
Restores inventory stock


⏳ Reservation Expiry Mechanism
Reservations have an expiresAt timestamp.

Approach used:
Frontend: countdown timer for UX
Backend: expiry validation on confirm/release
Expired reservations return 410 Gone
Production-ready approach (recommended):
Vercel Cron Job OR background worker
Periodic cleanup of expired reservations


⚠️ Concurrency Handling

The core challenge is ensuring correct stock updates under concurrent requests.

Approach:
Stock updates are handled using Prisma transactions
Inventory updates are dependent on availability checks
Ensures only one request can reserve last available unit
Result:
Prevents double booking
Ensures consistent stock state


📌 Error Handling
Status	Meaning
200	Success
409	Not enough stock available
410	Reservation expired


## 📸 Screenshots

### Home Page
![Home](./public/screenshots/Home.png)

### Reservation Page
![Reservation](./public/screenshots/Reservation.png)

### Current Stock Status
![Current Stock Status](./public/screenshots/CurrentStockStatus.png)

### Confirmation Page
![Confirmation](./public/screenshots/ConfirmationPage.png)

### Timer Page
![Timer](./public/screenshots/TimerPage.png)

Setup Instructions
1. Clone repo
git clone https://github.com/HariniMurali04/inventory-reservation-system.git
cd inventory-reservation-system
2. Install dependencies
npm install
3. Setup environment variables
DATABASE_URL=your_postgres_url
4. Run database migration
npx prisma migrate dev
5. Run development server
npm run dev
Open:
http://localhost:3000

🧠 Trade-offs / Design Decisions
Used reservedQuantity model instead of lock table for simplicity
Frontend timer used for UX only (not source of truth)
Expiry handled via backend validation instead of real-time job
Prisma transactions used to reduce race condition risk

