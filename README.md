<p align="center">
  <img src="https://img.shields.io/badge/🔥_All_Tracker-v0.1.0-38bdf8?style=for-the-badge&labelColor=0F172A" alt="All Tracker v0.1.0"/>
</p>

<h1 align="center">🔥 All Tracker</h1>

<p align="center">
  <strong>A premium, world-class tracking PWA that gamifies hydration &amp; fitness<br/>with buttery-smooth animations, Duolingo-style streaks, and smart push notifications.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Version-0.1.0-38bdf8?style=flat-square&labelColor=0F172A" alt="Version"/>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3"/>
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=000" alt="JavaScript"/>
  <img src="https://img.shields.io/badge/GSAP-88CE02?style=flat-square&logo=greensock&logoColor=fff" alt="GSAP"/>
  <img src="https://img.shields.io/badge/PWA-5A0FC8?style=flat-square&logo=pwa&logoColor=white" alt="PWA"/>
  <img src="https://img.shields.io/badge/License-MIT-22c55e?style=flat-square&labelColor=0F172A" alt="MIT License"/>
</p>

<br/>

<p align="center">
  <!-- Replace with your actual banner screenshot -->
  <img src=".github/assets/banner.png" alt="All Tracker Banner" width="800"/>
</p>

<p align="center">
  <em>↑ Replace with an actual screenshot or banner of your app</em>
</p>

---

## 🎬 App Preview

<!-- Replace these placeholders with actual GIF recordings of your app -->

<p align="center">
  <img src=".github/assets/water-demo.gif" alt="Water Tracker Demo" width="280"/>
  &nbsp;&nbsp;&nbsp;
  <img src=".github/assets/workout-demo.gif" alt="Workout Tracker Demo" width="280"/>
  &nbsp;&nbsp;&nbsp;
  <img src=".github/assets/streak-demo.gif" alt="Streak Celebration Demo" width="280"/>
</p>

<p align="center">
  <sub>Water Tracker · Workout Logger · Streak Celebration</sub>
</p>

---

## ✨ Key Features

### 🎨 Premium Dark UI/UX
- **Glassmorphism everywhere** — frosted-glass cards, modals, and bottom sheets with `backdrop-filter: blur(30px)`
- **Dynamic animated mesh background** — floating gradient orbs that drift smoothly behind the UI
- **60fps micro-interactions** — GSAP-powered particles, elastic check animations, and spring-physics transitions
- **Responsive & mobile-first** — looks stunning on every screen size

### 💧 Dynamic Water Tracker
- **Customizable schedules** — add, edit, and delete water tasks with a premium bottom-sheet editor
- **Dynamic target setting** — adjust daily goals from 1,500ml to 4,000ml via the Settings slider
- **Interactive liquid wave progress** — SVG wave animation that fills a circle as you drink
- **Smart mismatch alerts** — warns when your task schedule doesn't match your daily goal
- **ID-based persistence** — checks survive schedule edits without data loss

### 🏋️ Workout Logger
- **Seamless session tracking** — log exercises with sets, reps, and weights
- **Modern dropdown forms** — sleek, animated exercise selection UI
- **Persistent logs** — review past workout sessions, all stored locally

### 🔥 Unified Duolingo-Style Streak
- **Global streak counter** — advances +1/day when you complete *either* water or workout goals
- **Daily cooldown** — can only increment once per calendar day; resets at midnight if missed
- **Custom fire animations** — flickering SVG flame icon with gradient glow and floating ember particles
- **Milestone celebrations** — full-screen confetti bursts at 7, 30, 100+ day milestones

### 🔔 Smart Notification System
- **In-app toasts** — animated slide-in notifications for hydration reminders and streak warnings
- **Web Push notifications** — native-style alerts via Service Worker, even when the browser is minimized
- **Premium permission flow** — glassmorphism modal with animated bell icon, triggered only after a positive interaction (never on page load)
- **Quiet hours** — respects user-configured wake/sleep times

### 📱 Full PWA Support
- **Installable** — add to home screen on iOS & Android for a native app feel
- **Offline-capable** — Service Worker caches the app shell and external resources
- **Standalone mode** — no browser chrome, themed status bar matching the dark UI

### 🎨 Personalization (Settings)
- **Theme system** — choose streak flame colors: Blaze Orange, Neon Blue, Cyber Green, Royal Purple, Sakura Pink
- **Hydration goal slider** — 1,500ml – 4,000ml with real-time UI updates
- **Quiet hours** — configure wake/sleep times for notification scheduling
- **Toggle controls** — enable/disable hydration reminders and streak warnings independently
- **Reset options** — restore default schedule or settings with confirmation modals

