# Web Scribbles

**View live demo [here](https://web-scribble.vercel.app/)**

**Guide to Start The Project**

**Prerequisites**
- Node.js installed on your device. If not, download and install it from [here](https://nodejs.org/en).
- MongoDB installed on your device. If not download and install it from [here](https://www.mongodb.com/try/download/community).

## How to Configure The Backend

1. Create a `.env` file in the `backend` folder with the following content:

```env
PORT = {Any port you want your server to listen on} # For example, PORT=3000
DB_URL = {Your MongoDB Database url}
TOKEN_SECRET = {A secret for signing JWT Tokens}
```

**Open Your Terminal**

```bash
cd backend
npm install
npm start
```

## How to Configure The Frontend

Create a `.env` file in the frontend folder and add this variable `VITE_BACKEND_URL={YOUR BACKEND URL}` for example `VITE_BACKEND_URL="http://localhost:3000/"`

**Open Your Terminal**

```bash
cd frontend
npm install
npm run dev
```

## 📄 Todos
- [ ] Unit Testing
- [ ] Convert the project to TypeScript

Thank you ☺