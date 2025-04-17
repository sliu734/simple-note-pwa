
# COMPSCI 732 Tech Demo 

## Topic: Progressive Web App (PWA)

This is submission for the COMPSCI 732 Tech Demo assignment. The chosen topic is **Progressive Web App (PWA)**. This README explains what PWA is, how I converted a standard web app into a PWA, the tools and technologies used, and a detailed walkthrough of every implementation step.

---

## What is a PWA?

A Progressive Web App (PWA) is a type of web application that uses browser features to deliver an app-like experience to users on their devices. PWAs combine the flexibility of the web with the power of native mobile applications:

- They can be installed on the user's home screen (on both mobile and desktop)
- Work offline  
- Load quickly even in uncertain network conditions  
- Are responsive and feel like native apps

PWAs use **Service Workers**, **Web App Manifests**, and **HTTPS** to achieve these capabilities.

---

## About This Demo

This Demo began as a basic full-stack web application. It includes:

- **Frontend**: built with React and Vite  
- **Backend**: built with Express.js  
- **Data Persistence**: via file-based read/write to `server/notes.json` (no database)

It is a simple web app to record personal notes or tasks. Users can add notes, mark them as completed, and delete them when finished.

After building the working web app, I progressively turned it into a PWA through the following steps:

1. Install PWA Plugin 
2. Create App Icons   
3. Add Install Button to the UI
4. Local Testing
5. Deploy backend
6. Deploy frontend
7. Update `.env.example`  

No worries — I’ll introduce each step in detail in the following sections.

The result is a web application that behaves like a native app and can be installed directly on mobile devices.

---

## Try it on your phone

You can test the live PWA by visiting this link on your mobile browser:  
**https://simple-note-pwa.vercel.app**

### Android (Chrome):

- When visiting the website, you'll see an **Install App** button fixed at the bottom of the screen.  
  This is a custom button built into the app using the `beforeinstallprompt` event.
- Tap the button to install the app directly.
- Alternatively, if the button doesn't appear, open the browser menu (⋮) in the top right and select **"Install app"**.

Once installed, the app will appear in your app drawer and function like a native mobile app.

### iOS (Safari):

- Due to iOS limitations, the install button does **not** appear in Safari.
- To install the app manually:
  1. Open Safari and visit the link above.
  2. Tap the **Share** icon at the bottom of the screen.
  3. Scroll down and select **"Add to Home Screen"**.
  4. Tap **Add**.

The app will now appear on your home screen with its own icon and launch in a standalone window, just like a native app.

---

## Full Walkthrough: Step-by-Step Implementation

### 0. Create Web App (Frontend + Backend)

**Frontend:**

- Created using `npm create vite@latest` (template: React + SWC)  
- Components: `App.jsx`, `InstallButton.jsx`, `main.jsx`  
- CSS files: `index.css`, `App.css`

**Backend:**

- Created `server/index.js`  
- Implements API routes:
  - `GET /api/notes` (load all notes)  
  - `POST /api/notes` (add new note)  
  - `DELETE /api/notes/:id` (delete a note)  
- Notes are saved in a local file: `server/notes.json`

**Example server code:**

```js
app.get('/api/notes', (req, res) => {
  const notes = readNotes();
  res.json(notes);
});
```

**Folder Structure:**

```
simple-note/
├── public/
│   └── icons/...
├── server/
│   └── index.js, notes.json, package.json
├── src/
│   └── App.jsx, InstallButton.jsx, ...
├── vite.config.js
├── .env.example
└── README.md
```

---

### 1. Install PWA Plugin

```bash
npm install vite-plugin-pwa --save-dev
```

