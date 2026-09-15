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

## How to play

1. Pick a topic from the home screen.
2. Guess letters with the on-screen keyboard or your physical keyboard.
3. Six wrong guesses complete the hangman figure and the round is lost.
4. Reveal every letter of the hidden word to survive the round.

Tip: when a round ends, press `Enter` to play the topic again or `Escape` to go back to the topics. The same word is never drawn twice in a row when replaying a topic.

## Project structure

- `src/App.jsx` — game state, topic picker, keyboard, and overlays
- `src/hangmanScene.jsx` — the 3D scaffold, figure, and scene
- `src/words.js` — word banks and the topic list
- `src/App.css` / `src/index.css` — styling
- `index.html` — app entry point

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