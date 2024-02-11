const Card = ({info: { id, month, type, position }}) => {
  const card = {
      backgroundImage: "url('../hanafudraw_complete_edited.png')",
      backgroundPosition: position,
      height: "64px",
      width: "17px",
    };
  return (
    <div className="card" style={card}>
    </div>
  );
}

export default Card;
