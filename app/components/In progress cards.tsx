'use client';

const InProgressCards = ({
  cardsArr,
  setCardsArr,
  doneCardArr,
  setDoneCardArr,
  saveOnLocalDone,
}) => {
  // DELETE BUTTON => DELETE CARD
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
  const checkButtonClickHandler = (key) => {
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
    }
  };
  return (
    <div className="flex flex-col gap-2 w-full px-16">
      <h1 className="ml-52 w-32 text-xl font-medium text-gray-700">
        In Progress
      </h1>
      <div
        id="divider0"
        className="w-24 border-b-4 border-indigo-950 ml-52 mb-3"
      ></div>
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
        <div className="w-32 pt-1 border-t border-t-gray-400 flex justify-center mx-auto">
          <p className="text-sm px-3 text-center">{card.time}</p>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-t-gray-200">
          <div className="flex gap-3">
            <img
              className="w-6 h-6 ml-3 cursor-pointer"
              src="/check.png"
              alt=""
              onClick={() => checkButtonClickHandler(card.id)}
            />
            <img
              className="w-6 h-6  cursor-pointer"
              src="/delete.png"
              alt=""
              onClick={() => deleteClickHandler(card.id)}
            />
          </div>

          <h1 className="text-right px-3 mr-2">{card.by}</h1>
        </div>
      </div>
    );
  });
  return Cards;
};
