import "./SingleCard.css";

export default function SingleCards({
  disabled,
  card,
  flipped,
  nelfImg,
  handleChoice,
}) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" alt="card-front}" src={card.src} />
        <img
          className="back"
          src={nelfImg}
          onClick={handleClick}
          alt="card-back"
        />
      </div>
    </div>
  );
}
