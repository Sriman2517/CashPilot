# CashPilot 💸

> Navigate your finances with clarity

A clean and interactive personal finance dashboard built for a young
working professional. CashPilot lets you track income and expenses,
visualize spending patterns, and understand your financial health
at a glance.

---

## Live Demo

🔗 [cashpilot.vercel.app](https://cashpilot.vercel.app)

📁 [GitHub Repository](https://github.com/your-username/cashpilot)

---

## Features

- **Dashboard Overview** — KPI cards (Balance, Income, Expenses,
  Savings Rate), Balance Trend line chart, Spending Breakdown
  donut chart, Recent Transactions, Top Categories
- **Transactions Page** — Full transaction table with search,
  filter by type and category, sort by date or amount,
  mobile card layout
- **Role Based UI** — Viewer (read-only) and Admin (add, edit,
  delete transactions) switchable via navbar dropdown
- **Insights Page** — Highest spending category, Income vs
  Spending ratio, Month vs Month comparison chart,
  Savings Trend, Quick Stats
- **Settings Page** — Profile info, role switcher cards,
  notification toggles, account stats, data reset
- **Dark Mode** — Full dark theme persisted to localStorage
- **Responsive Design** — Mobile sidebar, stacked cards,
  mobile transaction cards
- **Data Persistence** — All changes saved to localStorage
  via Zustand persist middleware

---

## Tech Stack

| Concern        | Choice              |
|----------------|---------------------|
| Framework      | React 18 + Vite     |
| Styling        | Tailwind CSS v4     |
| Charts         | Recharts            |
| State          | Zustand + persist   |
| Routing        | React Router v6     |
| Icons          | Lucide React        |
| Deploy         | Vercel              |

---

## Setup Instructions
```bash
# 1. Clone the repository
git clone https://github.com/your-username/cashpilot.git
cd cashpilot

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
http://localhost:5173
```

No environment variables or backend setup required.
All data is static mock data defined in `src/data/mockData.js`.

---

## Role Switching

CashPilot simulates role-based access on the frontend:

- **Viewer mode** — Default role. Can browse all pages and
  view all data. Cannot add, edit or delete transactions.
- **Admin mode** — Switch via the dropdown in the top navbar
  or via the Settings page. Unlocks Add Transaction button,
  Edit and Delete controls on every transaction row.

---

## Project Structure
```
cashpilot/
├── src/
│   ├── components/
│   │   ├── layout/         # Navbar, Sidebar, Layout
│   │   ├── dashboard/      # KPI cards, charts, panels
│   │   ├── transactions/   # Table, filters, modal, badge
│   │   └── insights/       # Insight cards, charts
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Transactions.jsx
│   │   ├── Insights.jsx
│   │   └── Settings.jsx
│   ├── store/
│   │   ├── useStore.js       # Main app state (Zustand)
│   │   └── useThemeStore.js  # Dark mode state (Zustand)
│   ├── data/
│   │   └── mockData.js       # 34 mock transactions
│   └── utils/
│       └── calculations.js   # Formatting helpers
```

---

## Technical Decisions

**React + Vite** over Next.js — This is a pure frontend
assignment with no SSR requirements. Vite gives faster HMR
and simpler config for a single-page app.

**Zustand** over Redux or Context — Minimal boilerplate,
built-in persist middleware for localStorage, and clean
selector pattern without prop drilling. Ideal for an app
of this scale.

**Recharts** over Chart.js — React-native API means no
imperative refs or useEffect cleanup. Composable components
fit naturally into JSX.

**Tailwind CSS v4** — Utility-first approach speeds up
responsive design significantly. Dark mode via class strategy
keeps theme logic simple and predictable.

**Static mock data** — As per assignment requirements,
no backend is needed. All 34 transactions are structured
realistically to produce meaningful chart data and insights.

---

## Known Limitations

- Data is scoped to Jan–Mar 2026 (3 months of mock data)
- Insights page is hardcoded to show March 2026 as current month
- No real authentication — role switching is frontend only
- Notifications in Settings are UI only, no real alerts

---

## What I Would Add With More Time

- Date range picker for custom period analysis
- CSV / JSON export of transactions
- Budget setting per category with progress tracking
- Animated number counters on KPI cards
- Real mock API using json-server or MSW

---

Built with ❤️ by Srimanreddy Bommireddy