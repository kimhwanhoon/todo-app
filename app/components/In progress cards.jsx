'use client';

const InProgressCards = ({ cardsArr, setCardsArr, setDoneCardArr }) => {
  // DELETE 버튼 클릭 => 해당 카드 삭제
  const deleteClickHandler = (key) => {
    if (confirm('Are you sure to delete this task?')) {
      // 사용자에게 확정받고 삭제하기
      const localProgressCards = JSON.parse(localStorage.getItem('progress'));
      // key값을 로컬저장소에 있는 progress 카드와 비교하여 일치하는 카드만 뺀 새로운 배열 생성
      const updatedProgressCards = localProgressCards.filter(
        (card) => card.id !== key
      );
      // 위에서 만든 새로운 배열을 새롭게 로컬저장소에 업데이트
      localStorage.setItem('progress', JSON.stringify(updatedProgressCards));
      // 로컬 저장소에서만 업데이트 하는 것이 아니라 클라이언트 상에서도 업데이트
      const filteredArr = cardsArr.filter((card) => {
        return card.id !== key;
      });
      // setCardsArr를 실행하여 화면에 업데이트된 내용을 재랜더링
      setCardsArr(filteredArr);
    }
  };
  // In Progress 카드에서 완료 버튼 누르면 실행 함수
  const checkButtonClickHandler = (key) => {
    if (confirm('Have you done your task?')) {
      // 해당하는 카드 추출
      const targetCard = cardsArr.filter((card) => card.id === key);
      // local done에 추가
      const localDoneCards = JSON.parse(localStorage.getItem('done')) ?? [];
      // 새롭게 만든 배열을 로컬저장소에 업데이트
      const newDoneCardsToSaveOnLocal = [...localDoneCards, ...targetCard];
      localStorage.setItem('done', JSON.stringify(newDoneCardsToSaveOnLocal));
      // setDoneCardArr를 실행하여 화면에 업데이트된 내용을 재랜더링
      setDoneCardArr(newDoneCardsToSaveOnLocal);

      // 로컬 저장소에 있는 progress에서 해당 카드를 삭제
      const localProgressCards =
        JSON.parse(localStorage.getItem('progress')) ?? [];
      const newProgressCardsToSaveOnLocal = localProgressCards.filter(
        (card) => card.id !== key
      );
      localStorage.setItem(
        'progress',
        JSON.stringify(newProgressCardsToSaveOnLocal)
      );

      // 클라이언트상에서 In Progress에 있는 요소 없애기
      const filteredArr = cardsArr.filter((card) => {
        return card.id !== key;
      });
      // setCardsArr 실행하여 화면에 업데이트된 내용을 재랜더링
      setCardsArr(filteredArr);
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

// In Progress에 있는 카드 생성
const ProjectCards = ({
  cardsArr,
  deleteClickHandler,
  checkButtonClickHandler,
}) => {
  // cardsArr 배열에 있는 카드를 JSX로 구성
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
              onClick={() => checkButtonClickHandler(card.id)}
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
