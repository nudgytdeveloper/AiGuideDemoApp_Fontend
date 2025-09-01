# AIGuideDemo frontend
Gui for AIGuideDemo app

## Features
- Tab **Session**: Generate a new session via `GET /generate` and display Session ID + Chat Data.
- Tab **Update ChatData**: Update `chatData` via `POST /update?session=...&chatData=...`.
- Tab **All Sessions**: List sessions via `GET /?limit=...`.

## Setup
```bash
npm install

cp .env.example .env  # edit if your backend runs elsewhere
npm start
```
> CRA may prompt to use port 3001 if 3000 is busy. Accept it; the app will still call the backend at REACT_APP_API_BASE.
