# Movies App

A full-stack web application to search for movies, manage a list of favorite movies, and perform CRUD operations. The frontend is built using React (with TypeScript), and the backend is built with NestJS. The application uses the OMDb API to fetch movie details and PostgreSQL (managed by Prisma) for data persistence.

## Prerequisites

Before setting up the application, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn** (for package management)
- **Prisma CLI** (v3 or higher)

## Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/Samar-Mahmoud/movie-app.git
cd movie-app
```

2. Install dependencies for the frontend and backend:

Navigate to the frontend directory and run:

```bash
cd frontend
npm install
```
3. Then navigate to the backend directory and run:

```bash
cd backend
npm install
```
4. Set up the environment variables:

Create a .env file in the backend directory and add variables provided in `.env.example`

5. Run the Prisma migration (if necessary):

In the backend directory, run:

```bash
npx prisma migrate deploy
```

6. Start the Backend Server:

Navigate to the backend directory and run:

```bash
npm run start
```

7. Start the Frontend Server:

Navigate to the frontend directory and run:

```bash
npm run dev
```
