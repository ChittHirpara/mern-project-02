# 📝 NoteVault — Full-Stack Notes App

A full-stack MERN Notes App where you can create, view, edit, delete, and search notes.

## 🛠️ Tech Stack
| Layer     | Tech                    |
|-----------|-------------------------|
| Frontend  | React + Vite            |
| Styling   | Tailwind CSS            |
| HTTP      | Axios                   |
| Backend   | Node.js + Express       |
| Database  | MongoDB + Mongoose      |

## 📁 Project Structure
```
mern02/
├── client/        # React Frontend (Vite + Tailwind)
└── server/        # Node.js + Express + MongoDB Backend
```

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB running locally on port 27017

### 1. Start the Backend
```bash
cd server
npm install
npm run dev
```
Server runs at **http://localhost:5000**

### 2. Start the Frontend
```bash
cd client
npm install
npm run dev
```
App runs at **http://localhost:5173**

## 🔌 API Reference
| Method | Endpoint          | Description        |
|--------|-------------------|--------------------|
| GET    | /api/notes        | Get all notes      |
| POST   | /api/notes        | Create a note      |
| GET    | /api/notes/:id    | Get a single note  |
| PUT    | /api/notes/:id    | Update a note      |
| DELETE | /api/notes/:id    | Delete a note      |

## ✅ Features
- Create notes with title + content
- View all notes in a responsive card grid
- Edit any note via a modal popup
- Delete notes with a confirmation prompt
- Live search / filter by title
- Timestamps for created & updated dates
- Friendly empty-state screens
