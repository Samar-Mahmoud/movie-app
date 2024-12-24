# Movies App

A full-stack web application to search for movies, manage a list of favorite movies, and perform CRUD operations. The frontend is built using React (with TypeScript), and the backend is built with NestJS. The application uses the OMDb API to fetch movie details and PostgreSQL (managed by Prisma) for data persistence.

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
Then navigate to the backend directory and run:

```bash
cd backend
npm install
```
3. Set up the environment variables:

Create a .env file in the backend directory and add variables provided in `.env.example`

4. Run the Prisma migration:

In the backend directory, run:

```bash
npx prisma migrate dev
```

5. Start the Backend Server:

Navigate to the backend directory and run:

```bash
npm run start
```

6. Start the Frontend Server:

Navigate to the frontend directory and run:

```bash
npm run dev
```
