# 📝 Simple Notes (CS732 Tech Demo)

This is my tech demo submission for **CS732 Assignment - Tech Demo**.  
It’s a Progressive Web App (PWA) built with **React + Vite** on the frontend and **Express + Node.js** on the backend.  
Notes are stored via a simple JSON file on the backend – no database required.

> 📦 GitHub Repo: [cs732-assignment-sliu734](https://github.com/UOA-CS732-S1-2025/cs732-assignment-sliu734)  
> 🎯 Topic: PWA (Progressive Web App) with simple full-stack integration

---

## 🚀 Getting Started

### 📦 Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- Git or terminal with Git support

---

### 🔧 Installation & Local Setup

1. **Clone this repository**

```bash
git clone https://github.com/UOA-CS732-S1-2025/cs732-assignment-sliu734.git
cd cs732-assignment-sliu734











# Simple Notes (PWA)

**Simple Notes** is a minimalist note-taking app built with **React + Vite** and enhanced with **Progressive Web App (PWA)** support. It allows users to add, complete, and delete notes — even while offline. Once installed, it feels and functions like a native mobile or desktop app.

---

## Live Demo

[https://simple-note-six.vercel.app]

---

## Features

- Add, complete, and delete notes
- Auto-save with `localStorage`
- PWA: installable as a mobile/desktop app
- Offline support via Service Worker
- Clean dark-themed responsive UI

---

## Tech Stack

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Vite Plugin PWA](https://vite-pwa-org.netlify.app/)
- Vanilla CSS
- `localStorage` for client-side persistence

---

## Project Structure

```
├── public/
│   ├── icons/                  # PWA icons
│   └── index.html
├── src/
│   ├── App.jsx                 # Main UI logic
│   └── main.jsx                # React root entry
├── vite.config.js              # Vite config with PWA plugin
├── README.md
```

---

## Getting Started Locally

### 1. Clone the repo

```bash
git clone https://github.com/your-username/simple-note.git
cd simple-note
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run in dev mode

```bash
npm run dev
```

Then open [http://localhost:5173] in your browser.

---

## Build & Preview

```bash
npm run build
npm run preview
```

---

## Deployment

This app was deployed to [Vercel](https://vercel.com/) in 1 click:

- Framework preset: `Vite`
- Output directory: `dist/`
- Automatic SSL and CDN enabled
- No server needed (pure front-end)

---

## How to Install (PWA)

### iPhone / iPad (Safari)

1. Open the site in Safari
2. Tap **Share** button → **Add to Home Screen**
3. Done! The app is now installable as a full-screen PWA.

### Android (Chrome)

1. Open the site in Chrome
2. You may see an install prompt
3. Or tap the `⋮` menu → **Add to Home screen**

---

## Offline Usage

1. Open the app while connected
2. Then turn off your network
3. Reload the page — it works offline!

Thanks to `vite-plugin-pwa`, all static assets are cached for offline use automatically.

---
