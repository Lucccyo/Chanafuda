import Card from "./Card.tsx"

function AllyHand({ cards }) {
  return (
    <>
    {cards.map( card => (
      <Card info={card} key={card.id} />
    ))}
    </>
  )
}

export default AllyHand
