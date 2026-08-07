# AI Usage Log — ABTalks Redesign

This file logs every prompt used to build this project with AI (Antigravity / Gemini), as required for the ABTalks Vibe Code Hackathon submission.

---

## Prompt 1 — Initial build (Landing, Dashboard, Day pages)

**Date:** 7 Aug 2026
**Tool used:** Google Antigravity

**Prompt:**
```
Build a mobile-first (390px viewport) redesign of "ABTalks", a 60-day coding 
challenge platform for Indian college students. Create three routes:

1. Landing page (/) — First-time visitor experience. Show trust, clarity, 
   and motivation to commit to a 60-day challenge. Explain the daily 
   submission model (GitHub commit + LinkedIn post) and how it builds 
   visibility for recruiters.

2. Student dashboard (/dashboard) — Logged-in home screen showing: current 
   streak, today's task, overall progress through the 60 days, completion 
   percentage, and student standing/achievements.

3. Challenge day page (/day/12) — Full experience of a single day: show the 
   day's task, explain what needs to be built, and let the student submit 
   proof of work (GitHub repo/commit link + LinkedIn post link).

Requirements:
- Use a single JSON file (mock-data.json) for all data — no backend, no auth, 
  no real database.
- Handle these edge cases explicitly: a first-time student with zero streak, 
  a student who missed a day (broken streak), and an empty/incomplete profile.
- Add one original, thoughtful feature that improves the student experience 
  beyond the base requirements (explain your reasoning for it).
- Design should feel modern, motivating, and easy to understand for someone 
  who has never heard of ABTalks.
- Use React + Tailwind and make it deployable to Vercel or Netlify.

After building, test all three routes at 390px width and confirm they render 
correctly, including the edge-case states.
```

**What it built:** [Fill this in after running — e.g. "Generated landing page, dashboard, and day page components, plus mock-data.json with sample student records."]

---

## Prompt 2 — Create .gitignore and Setup GitHub

**Date:** 7 Aug 2026
**Tool used:** Google Antigravity

**Prompt:**
```
Create a .gitignore file and include node_modules and other standard exclusions so I can upload the project to GitHub: https://github.com/RushiGujarathi/Redesign-ABTalks
```

**What it built:** Created a standard `.gitignore` file for the React/Vite project and provided commands to initialize the git repository and push it to GitHub.

---

## Prompt 3 — Enhance Desktop Presentation

**Date:** 7 Aug 2026
**Tool used:** Google Antigravity

**Prompt:**
```
You are a Senior Product Designer and Senior Frontend Engineer.

DO NOT redesign or remove the existing UI.
DO NOT change the current routes, layout hierarchy, colors, typography, cards, animations, or functionality unless explicitly mentioned below.

This is an enhancement request for the existing ABTalks Coding Challenge redesign.

====================================================
DESKTOP EXPERIENCE IMPROVEMENT
====================================================

The application is primarily designed for a 390px mobile viewport.
When the application is opened on desktop, laptop, or any screen wider than 768px:
Create a beautiful desktop presentation.

----------------------------------------------------
Desktop Layout
----------------------------------------------------
The mobile screen should remain exactly 390px wide.
Place it in the center of the page.
Use a premium blurred background with subtle gradients.
Around the mobile device use soft shadows and floating effects.
The desktop should feel like a product showcase rather than stretching the mobile UI.

----------------------------------------------------
Desktop Guidance Panel
----------------------------------------------------
On the RIGHT side of the mobile phone, create an elegant information panel.

The panel should include:
Large Heading: "Designed for Mobile"
Description: "This challenge is optimized for a mobile-first learning experience. Open it on your phone for the best experience, or continue using the centered preview."

Below that add another section: Desktop Preview
Include a premium computer/desktop monitor illustration or icon.
Wrap the monitor icon inside a circular outline.
From that circle draw a curved arrow pointing toward the centered mobile screen.
Near the arrow place a small floating label: ← Live Mobile Preview

----------------------------------------------------
Optional CTA
----------------------------------------------------
Below the description add a subtle outlined button: Open ABTalks Website →
The button should open https://www.abtalks.in/ in a new tab.

====================================================
ABTALKS BRANDING
====================================================
Use the official ABTalks logo. Place the logo elegantly top-left of desktop layout.

====================================================
OUT OF SCOPE SECTION
====================================================
On desktop only, below the information panel create a clean card titled Out of Scope
Include exactly these items:
✓ Authentication
✓ Real User Accounts
✓ Production Database
✓ Recruiter Dashboard
✓ Admin Panel
✓ Matching ABTalks Internal Tech Stack
Below that add: Mocked JSON data is intentionally used for demonstration.

====================================================
RESPONSIVE BEHAVIOR
====================================================
On mobile (<768px):
Hide the desktop panel completely. Hide the monitor illustration, the arrow, and the Out of Scope card.
Only show the mobile application exactly as currently designed.

====================================================
VISUAL STYLE
====================================================
Use Glassmorphism, Soft gradients, Smooth transitions, Floating cards, Premium shadows, Rounded corners, Subtle animations, Professional spacing, Modern SaaS aesthetic.
Avoid excessive colors. Keep everything minimal and elegant.
```

**What it built:** Updated `src/components/Layout.tsx` to include a premium desktop presentation wrapper. On screens >= 768px, it frames the 390px mobile application with a blurred gradient background, an informational side panel with a CTA, SVG arrows, and an "Out of Scope" list. The mobile view (<768px) remains completely untouched and responsive.

---

<!-- Keep adding a new "## Prompt N" section every time you give AI a new instruction.
     Match this file to what you actually built — judges cross-check this against your commits. -->
