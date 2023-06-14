'use client';

const DoneCards = ({ doneCardArr, setDoneCardArr, cardsArr, setCardsArr }) => {
  // DELETE DONE CARD
  const deleteDoneCard = (key) => {
    if (confirm('Are you sure to delete this task?')) {
      const filteredArr = doneCardArr.filter((card) => {
        return card.id !== key;
      });
      setDoneCardArr(filteredArr);
    }
  };
  // BACK BUTTON to send back to in progress cards
  const backButtonClickHandler = (key) => {
    if (confirm('Wanna put it back to In Progress?')) {
      const tempArr = [];
      doneCardArr.forEach((card) => {
        if (key === card.id) {
          tempArr.push(card);
          setCardsArr((prevCard) => {
            const backCard = [...prevCard, card];
            return backCard;
          });
        }
      });
      // in progress에 있는 요소 없애기
      const filteredArr = doneCardArr.filter((card) => {
        return card.id !== key;
      });
      setDoneCardArr(filteredArr);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full px-16">
      <h1 className="ml-52 w-32 text-xl font-medium text-gray-700">Done</h1>
      <div
        id="divider0"
        className="w-24 border-b-4 border-indigo-950 ml-52 mb-3"
      ></div>
      <div
        id="done-card-list"
        className="flex flex-wrap gap-5 justify-center mb-10"
      >
        <ProjectCards
          doneCardArr={doneCardArr}
          deleteDoneCard={deleteDoneCard}
          backButtonClickHandler={backButtonClickHandler}
        />
      </div>
    </div>
  );
};

export default DoneCards;

const ProjectCards = ({
  doneCardArr,
  deleteDoneCard,
  backButtonClickHandler,
}) => {
  const Cards = doneCardArr.map((card: {}) => {
    return (
      <div
        key={card.id}
        className="flex flex-col gap-2 shadow-md shadow-indigo-200 rounded-md w-48 bg-white h-44"
      >
        <textarea
          readOnly
          className="resize-none p-4 w-full h-24 outline-none rounded-md text-sm text-gray-800 text-center"
          value={card.text}
        ></textarea>
        <div className="w-32 pt-1 border-t border-t-gray-400 flex justify-center mx-auto">
          <p className="text-sm px-3 text-center">{card.time}</p>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-t-gray-200">
          <div className="flex gap-3 pl-3">
            <img
              className="w-6 h-6  cursor-pointer"
              src="/back.png"
              alt="back"
              onClick={() => backButtonClickHandler(card.id)}
            />
            <img
              className="w-6 h-6  cursor-pointer"
              src="/delete.png"
              alt="delete"
              onClick={() => deleteDoneCard(card.id)}
            />
          </div>

          <h1 className="text-right px-3 mr-2">{card.by}</h1>
        </div>
      </div>
    );
  });
  return Cards;
};
