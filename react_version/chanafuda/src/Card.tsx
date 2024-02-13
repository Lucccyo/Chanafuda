const Card = ({info: { id, month, type, position }}) => {
  const card = {
      backgroundImage: "url('../hanafudraw_complete_edited.png')",
      backgroundPosition: position,
    };
  return (
    <div className="card" style={card}>
    </div>
  );
}

export default Card;
