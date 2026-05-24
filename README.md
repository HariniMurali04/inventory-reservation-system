🚀 Inventory Reservation System
🧠 About the Project

A full-stack Inventory Reservation System built with Next.js, Prisma, and PostgreSQL, enabling real-time stock management with reservation locking and countdown expiry.

Users can browse products, reserve items temporarily, and either confirm or auto-release stock when the timer expires.

🖼️ Live Demo
https://inventory-reservation-system-4mup.vercel.app/

📦 GitHub Repository


✨ Features
📦 Product inventory listing
⏳ Real-time reservation system with countdown timer
🔒 Stock locking during reservation
✅ Confirm reservation workflow
❌ Cancel reservation anytime
🔄 Auto-release on timeout
⚡ Full-stack API routes with Next.js
🗄️ PostgreSQL database integration
🧠 Prisma ORM for type-safe DB queries
📱 Responsive UI with Tailwind CSS


🛠️ Tech Stack
Frontend: Next.js (App Router), TypeScript, Tailwind CSS
Backend: Next.js API Routes
Database: PostgreSQL
ORM: Prisma
Deployment: Vercel


⚙️ How It Works
User selects a product
System temporarily locks stock
Reservation timer starts
User confirms or cancels reservation
If timer expires → stock is automatically released


🏗️ System Architecture
Frontend (Next.js UI)
        ↓
API Routes (Next.js Backend)
        ↓
Prisma ORM Layer
        ↓
PostgreSQL Database

Getting Started (Local Setup)
git clone https://github.com/HariniMurali04/inventory-reservation-system.git
cd inventory-reservation-system
npm install

Setup environment variables
DATABASE_URL=your_postgresql_url
Run development server
npm run dev

Open:
http://localhost:3000


📌 Environment Variables
Variable	Description
DATABASE_URL	PostgreSQL connection string


📸 Screenshots

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

