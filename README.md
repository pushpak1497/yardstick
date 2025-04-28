# Personal Finance Visualizer

A Next.js application to track personal finance, view spending by category, and manage budgets.

## Features

- **Stage 1:** Transaction tracking with add/edit/delete. Form validation included.
- **Stage 2:** Predefined categories, category assignment, pie chart breakdown, and summary dashboard.
- **Stage 3:** Monthly budgets per category, budget vs actual chart, and spending insights.

## Tech Stack

- Next.js (React) + shadcn/ui (Tailwind CSS) for UI components.
- MongoDB with Mongoose for data storage.
- Recharts for charts (bar and pie).
- Responsive design and basic error handling.

## Setup

1. Clone the repo.
2. Install dependencies: `npm install`.
3. Configure MongoDB URI in `.env`.
4. Run migrations or seed initial data if needed.
5. Start development server: `npm run dev`.

The app is ready for deployment to Vercel. Ensure `MONGODB_URI` is set in your Vercel environment variables.
