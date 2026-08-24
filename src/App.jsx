import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import HangmanScene from './hangmanScene'
import { TOPICS, TOPIC_LIST } from './words'
import './App.css'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const MAX_MISTAKES = 6

const pickWord = (words, lastWord = null) => {
  const fresh = words.filter((w) => w !== lastWord)
  const pool = fresh.length > 0 ? fresh : words
  return pool[Math.floor(Math.random() * pool.length)]
}

export default function App() {
  const [topic, setTopic] = useState(null)
  const [word, setWord] = useState(null)
  const [guessed, setGuessed] = useState([])
  const [round, setRound] = useState(0)

  const startTopic = (key) => {
    setTopic(key)
    setWord(pickWord(TOPICS[key].words, word))
    setGuessed([])
    setRound((r) => r + 1)
  }

  const goToTopics = () => {
    setTopic(null)
    setWord(null)
    setGuessed([])
  }

  const mistakes = word
    ? guessed.filter((letter) => !word.includes(letter)).length
    : 0
  const revealed = word
    ? word.split('').map((letter) => (guessed.includes(letter) ? letter : '_'))
    : []
  const won = revealed.length > 0 && revealed.every((letter) => letter !== '_')
  const lost = mistakes >= MAX_MISTAKES
  const over = won || lost
  const result = won ? 'won' : lost ? 'lost' : null

  const handleGuess = (letter) => {
    if (over || !word) return
    setGuessed((prev) => (prev.includes(letter) ? prev : [...prev, letter]))
  }

  useEffect(() => {
    const onKey = (event) => {
      if (!/^[a-zA-Z]$/.test(event.key)) return
      handleGuess(event.key.toUpperCase())
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const letterClass = (letter) => {
    if (!guessed.includes(letter)) return 'key'
    return word.includes(letter) ? 'key key-correct' : 'key key-wrong'
  }

  return (
    <div className="app">
      <div className="canvas-wrap">
        <Canvas key={round} camera={{ position: [4.6, 2.1, 5.6], fov: 42 }}>
          <HangmanScene stage={mistakes} result={result} />
        </Canvas>
      </div>

      {!topic ? (
        <div className="overlay topic-screen">
          <div className="topic-card">
            <h1>3D Hangman</h1>
            <p className="subtitle">Pick a topic to start guessing</p>
            <div className="topic-grid">
              {TOPIC_LIST.map((key) => (
                <button
                  key={key}
                  className="topic"
                  onClick={() => startTopic(key)}
                >
                  <span className="topic-emoji" aria-hidden="true">
                    {TOPICS[key].emoji}
                  </span>
                  <span className="topic-name">{TOPICS[key].name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <header className="title">
            <button className="back" onClick={goToTopics}>
              ← Topics
            </button>
            <h1>{TOPICS[topic].emoji} {TOPICS[topic].name}</h1>
            <span className="mistakes">
              {Array.from({ length: MAX_MISTAKES }, (_, i) => (
                <span
                  key={i}
                  className={i < mistakes ? 'dot dot-filled' : 'dot'}
                />
              ))}
            </span>
          </header>

          {over && (
            <div className="overlay">
              <div className="overlay-card">
                <h2>{won ? 'You survived!' : 'Hanged!'}</h2>
                <p>
                  The word was{' '}
                  <strong className={won ? 'green' : 'red'}>{word}</strong>
                </p>
                <div className="overlay-actions">
                  <button onClick={goToTopics}>Pick topic</button>
                  <button onClick={() => startTopic(topic)}>Play again</button>
                </div>
              </div>
            </div>
          )}

          <div className="hud">
            <div className="word">
              {revealed.map((letter, i) => (
                <span
                  key={i}
                  className={letter === '_' ? 'tile' : 'tile tile-open'}
                >
                  {letter}
                </span>
              ))}
            </div>
            <div className="keyboard">
              {ALPHABET.map((letter) => (
                <button
                  key={letter}
                  className={letterClass(letter)}
                  disabled={over || guessed.includes(letter)}
                  onClick={() => handleGuess(letter)}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}