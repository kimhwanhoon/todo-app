'use client';

const Cards = ({ cardsArr, setCardsArr }) => {
  // DELETE BUTTON => DELETE CARD
  const deleteClickHandler = (key) => {
    const filteredArr = cardsArr.filter((card) => {
      console.log('card.id', card.id);
      console.log('key', key);
      return card.id !== key;
    });
    setCardsArr(filteredArr);
  };

  return (
    <div id="card-list" className="flex flex-wrap gap-5">
      <ProjectCards
        cardsArr={cardsArr}
        deleteClickHandler={deleteClickHandler}
      />
    </div>
  );
};

export default Cards;

const ProjectCards = ({ cardsArr, deleteClickHandler }) => {
  const Cards = cardsArr.map((card: [], index: number) => {
    return (
      <div
        key={card.id}
        className="flex flex-col gap-2 shadow-md shadow-indigo-200 rounded-md w-48 bg-white h-44"
      >
        <textarea
          readOnly
          className="resize-none p-4 w-full h-24 outline-none rounded-md text-sm text-gray-800 "
          value={card.text}
        ></textarea>
        <div>
          <p className="text-sm px-3 text-center">{card.time}</p>
        </div>
        <div className="flex justify-between items-center pt-2">
          <img
            className="w-6 h-6 ml-5 cursor-pointer"
            src="/delete.png"
            alt=""
            onClick={() => deleteClickHandler(card.id)}
          />
          <h1 className="text-right px-4 ">
            By: <span>{card.by}</span>
          </h1>
        </div>
      </div>
    );
  });
  return Cards;
};
