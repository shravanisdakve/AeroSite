# Construction Field Management App - Frontend Intern Task

Built for the **Internship Assignment**, this application is a responsive React-based dashboard for site engineers and construction managers to track Daily Progress Reports (DPR).

## 🚀 Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite 7](https://vitejs.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) (with modern @theme support)
- **Routing:** [React Router 7](https://reactrouter.com/)
- **Icons:** Custom SVG Components (Heroicons inspired)
- **Animations:** Custom CSS Animations (Slide-ins, Pulse effects)

## ✨ Core Features

### 1. Secure Login (Mock)
- **Credentials:** `test@test.com` / `123456`
- **Validation:** Full email regex and password length checks.
- **Feedback:** Real-time error messages for invalid attempts.

### 2. Project Dashboard
- **Site Overview:** Cards displaying Project Name, Status (Active/Planned/Completed), Location, and Start Date.
- **Search & Filter:** Real-time search by project name or location. Filter projects by status using the custom dropdown.
- **Navigation:** Deep-link directly to "Submit Report" or view historical logs.

### 3. Daily Progress Report (DPR) Form
- **Multi-field Input:** Project selection, Date picker, Weather dropdown, Staff count, and Activity log.
- **Photo Logic:** Support for 1–3 site photos with instant preview thumbnails and removal capability.
- **Validation:** Enforces mandatory fields and minimum character limits for activity logs.
- **Persistence:** LocalStorage integration to save reports across sessions in the demo environment.

### 4. Consolidated Reporting (Bonus)
- **Global View:** A centralised page to view *all* submitted reports across all projects, sortable by time.
- **Audit Ready:** Visual cues for staff counts and site metadata.

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```text
src/
├── assets/          # Static assets
├── components/      # Reusable UI components (Navbar, Input, etc.)
├── constants/       # App-wide config, styles, and routes
├── context/         # AuthContext for shared authentication state
├── data/            # Mock project and report data
├── pages/           # High-level route components (Login, Dashboard, Form)
├── utils/           # Helper functions and validators
└── App.jsx          # Root routing configuration
```

## 📝 Limitations & Known Issues
- **Mock Data:** Currently uses static JSON for initial projects and reports.
- **Backend Sync:** No real-time database connection (persistence is LocalStorage only).
- **Dark Mode:** Initial theme is Light Mode only (Bonus task pending).

---
**Developer:** Shravani Sunil Dakve
**Email:** shravanisdakve@gmail.com

<!-- @module AeroSite -->
