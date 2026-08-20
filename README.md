# 3D Hangman

A 3D-animated Hangman game built with **React** and **Vite**, rendered with Three.js via **React Three Fiber**.

## Features

- Fully 3D hangman scene with an animated figure that builds part-by-part on wrong guesses
- 8 themed word categories: Food, Animals, Sports, Places, Things, Classroom, Space, Nature
- Interactive 3D scene — drag to orbit, scroll to zoom
- On-screen keyboard plus physical keyboard input
- Mistake tracking with life dots and win/lose overlays

## Getting started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Scripts

| Command          | Description                     |
| ---------------- | ------------------------------- |
| `npm run dev`    | Start the Vite dev server       |
| `npm run build`  | Build for production to `dist/` |
| `npm run lint`   | Run Oxlint checks               |
| `npm run preview`| Preview the production build    |