# ABTalks Redesign - Coding Challenge Platform

This project is a React (Vite) + Tailwind CSS application showcasing a mobile-first UI/UX redesign for the ABTalks 60-Day Coding Challenge platform. It features a fully responsive mobile-first UI that scales beautifully on desktop into a premium "product showcase" presentation.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v16 or higher is recommended)
- `npm` (usually comes with Node.js)

## How to Execute the Project

Follow these steps to run the project locally on your machine:

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone https://github.com/RushiGujarathi/Redesign-ABTalks.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd "AI Usage Log — ABTalks Redesign"
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open the application in your browser**:
   Once the server starts, you'll see a local URL in your terminal (usually `http://localhost:5173`). Open that link in your web browser.

## Features & Views

- **Mobile View (< 768px):** Mimics the exact mobile app experience. You can resize your browser window or use Chrome DevTools device mode (e.g., iPhone 12/13/14) to view it at exactly 390px.
- **Desktop Presentation (>= 768px):** Shows a premium showcase wrapper alongside the live mobile preview, detailing the mock data context and features. 
- **Core Routes:** 
  - `/` (Landing Page)
  - `/dashboard` (Student Dashboard)
  - `/day/:id` (Challenge Day Page)

## Tech Stack
- **React** with **Vite**
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **React Router** for navigation
- Static `mock-data.json` simulating API responses
