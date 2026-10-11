<h1 align="center">🚀 NestLaunch</h1>

<p align="center">
  <b>An open-source SaaS starter with a real NestJS backend and a Next.js frontend.</b><br/>
  Auth, validation, API docs, and a clean monorepo, ready on day one.
</p>

<p align="center">
  <a href="https://nestlaunch-frontend-5tox.vercel.app"><b>Live demo</b></a> ·
  <a href="#-quick-start">Quick start</a> ·
  <a href="https://github.com/Hamzaa6296/nestlaunch/issues">Report a bug</a> ·
  <a href="https://github.com/Hamzaa6296/nestlaunch/issues">Request a feature</a>
</p>

<p align="center">
  <img src="https://img.shields.io/github/stars/Hamzaa6296/nestlaunch?style=flat-square" alt="Stars"/>
  <img src="https://img.shields.io/github/license/Hamzaa6296/nestlaunch?style=flat-square" alt="License"/>
  <img src="https://img.shields.io/github/last-commit/Hamzaa6296/nestlaunch?style=flat-square" alt="Last commit"/>
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=nestjs&logoColor=white" alt="NestJS"/>
  <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js"/>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"/>
</p>

<!--
  ADD BEFORE PUBLISHING:
  1. A 10-second demo GIF or screenshot of signup → OTP verify → dashboard.
     Save it to docs/demo.gif and uncomment the line below.
  2. A CI status badge once GitHub Actions is set up.

  <p align="center"><img src="docs/demo.gif" alt="NestLaunch demo" width="800"/></p>
-->

---

## 📌 Why NestLaunch?

Most SaaS starters are built around Next.js API routes or serverless functions. That's fine for small apps, but many teams want a **dedicated backend** with real structure: modules, dependency injection, validation, and generated API docs.

NestLaunch gives you that from the start.

| | Typical Next.js-only starter | **NestLaunch** |
| --- | --- | --- |
| Backend | API routes / serverless | **Dedicated NestJS API** |
| API docs | Usually manual | **Auto-generated Swagger** |
| Structure | One app | **Turborepo monorepo (API + web)** |
| Validation | Ad hoc | **class-validator on every input** |
| Scaling the backend | Tied to the frontend | **Deploy and scale independently** |

**It's a good fit if** you know (or want to use) NestJS, you're building a SaaS or API-heavy product, and you'd rather start from a clean foundation than wire up auth for the hundredth time.

---

## ✨ What's included

### Backend (NestJS)
- ✅ NestJS + MongoDB + Mongoose
- ✅ JWT authentication (signup, login)
- ✅ Email OTP verification
- ✅ Forgot password / reset password
- ✅ Input validation with `class-validator`
- ✅ Auto-generated Swagger API docs
- ✅ Environment config with `@nestjs/config`
- ✅ Global error handling and logging

### Frontend (Next.js)
- ✅ Next.js App Router + TypeScript
- ✅ Tailwind CSS + shadcn/ui
- ✅ Redux Toolkit
- ✅ Auth pages: signup, login, OTP verify, forgot password
- ✅ Protected routes via middleware
- ✅ Basic user dashboard

### Tooling
- ✅ Turborepo monorepo
- ✅ ESLint + Prettier
- ✅ `.env.example` files for both apps
- ✅ Docker + docker-compose <!-- VERIFY docker-compose.yml EXISTS IN THE REPO BEFORE KEEPING THIS LINE -->

---

## 🗺 Roadmap

I'm building this in public. Here's what's planned, roughly in order:

- [ ] Stripe subscriptions (monthly / yearly) and webhook handling
- [ ] Role-based access control (admin / user)
- [ ] Rate limiting and security headers
- [ ] Unit and e2e test setup (Jest)
- [ ] GitHub Actions CI
- [ ] File uploads (local + S3)
- [ ] Admin dashboard
- [ ] Upgrade to the latest Next.js

Want something bumped up the list? [Open an issue](https://github.com/Hamzaa6296/nestlaunch/issues) or react to an existing one with 👍.

---

## 🛠 Tech stack

| Layer | Technology |
| --- | --- |
| Backend | NestJS, Node.js, TypeScript |
| Frontend | Next.js (App Router), React, TypeScript |
| Database | MongoDB, Mongoose |
| Auth | JWT, Passport.js, Nodemailer (OTP emails) |
| State | Redux Toolkit |
| UI | Tailwind CSS, shadcn/ui |
| Monorepo | Turborepo |

---

## 📁 Project structure

```
nestlaunch/
├── apps/
│   ├── backend/      ← NestJS API
│   └── frontend/     ← Next.js app
├── packages/
│   └── config/       ← Shared ESLint / TS configs
├── turbo.json
├── package.json
└── README.md
```

---

## 🚀 Quick start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm

### Install and run

```bash
# 1. Clone the repo
git clone https://github.com/Hamzaa6296/nestlaunch.git
cd nestlaunch

# 2. Install dependencies
npm install

# 3. Set up environment files
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.example apps/frontend/.env

# 4. Start both apps
npm run dev
```

| Service | URL |
| --- | --- |
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:3001 |
| Swagger docs | http://localhost:3001/api |

> **Note:** Fill in your MongoDB connection string and SMTP settings in `apps/backend/.env` before starting. OTP emails need a working SMTP provider.

---

## 🤝 Contributing

Contributions are welcome, from typo fixes to new features.

1. Read [CONTRIBUTING.md](CONTRIBUTING.md)
2. Pick an issue, ideally one labeled [`good first issue`](https://github.com/Hamzaa6296/nestlaunch/issues?q=label%3A%22good+first+issue%22)
3. Fork, branch, commit, and open a pull request

I review issues and PRs quickly, usually within a day.

---

## 💼 Need this customized?

I'm [Ali Hamza](https://github.com/Hamzaa6296), the author of NestLaunch. If you want a SaaS product, API, or dashboard built on this stack, or need help adapting NestLaunch to your idea, get in touch:

📧 **ali.hamzaaa6296@gmail.com** 

---

## 📄 License

MIT. See [LICENSE](LICENSE) for details.

---

<p align="center">
  If NestLaunch saves you time, a ⭐ helps other developers find it.
</p>