---

## 🏗️ Tech Stack & Architecture

| Layer | Technology |
|-------|-----------|
| **Structure** | Semantic HTML5 |
| **Styling** | Vanilla CSS with CSS Custom Properties (design tokens) |
| **Animation** | [GSAP 3.12](https://greensock.com/gsap/) + CSS Keyframes + SVG animations |
| **Typography** | [Google Fonts](https://fonts.google.com/) — Inter (Latin) + Prompt (Thai) |
| **PWA** | Web App Manifest + Service Worker (Cache-first with stale-while-revalidate) |
| **Notifications** | Notification API + Service Worker Push Events |
| **Persistence** | `localStorage` with JSON serialization |
| **Architecture** | Single Page Application (SPA) with vanilla JS state management |

```
┌─────────────────────────────────────────────────┐
│                   index.html                   │
│  ┌───────────┐  ┌────────────┐  ┌────────────┐  │
│  │  Water     │  │  Workout   │  │  Settings  │  │
│  │  Tracker   │  │  Tracker   │  │  Modal     │  │
│  │  Module    │  │  Module    │  │  + Themes  │  │
│  └─────┬─────┘  └─────┬──────┘  └─────┬──────┘  │
│        │              │               │          │
│  ┌─────▼──────────────▼───────────────▼──────┐   │
│  │         Shared Systems                     │   │
│  │  • Streak Engine    • Notification Manager │   │
│  │  • SPA Router       • localStorage Layer   │   │
│  └────────────────────────────────────────────┘   │
│                                                   │
│  ┌────────────────────────────────────────────┐   │
│  │         Service Worker (sw.js)              │   │
│  │  • Cache Management  • Push Handler         │   │
│  │  • Offline Fallback  • Notification Actions │   │
│  └────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
All Tracker/
├── Tracker-Folder/
│   ├── index.html          # Main SPA — all UI, styles, and logic
│   ├── manifest.json         # PWA manifest (standalone, icons, theme)
│   ├── sw.js                 # Service Worker (caching, push, offline)
│   ├── hydrationindex.html # Legacy standalone water tracker
│   └── workoutindex.html   # Legacy standalone workout tracker
└── README.md                 # You are here
```

---

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome 90+, Edge 90+, Safari 15+, Firefox 90+)
- A local web server for PWA/Service Worker features

### Quick Start

```bash
# Clone the repository
git clone https://github.com/your-username/all-tracker.git

# Navigate to the project
cd all-tracker/Tracker-Folder

# Serve locally (pick one)
npx serve .                    # Option 1: npx serve
python -m http.server 8000     # Option 2: Python
php -S localhost:8000           # Option 3: PHP

# Open in browser
# → http://localhost:3000 (serve) or http://localhost:8000
```

### Install as PWA

1. Open the app in **Chrome** (mobile or desktop)
2. Tap the **⋮** menu → **"Install app"** or **"Add to Home Screen"**
3. The app launches in standalone mode — no browser chrome!

> **iOS**: Open in Safari → Share → "Add to Home Screen"

---

## ⚙️ Configuration

All settings are managed through the in-app **Settings** panel (⚙️ gear icon):

| Setting | Default | Range |
|---------|---------|-------|
| Daily Water Goal | 2,300 ml | 1,500 – 4,000 ml |
| Hydration Reminders | ✅ On | On / Off |
| Streak Warnings | ✅ On | On / Off |
| Wake Time | 07:00 | Any time |
| Sleep Time | 23:00 | Any time |
| Streak Theme | Blaze Orange | 5 themes |

---

## 🤝 Contributing

Contributions are what make the open-source community amazing! Any contributions you make are **greatly appreciated**.

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Contribution Guidelines

- Follow existing code style and naming conventions
- Preserve all Thai text and existing UI/logic
- Test on both mobile and desktop viewports
- Ensure animations run at 60fps
- Add comments for complex logic

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

```
MIT License

Copyright (c) 2026 All Tracker Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Acknowledgments

- [GSAP](https://greensock.com/) — Professional-grade animation engine
- [Google Fonts](https://fonts.google.com/) — Inter & Prompt typefaces
- [Shields.io](https://shields.io/) — Beautiful README badges
- [Duolingo](https://www.duolingo.com/) — Inspiration for the streak system

---

<p align="center">
  <strong>Built with ❤️ and way too much ☕</strong>
  <br/>
  <sub>If you found this useful, consider giving it a ⭐</sub>
</p>
