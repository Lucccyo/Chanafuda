import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import River from './River.tsx'
import AllyHand from './AllyHand.tsx'
import EnnemyHand from './EnnemyHand.tsx'
import Stack from './Stack.tsx'
import cards from './data.js'

import { distribute } from './logic/game.js'

function App() {
  const [ally_hand, river, ennemy_hand, stack] = distribute(cards);
  return (
    <>
      <div className="main">
        <div className="board">
          <div className="ennemy-hand">
            <EnnemyHand cards={ennemy_hand} />
          </div>
          <div className="shared-board">
            <div className="stack">
              <Stack cards={stack}/>
            </div>
            <div className="river">
              <River cards={river}/>
            </div>
          </div>
          <div className="ally-hand">
            <AllyHand cards={ally_hand} />
          </div>
        </div>
        <div className="collection">
          <div className="ennemy-collection">
            <p>ENNEMY COLLECTION</p>
          </div>
          <div className="ally-collection">
            <p>ALLY COLLECTION</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
