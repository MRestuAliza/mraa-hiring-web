# Hiring Management Web App

## 1. Project Overview

This project is a Hiring Management Web App built for a frontend engineering case study.  
It supports two user roles:

### Admin (Recruiter)
- View and manage job postings.
- Create jobs with configurable application form fields (Required / Optional / Off).
- Manage candidates through a sortable and filterable table.
- Protected admin routes with authentication.

### Applicant (Job Seeker)
- Browse available job listings.
- View job details.
- Apply to a job using a **dynamic application form**, generated based on each job’s configuration.
- Form supports validation, optional fields, and profile photo placeholder.

The project uses Next.js App Router, modern UI components, and optional Firebase integration.  
Mock data is also available for local testing without a backend setup.

---

## 2. Tech Stack Used

### Frontend
- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Radix UI** components
- **Lucide React** icons

### Backend & Data
- **Firebase Client SDK** (Auth + Firestore)
- Optional **mock JSON data** for offline development

### Supporting Libraries
- `next-auth` — authentication
- `react-international-phone` — phone number input
- `nanoid` — id generation
- `bcryptjs` — password hashing (if credentials auth used)

### Project Structure (Summary)
- `app/` — main routes (Admin / Applicant)
- `components/` — reusable UI components
- `hooks/` — data & UI logic hooks
- `lib/` — Firebase config, helpers
- `mock/` — mock data for local development
- `public/` — static assets
- `middleware.js` — route protection

---

## 3. How to Run Locally

### Prerequisites
- Node.js 18+
- npm / yarn / pnpm

### Install Dependencies
```bash
npm install
