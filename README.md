<div align="center">

<img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" />
<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white" />

# 🚀 NestLaunch

### Production-ready SaaS boilerplate built with NestJS + Next.js + MongoDB + Stripe

[Report Bug](https://github.com/Hamzaa6296/nestlaunch/issues) · 
[Request Feature](https://github.com/Hamzaa6296/nestlaunch/issues) · 
[Pro Version](#-pro-version)

</div>

---

## 📌 What is NestLaunch?

NestLaunch is a full-stack SaaS boilerplate that gives you a 
production-ready foundation so you can skip the boring setup 
and focus on building your actual product.

Most boilerplates use Express or serverless functions as backend.
**NestLaunch is different** — it uses a proper, dedicated 
**NestJS backend** paired with **Next.js frontend** in a clean 
Turborepo monorepo.

---

## ✨ Free Version Features

### Backend (NestJS)
- ✅ NestJS + MongoDB + Mongoose setup
- ✅ JWT Authentication (signup, login)
- ✅ Email OTP Verification
- ✅ Forgot Password / Reset Password
- ✅ Input validation with class-validator
- ✅ Swagger API documentation (auto-generated)
- ✅ Environment config with @nestjs/config
- ✅ Global error handling & logging
- ✅ Docker + docker-compose setup

### Frontend (Next.js)
- ✅ Next.js 14 App Router
- ✅ TypeScript configured
- ✅ Tailwind CSS + shadcn/ui
- ✅ Redux Toolkit setup
- ✅ Auth pages (signup, login, OTP verify, forgot password)
- ✅ Protected routes middleware
- ✅ Basic user dashboard

### DevOps
- ✅ Turborepo monorepo structure
- ✅ Docker + docker-compose
- ✅ ESLint + Prettier configured
- ✅ .env.example files

---

## 💎 Pro Version

The Pro version includes everything above **PLUS:**

### Backend extras
- 💎 Stripe subscription payments (monthly/yearly)
- 💎 Stripe webhook handler
- 💎 Role-based access control (admin/user)
- 💎 File upload (local + AWS S3)
- 💎 Email notifications (welcome, invoice, alerts)
- 💎 Rate limiting + security headers
- 💎 Unit tests setup (Jest)

### Frontend extras
- 💎 Full admin dashboard
- 💎 User management panel
- 💎 Stripe pricing page + checkout flow
- 💎 Subscription management page
- 💎 Dark mode support
- 💎 Landing page template

### DevOps extras
- 💎 Production Docker setup
- 💎 GitHub Actions CI/CD
- 💎 Vercel + Railway deployment guide

### 👉 [Get Pro Version - $79](https://gumroad.com) ← (link coming soon)

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | NestJS, Node.js, TypeScript |
| Frontend | Next.js 14, React, TypeScript |
| Database | MongoDB, Mongoose |
| Auth | JWT, Passport.js, Nodemailer |
| Payments | Stripe (Pro) |
| State | Redux Toolkit |
| UI | Tailwind CSS, shadcn/ui |
| Monorepo | Turborepo |
| DevOps | Docker, GitHub Actions |

---

## 📁 Project Structure

```
nestlaunch/
├── apps/
│   ├── backend/          ← NestJS API
│   └── frontend/         ← Next.js App
├── packages/
│   ├── types/            ← Shared TypeScript types
│   └── config/           ← Shared ESLint/TS configs
├── docker-compose.yml
├── turbo.json
├── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/Hamzaa6296/nestlaunch.git

# Navigate to project
cd nestlaunch

# Install dependencies
npm install

# Copy environment files
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.example apps/frontend/.env

# Start development servers
npm run dev
```

Backend runs on → http://localhost:3001
Frontend runs on → http://localhost:3000
Swagger docs → http://localhost:3001/api

---

## 🤝 Contributing

Contributions are welcome! Please read 
[CONTRIBUTING.md](CONTRIBUTING.md) first.

1. Fork the repository
2. Create your branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Check issues labeled 
[good first issue](https://github.com/Hamzaa6296/nestlaunch/issues?q=label%3A%22good+first+issue%22) 
to get started.

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">

If this project helps you, please give it a ⭐ — it means a lot!

Made with ❤️ by [Hamza](https://github.com/Hamzaa6296)

</div>
