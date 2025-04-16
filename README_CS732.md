# PWA (CS732 Tech Demo)

This is my tech demo submission for **CS732 Assignment - Tech Demo**.  
It’s a Progressive Web App (PWA) built with **React + Vite** on the frontend and **Express + Node.js** on the backend.  
Notes are stored via a simple JSON file on the backend – no database required.

> GitHub Repo: [cs732-assignment-sliu734](https://github.com/UOA-CS732-S1-2025/cs732-assignment-sliu734)  
> Topic: PWA (Progressive Web App) with simple full-stack integration

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- Git or terminal with Git support

---

### Installation & Local Setup

1. **Clone this repository**

```bash
git clone https://github.com/UOA-CS732-S1-2025/cs732-assignment-sliu734.git
cd cs732-assignment-sliu734
```

2. **Install dependencies**

```bash
# Install front-end dependencies
npm install

# Install back-end dependencies
cd server
npm install
cd ..
```

---

### Running the App Locally

Use **two terminal windows/tabs**:

#### Start the backend server

```bash
node server/index.js
```

> Runs at: [http://localhost:4000](http://localhost:4000)

---

#### Start the front-end (React + Vite)

Open a second terminal:

```bash
npm run dev
```

> Vite will print something like: `http://localhost:5173`

---

### Open in Browser

Go to [http://localhost:5173](http://localhost:5173) to use the app.  
You can add, mark complete, and delete notes.  
The notes will be stored in `server/notes.json`.

---

## Project Structure

```
cs732-assignment-sliu734/
├── public/               # PWA icons, manifest
├── src/                  # Frontend source code (React + Vite)
│   ├── assets/           # Static assets used in React
│   ├── App.jsx           # Main App component
│   ├── App.css           # App-level styles
│   ├── main.jsx          # React entry point
│   ├── index.css         # Global styles
├── server/               # Express backend 
│   ├── index.js          # API server
│   └── notes.json        # Persistent storage (excluded from Git)
├── package.json          # Front-end dependencies
├── vite.config.js        # Vite config with PWA plugin
├── README.md             # This file 
```

---

## API Endpoints

| Method | Endpoint            | Description            |
|--------|---------------------|------------------------|
| GET    | `/api/notes`        | Get all notes          |
| POST   | `/api/notes`        | Add a new note         |
| DELETE | `/api/notes/:id`    | Delete note by ID      |

---

## PWA Features

- ✅ Installable on mobile/desktop
- ✅ Offline support via Service Worker
- ✅ Manifest + icons
- ✅ App-like experience (`standalone` display mode)

---

## Tech Stack

- React + Vite
- Express + Node.js
- Vite PWA plugin
- JSON file as lightweight storage (no database)

---

## ✅ Submission Info

- **Assignment:** CS732 Tech Demo
- **Name:** [Your Full Name]
- **UPI:** [sliu734]
- **Repository:** [https://github.com/UOA-CS732-S1-2025/cs732-assignment-sliu734](https://github.com/UOA-CS732-S1-2025/cs732-assignment-sliu734)
- **Topic Chosen:** Progressive Web Apps (PWA)

---

