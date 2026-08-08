# ABTalks Redesign - Coding Challenge Platform

**Problem Statement:** Redesign ABTalks

**Live Deployment:** [Placeholder for Live URL]

This project is a React (Vite) + Tailwind CSS application showcasing a mobile-first UI/UX redesign for the ABTalks 60-Day Coding Challenge platform. It features a fully responsive mobile-first UI that scales beautifully on desktop into a premium "product showcase" presentation.

## Features & Views

- **Mobile View (< 768px):** Mimics the exact mobile app experience. You can resize your browser window or use Chrome DevTools device mode (e.g., iPhone 12/13/14) to view it at exactly 390px.
- **Desktop Presentation (>= 768px):** Shows a premium showcase wrapper alongside the live mobile preview, detailing the mock data context and features. 
- **Route Map:** 
  - `/`
  - `/dashboard`
  - `/day/12`

### ❄️ Streak Freeze Feature
To combat user drop-off, we introduced the **Streak Freeze**. Each student starts with 2 Streak Freezes. If they miss a day, they can choose to spend a freeze to protect their hard-earned streak from resetting to 0. This gives students grace for unavoidable missed days, dramatically improving long-term retention by preventing the demotivation of a broken streak.

## Getting Started

Follow these steps to run the project locally:

1. **Install Node.js**: Make sure Node.js is installed on your machine. If not, download it from [nodejs.org](https://nodejs.org/).
2. **Install Dependencies**: From the project root, install the required packages:
   ```bash
   npm install
   ```
3. **Run the Development Server**: Start the local app with:
   ```bash
   npm run dev
   ```
4. **Open the App**: Visit `http://localhost:5173` in your browser (or use the URL shown in the terminal).

### Optional commands

- Build for production:
  ```bash
  npm run build
  ```
- Preview the production build locally:
  ```bash
  npm run preview
  ```

## Prerequisites

- Node.js 18 or later
- npm 10 or later

## Tech Stack
- **React** with **Vite**
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **React Router** for navigation
- Static `mock-data.json` simulating API responses
