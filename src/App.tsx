import { useState } from 'react'
import './App.css'
import BalloonEntrance from './pages/BalloonEntrance'
import PasswordChallenge from './pages/PasswordChallenge'
import GiftBoxPage from './pages/GiftBoxPage'
import CakeScene from './pages/CakeScene'
import MemoryPage from './pages/MemoryPage'
import LetterPage from './pages/LetterPage'
import FunnyMoments from './pages/FunnyMoments'
import CharacterWishes from './pages/CharacterWishes'
import FutureWishes from './pages/FutureWishes'
import KeychainPage from './pages/KeychainPage'
import FunChaos from './pages/FunChaos'
import FinalGiftBox from './pages/FinalGiftBox'

type Page =
  | 'entrance'
  | 'challenge'
  | 'giftbox'
  | 'cake'
  | 'wishes'
  | 'memories'
  | 'funny'
  | 'funchaos'
  | 'letter'
  | 'stars'
  | 'gift'
  | 'finalgift'

function App() {
  const [page, setPage] = useState<Page>('entrance')

  return (
    <div className="app">
      {page === 'entrance' && (
        <BalloonEntrance onComplete={() => setPage('challenge')} />
      )}
      {page === 'challenge' && (
        <PasswordChallenge onComplete={() => setPage('giftbox')} />
      )}
      {page === 'giftbox' && (
        <GiftBoxPage onComplete={() => setPage('cake')} />
      )}
      {page === 'cake' && (
        <CakeScene onComplete={() => setPage('wishes')} />
      )}
      {page === 'wishes' && (
        <CharacterWishes onComplete={() => setPage('memories')} />
      )}
      {page === 'memories' && (
        <MemoryPage onComplete={() => setPage('funny')} />
      )}
      {page === 'funny' && (
        <FunnyMoments onComplete={() => setPage('funchaos')} />
      )}
      {page === 'funchaos' && (
        <FunChaos onComplete={() => setPage('letter')} />
      )}
      {page === 'letter' && (
        <LetterPage onComplete={() => setPage('stars')} />
      )}
      {page === 'stars' && (
        <FutureWishes onComplete={() => setPage('gift')} />
      )}
      {page === 'gift' && (
        <KeychainPage onComplete={() => setPage('finalgift')} />
      )}
      {page === 'finalgift' && (
        <FinalGiftBox />
      )}
    </div>
  )
}

export default App
