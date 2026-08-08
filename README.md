# ABTalks Redesign - Coding Challenge Platform

**Problem Statement:** Provide a premium, mobile-first daily coding challenge experience to improve student retention and engagement.

**Live Deployment:** [Placeholder for Live URL]

This project is a React (Vite) + Tailwind CSS application showcasing a mobile-first UI/UX redesign for the ABTalks 60-Day Coding Challenge platform. It features a fully responsive mobile-first UI that scales beautifully on desktop into a premium "product showcase" presentation.

## Features & Views

- **Mobile View (< 768px):** Mimics the exact mobile app experience. You can resize your browser window or use Chrome DevTools device mode (e.g., iPhone 12/13/14) to view it at exactly 390px.
- **Desktop Presentation (>= 768px):** Shows a premium showcase wrapper alongside the live mobile preview, detailing the mock data context and features. 
- **Route Map:** 
  - `/` (Landing Page)
  - `/dashboard` (Student Dashboard - supports `?state=` with `new`, `active`, `missed`, `empty`)
  - `/day/:id` (Challenge Day Page - e.g., `/day/12`)

### ❄️ Streak Freeze Feature
To combat user drop-off, we introduced the **Streak Freeze**. Each student starts with 2 Streak Freezes. If they miss a day, they can choose to spend a freeze to protect their hard-earned streak from resetting to 0. This gives students grace for unavoidable missed days, dramatically improving long-term retention by preventing the demotivation of a broken streak.

## Prerequisites

## Tech Stack
- **React** with **Vite**
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **React Router** for navigation
- Static `mock-data.json` simulating API responses
