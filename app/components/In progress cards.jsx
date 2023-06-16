'use client';

const InProgressCards = ({ cardsArr, setCardsArr, setDoneCardArr }) => {
  // DELETE BUTTON CLICK => DELETE CARD
  const deleteClickHandler = (key) => {
    if (confirm('Are you sure to delete this task?')) {
      const localProgressCards = JSON.parse(localStorage.getItem('progress'));
      const updatedProgressCards = localProgressCards.filter(
        (card) => card.id !== key
      );
      localStorage.setItem('progress', JSON.stringify(updatedProgressCards));

      const filteredArr = cardsArr.filter((card) => {
        return card.id !== key;
      });
      setCardsArr(filteredArr);
    }
  };
  // Checked to send to Done section
  const checkButtonClickHandler = (e, key) => {
    if (confirm('Have you done your task?')) {
      const targetCard = cardsArr.filter((card) => card.id === key);
      // local done에 추가
      const localDoneCards = JSON.parse(localStorage.getItem('done')) ?? [];
      const newDoneCardsToSaveOnLocal = [...localDoneCards, ...targetCard];
      localStorage.setItem('done', JSON.stringify(newDoneCardsToSaveOnLocal));
      setDoneCardArr(newDoneCardsToSaveOnLocal);
      // local progress에서 삭제
      // set함수로 랜더시키기
      const localProgressCards =
        JSON.parse(localStorage.getItem('progress')) ?? [];
      const newProgressCardsToSaveOnLocal = localProgressCards.filter(
        (card) => card.id !== key
      );
      localStorage.setItem(
        'progress',
        JSON.stringify(newProgressCardsToSaveOnLocal)
      );

      // in progress에 있는 요소 없애기
      const filteredArr = cardsArr.filter((card) => {
        return card.id !== key;
      });

      setCardsArr(filteredArr);
      // 애니메이션 구현
      const eventTargetCard = e.target.parentNode.parentNode.parentNode;
      eventTargetCard;
    }
  };
  return (
    <div className="flex flex-col gap-2 w-full px-16">
      <div className="flex flex-col items-center divider">
        <h1 className="divider-h1 w-32 text-xl font-medium text-gray-700 cursor-default">
          In Progress
        </h1>
        <div
          id="divider0"
          className=" pt-3 w-24 border-b-4 border-indigo-950 mb-3"
        ></div>
      </div>

      <div id="card-list" className="flex flex-wrap gap-5 justify-center">
        <ProjectCards
          cardsArr={cardsArr}
          deleteClickHandler={deleteClickHandler}
          checkButtonClickHandler={checkButtonClickHandler}
        />
      </div>
    </div>
  );
};

export default InProgressCards;

const ProjectCards = ({
  cardsArr,
  deleteClickHandler,
  checkButtonClickHandler,
}) => {
  const Cards = cardsArr.map((card) => {
    return (
      <div
        key={card.id}
        className="progress-cards flex flex-col shadow-md shadow-indigo-200 rounded-md w-full bg-white cursor-default max-w-2xl"
      >
        <div className="flex justify-between border-b border-b-slate-300 items-center">
          <input
            type="text"
            readOnly
            className="w-full resize-none px-5 h-12 outline-none rounded-t-md  text-gray-800 cursor-default"
            value={card.text}
          />
          <div className="flex gap-3 pr-7">
            <img
              className="icon w-6 h-6 ml-3 cursor-pointer"
              src="/check.png"
              alt=""
              onClick={(e) => checkButtonClickHandler(e, card.id)}
            />
            <img
              className="icon w-6 h-6  cursor-pointer"
              src="/delete.png"
              alt=""
              onClick={() => deleteClickHandler(card.id)}
            />
          </div>
        </div>

        <div className="flex justify-between items-center py-2">
          <h1 className="pl-5 mr-1 text-xs text-gray-700">
            Must done by
            <span className="pl-1 text-red-600 text-sm font-medium">
              {card.by}
            </span>
          </h1>
          <p className="w-64 text-xs px-3 text-right">Wrote at: {card.time}</p>
        </div>
      </div>
    );
  });
  return Cards;
};
