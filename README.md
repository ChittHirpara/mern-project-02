# 📝 NoteVault (MERN Stack Notes App)

**🚀 Live Demo:** [https://mern-project-02.vercel.app](https://mern-project-02.vercel.app)
**🔌 Backend API:** [https://mern-project-02.onrender.com](https://mern-project-02.onrender.com)

A highly polished, full-stack Notes Application built with the MERN stack (MongoDB, Express, React, Node.js). NoteVault features a premium glassmorphic UI, real-time live search, color-coded categorization, and seamless cloud database integration.

![NoteVault Demo](https://via.placeholder.com/1000x500.png?text=NoteVault+-+Premium+MERN+Notes+App)

## ✨ Features

- **CRUD Operations**: Create, read, update, and permanently delete notes.
- **📌 Pinned Notes**: Pin important notes to automatically keep them at the top of your dashboard.
- **🎨 Color Categorization**: Choose from 6 distinct colors to style your note cards dynamically.
- **🔍 Live Search**: Filter notes in real-time as you type, powered by React state derivation.
- **🗂️ Advanced Sorting & Views**: Sort by Newest, Oldest, or Alphabetical. Toggle between Grid and List views.
- **🔔 Toast Notifications**: Smooth, animated feedback alerts for all actions (create, edit, delete, copy).
- **📋 One-Click Copy**: Instantly copy note contents to your clipboard.
- **✨ Premium UI/UX**: Built with Tailwind CSS v4, featuring backdrop blurs, gradients, hover micro-interactions, and responsive design.

## 🛠️ Tech Stack

**Frontend:**
- React 19 (Vite)
- Tailwind CSS v4
- Axios

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- CORS & dotenv

## 📁 Project Structure

```text
mern02/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── api/            # Axios API configurations
│   │   ├── components/     # Reusable UI components (Navbar, NoteCard, etc.)
│   │   ├── App.jsx         # Main application logic & state management
│   │   └── index.css       # Tailwind entry and custom animations
│   ├── .env                # Client environment variables (VITE_API_URL)
│   └── vite.config.js
│
├── server/                 # Express Backend
│   ├── config/             # MongoDB connection logic
│   ├── controllers/        # Route handlers (CRUD logic)
│   ├── models/             # Mongoose schemas
│   ├── routes/             # Express API routes
│   ├── index.js            # Server entry point
│   └── .env                # Server environment variables (MONGO_URI, CLIENT_URL)
```

## 🚀 Local Development Setup

### 1. Prerequisites
- Node.js installed
- MongoDB installed locally OR a MongoDB Atlas cluster URI

### 2. Backend Setup
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/notesapp   # OR your Atlas connection string
CLIENT_URL=http://localhost:5173
```
Start the server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd client
npm install
```
Create a `.env` file in the `client` directory:
```env
VITE_API_URL=http://localhost:5000
```
Start the Vite development server:
```bash
npm run dev
```

## 🌍 Deployment Guide

This project is fully configured for split deployment:

**Backend (Render / Railway):**
1. Set the root directory to `server`.
2. Build command: `npm install`
3. Start command: `node index.js`
4. Set Environment Variables: `MONGO_URI` (Atlas String) and `CLIENT_URL` (Vercel Frontend URL).

**Frontend (Vercel / Netlify):**
1. Set the root directory to `client`.
2. Framework preset: `Vite`.
3. Set Environment Variable: `VITE_API_URL` (Render Backend URL).

---
*Developed with ❤️ using the MERN stack.*
