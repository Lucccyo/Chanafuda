import cards from "./data.js"
import Card from "./Card.tsx"

function River() {
  console.log(cards);
  return (
    <>
    {cards.map( card => (
      <Card info={card} key={card.id} />
    ))}
    </>
  )
}

export default River
