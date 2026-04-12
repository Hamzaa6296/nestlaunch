# Contributing to NestLaunch 🚀

First of all, thank you for taking the time to contribute! 
Every contribution makes NestLaunch better for everyone.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How To Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Branch Strategy](#branch-strategy)
- [Commit Message Rules](#commit-message-rules)
- [Pull Request Process](#pull-request-process)
- [What We Need Help With](#what-we-need-help-with)

---

## 🤝 Code of Conduct

- Be respectful and kind to everyone
- No harassment, discrimination, or toxic behavior
- Constructive feedback only
- Help others when you can

---

## 🛠️ How To Contribute

### Step 1 — Fork The Repo
Click the "Fork" button at the top right of this page

### Step 2 — Clone Your Fork
```bash
git clone https://github.com/YOUR_USERNAME/nestlaunch.git
cd nestlaunch
```

### Step 3 — Create A Branch
```bash
git checkout -b feature/your-feature-name
```

### Step 4 — Make Your Changes
Write your code, fix your bug, improve the docs

### Step 5 — Commit Your Changes
```bash
git add .
git commit -m "feat: add your feature description"
```

### Step 6 — Push & Open PR
```bash
git push origin feature/your-feature-name
```
Then go to GitHub and open a Pull Request against the `develop` branch

---

## 💻 Development Setup

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Copy environment files
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.example apps/frontend/.env

# Start development
npm run dev
```

---

## 🌿 Branch Strategy
```
main      → stable, production-ready code only
develop   → active development (base branch for all PRs)
feature/* → your new feature
fix/*     → bug fixes
docs/*    → documentation changes
```

⚠️ Always branch off `develop` — never directly off `main`

---

## ✍️ Commit Message Rules

We follow the Conventional Commits standard:
```
feat:     → new feature
fix:      → bug fix
docs:     → documentation change
style:    → formatting, no logic change
refactor: → code refactor
test:     → adding tests
chore:    → maintenance tasks
```

### Examples
```
feat: add JWT refresh token support
fix: resolve MongoDB connection timeout
docs: update installation guide
chore: upgrade NestJS to v10
```

---

## ✅ Pull Request Process

1. Make sure your code works locally
2. Run linting → `npm run lint`
3. PR title should follow commit message rules
4. Describe what your PR does in the description
5. Link the related issue (e.g. "Closes #5")
6. Wait for review — we review within 48 hours

---

## 🙋 What We Need Help With

Check issues with these labels:

- `good first issue` → Perfect for first-time contributors
- `help wanted` → We need community help on this
- `bug` → Something is broken
- `enhancement` → New feature ideas
- `documentation` → Improve docs

👉 [Browse open issues](https://github.com/Hamzaa6296/nestlaunch/issues)

---

## ❓ Questions?

Open a [GitHub Discussion](https://github.com/Hamzaa6296/nestlaunch/discussions) 
or create an issue with the `question` label.

Thank you for contributing to NestLaunch! ⭐
