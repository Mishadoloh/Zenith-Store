# Zenith Store

Zenith Store is a modern, responsive e-commerce application designed to provide a premium shopping experience. The system is built using a monorepo architecture, splitting the platform into a user-facing storefront, a comprehensive administrative dashboard, and a lightweight backend service.

Live Demo: https://storefront-next-rho.vercel.app

## Project Structure

The codebase is organized into isolated microservices:
* /frontend/storefront-next: React-based Next.js application for customers.
* /frontend/admin-vue: Vue 3 dashboard for product and order management.
* /backend/catalog-service: FastAPI Python application serving catalog APIs.

## Technology Stack

The platform utilizes a modern development stack across all components:
* Storefront: Next.js 15, React 19, Vanilla CSS with custom design tokens.
* Admin Panel: Vue 3, Canvas API for analytics graphs, CSS Flexbox layouts.
* Backend API: FastAPI, Pydantic data schemas, Uvicorn server, SQLite/PostgreSQL.

## Key Features

A brief overview of the built-in system capabilities:
* Localization support for English, Ukrainian, Spanish, and German.
* Responsive client storefront optimized for both desktop and mobile devices.
* Dark and light theme modes persisted locally for user personalization.
* Interactive administration panel featuring live sales metrics and distributions.
* User account registration, order tracking, and support inquiry modules.

## Local Development Setup

To run the entire suite locally, follow the steps below for each component.

### Prerequisites

Ensure you have Node.js 18+ and Python 3.11+ installed on your computer.

### Running the Backend Service

Navigate to the backend catalog service directory:
```bash
cd backend/catalog-service
python -m venv venv
source venv/bin/activate  # Or venv\Scripts\activate on Windows
pip install -r requirements.txt
python -m uvicorn app.main:app --port 8002 --reload
```

### Running the Storefront Next.js App

Navigate to the Next.js storefront directory:
```bash
cd frontend/storefront-next
npm install
npm run dev
```
The client portal will be available at http://localhost:3000.

### Running the Admin Dashboard

Navigate to the Vue administrative dashboard:
```bash
cd frontend/admin-vue
npm install
npm run dev
```
The administration panel will be available at http://localhost:9000.

## Production Deployments

The client storefront is configured to deploy to Vercel, with backend services prepped for Railway using the included Docker configurations. Set the NEXT_PUBLIC_API_URL environment variable in production to point the storefront to the live API endpoint.