Then modify `vite.config.js`:

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Simple Notes',
        short_name: 'Notes',
        description: 'A simple PWA note-taking app built with React',
        theme_color: '#0f2027',
        background_color: '#0f2027',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'icons/maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      devOptions: {
        enabled: true
      }
    })
  ]
});
```

This generates:

- Manifest at `dist/manifest.webmanifest`  
- `service-worker.js`  
- Registers the service worker in production

---

### 2. Create App Icons

To support installation on different devices and platforms, a PWA requires properly sized icons referenced in the `manifest` section of `vite.config.js`.

I used [**RealFaviconGenerator**](https://realfavicongenerator.net/) to generate all the required icons.

#### Icon Generation Steps:

1. Visit [https://realfavicongenerator.net/](https://realfavicongenerator.net/)
2. Upload a square image (at least 512×512 pixels, PNG recommended)
3. On the configuration page, under “Favicon for Android Chrome”, check “**Yes**”
4. Click **Generate your Favicons and HTML code**
5. Download the generated ZIP file

From the ZIP package, extract and use the following icons:

- `icon-192x192.png`
- `icon-512x512.png`
- `maskable-icon-512x512.png` (optional but recommended)

Place them in the `public/icons/` directory to match the references in `vite.config.js`:

```js
icons: [
  {
    src: 'icons/icon-192x192.png',
    sizes: '192x192',
    type: 'image/png'
  },
  {
    src: 'icons/icon-512x512.png',
    sizes: '512x512',
    type: 'image/png'
  },
  {
    src: 'icons/maskable-icon-512x512.png',
    sizes: '512x512',
    type: 'image/png',
    purpose: 'maskable'
  }
]
```

---

### 3. Add Install Button to the UI

To ensure a consistent and user-friendly installation experience, I manually added an **"Install App"** button to the bottom of the interface.

This button provides a clear visual cue that the app can be installed, especially on Android devices where the native install prompt can be subtle or easily missed.

When the browser fires the `beforeinstallprompt` event, we capture and store it for later use:

```js
useEffect(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();               // Prevent the default mini-infobar
    setDeferredPrompt(e);            // Save the event for manual triggering
    setShowButton(true);             // Show the install button
  });
}, []);
```

When the user clicks the **Install App** button:

```js
deferredPrompt.prompt();
deferredPrompt.userChoice.then(() => {
  setDeferredPrompt(null);           // Clear the stored event
  setShowButton(false);              // Hide the button after interaction
});
```

---

#### When does the button appear?

- The button appears **only once per eligible session**.
- It disappears automatically after the user:
  - Installs the app
  - Dismisses the prompt
- It will **not reappear** until the browser triggers `beforeinstallprompt` again, which depends on the platform.

---

#### Why add this button?

Although some browsers (like Chrome on Android) may show their own install prompt, having a **manual and styled button** helps guide the user more explicitly.

It provides a **consistent and controlled installation flow**, encourages engagement, and ensures visibility even when the native prompt is missed or suppressed.

The button is fixed at the **bottom center of the screen**, and disappears once the app is installed or the user declines the prompt.

---

### 4. Local Testing

Run both backend and frontend:

```bash
# frontend
npm run dev

# backend (in server/)
cd server
npm install
node index.js
```

Then visit the app at:

```
http://localhost:5173
```

Open Chrome DevTools and go to the **Application** tab:
- Check that the **Manifest** section loads correctly
- Under **Service Worker**, enable "Offline" mode and refresh the page

This local test confirms that:
- Your service worker is properly registered
- The PWA can load and function **offline**
- Icons and metadata from the manifest are correctly recognized

It ensures that the basic features of a Progressive Web App—offline support, installability, and manifest integration—are all working before deployment.

---

### 5. Deploy Backend 

To make the Express API accessible online, we deployed it to [Render](https://render.com).

#### What is Deployment?

Deployment means putting your application onto a server so others can access it via a web URL. For a backend (like our Express server), this means making your API endpoints reachable over the internet.

#### Steps to Deploy

1. Go to [https://render.com](https://render.com) and sign in with GitHub.
2. Click **"New" → "Web Service"**.
3. Select the project repo (e.g. `simple-note-pwa`) from GitHub.
4. In the setup form:
   - **Root directory**: `server/`
   - **Build command**: `npm install`
   - **Start command**: `node index.js`
   - **Environment**: `Node`
   - **Instance type**: Free
5. Click **Create Web Service** and wait for deployment to complete.

Once deployed, Render gives a public backend URL:

https://simple-note-pwa-6.onrender.com

Use this as the API base URL in the frontend.

---

### 6. Deploy Frontend

The frontend (React + Vite) is deployed separately to [Vercel](https://vercel.com), a platform optimized for frontend frameworks.

#### Steps to Deploy

1. Go to [https://vercel.com](https://vercel.com) and sign in with GitHub.
2. Click **"New Project"**, and select your repo.
3. Vercel automatically detects it's a Vite app.
4. Leave the **Build Command** as `vite build` (default).
5. Leave **Output Directory** as `dist` (default).
6. Click **"Environment Variables"**, and add:

Key: VITE_API_URL Value: https://simple-note-pwa-6.onrender.com/api/notes

7. Click **"Deploy"**, and Vercel will build and host the app.

Once successful, we'll get a live production URL like:

https://simple-note-pwa.vercel.app

This is the public entry point of our PWA.

---

### 7. Update `.env.example`

To make it easier for others to run the project locally or deploy it themselves, I created a `.env.example` file in the root directory. It contains the environment variable required by the frontend to connect to the deployed backend:

```env
# API base URL for backend
VITE_API_URL=https://simple-note-pwa-6.onrender.com/api/notes
```

Developers can copy this file to `.env` and adjust the value if they use a different backend URL.

---

**With all 7 steps above completed**, the transformation from a basic web app to a full-featured **Progressive Web App (PWA)** is done. You can now open it on your phone at:

**https://simple-note-pwa.vercel.app**

and **install it like a native app!**

---

## PWA for COMPSCI 732 project

PWA is an ideal fit for modern web development because it lets us use our existing front-end skills (HTML/CSS/JS) to build installable, offline-capable apps—**without rewriting for iOS and Android separately**.

We plan to implement this approach in our group's project to:

- Saves time  
- Avoids native development complexity  
- Still delivers a mobile-app-like experience  

It’s also highly relevant to real-world product development.

---

## Final Thoughts

This demo illustrate how a basic full-stack web app can be turned into a mobile-friendly, offline-ready, installable app using PWA standards—without any native code.

We’ve learned how service workers, manifests, and deployment environments come together to bridge the web and app worlds.

Thank you for reviewing!

