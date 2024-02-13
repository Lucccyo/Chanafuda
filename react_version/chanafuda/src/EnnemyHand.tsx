import ReversedCard from "./ReversedCard.tsx"

function EnnemyHand({ cards }) {
  return (
    <>
    {cards.map( card => (
      <ReversedCard info={card} key={card.id} />
    ))}
    </>
  )
}

export default EnnemyHand
