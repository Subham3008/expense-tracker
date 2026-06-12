# Expense Tracker

A full-stack personal finance and expense tracking application built with React, Vite, Node.js, Express, MongoDB, and Mongoose. The app is designed for a single user and focuses on clean expense entry, dashboard analytics, category budgets, search, filtering, CSV export, and a polished responsive UI.

## Features

- Dashboard with total spend, monthly spend, transaction count, and top category
- Add, edit, and delete expenses
- Expense table sorted by newest date first
- Category and date range filtering
- Search by note/category/date/amount
- Monthly spending insights
- Category charts with Recharts
- Category budget tracking with visual indicators
- CSV export
- Empty states for low-data screens
- Dark mode
- Responsive layout with sidebar navigation
- Frontend expense caching to avoid repeated API calls between Dashboard and Expenses views

## Tech Stack

**Frontend**
- React
- Vite
- React Router
- Recharts
- date-fns
- axios
- Tailwind CSS with responsive utilities and dark mode support

**Backend**
- Node.js
- Express
- MongoDB
- Mongoose
- dotenv
- cors

## Project Structure

```text
EXPENSE TRACKER/
  api/
    server.js
    src/
      app.js
      config/
      controllers/
      middlewares/
      models/
      routes/
  web/
    src/
      components/
      hooks/
      layouts/
      pages/
      services/
      utils/
```

## Expense Model

```js
{
  amount: Number, // positive, required
  category: 'Food' | 'Transport' | 'Bills' | 'Entertainment' | 'Other',
  date: Date, // required, cannot be future
  note: String, // optional
  createdAt: Date
}
```

## API Endpoints

Base path:

```text
/api/expenses
```

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/expenses` | Get all expenses |
| GET | `/api/expenses?category=Food&from=2026-06-01&to=2026-06-30` | Filter expenses |
| POST | `/api/expenses` | Create expense |
| PUT | `/api/expenses/:id` | Update expense |
| DELETE | `/api/expenses/:id` | Delete expense |

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd "EXPENSE TRACKER"
```

### 2. Install dependencies

Backend:

```bash
cd api
npm install
```

Frontend:

```bash
cd ../web
npm install
```

### 3. Configure environment variables

Create `api/.env`:

```env
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173
MONGO_URI=your_mongodb_connection_string
```

Create `web/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 4. Run locally

Start backend:

```bash
cd api
npm run dev
```

Start frontend in a second terminal:

```bash
cd web
npm run dev
```

Open:

```text
http://localhost:5173
```

## Available Scripts

Backend:

```bash
npm run dev
```

Frontend:

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Deployment Notes

For Render-style deployment:

Backend:

```text
Build Command: npm install
Start Command: node server.js
Root Directory: api
```

Frontend:

```text
Build Command: npm install && npm run build
Publish Directory: web/dist
Root Directory: web
```

Set production environment variables:

Backend:

```env
NODE_ENV=production
PORT=5000
CLIENT_URL=https://your-frontend-domain.com
MONGO_URI=your_mongodb_connection_string
```

Frontend:

```env
VITE_API_BASE_URL=https://your-backend-domain.com/api
```

## Validation Rules

- Amount is required and must be greater than 0
- Category is required and must match the allowed category list
- Date is required and cannot be in the future
- Unknown fields are rejected by validation middleware
- Notes are optional and trimmed

## Git Workflow

The project follows feature branches from `dev`, with `main` reserved for stable code.

Commit messages use Conventional Commits:

```text
feat: add expense form
fix: cache expenses between dashboard and expenses views
chore: update readme
```
