'use client';

// Done 카드
const DoneCards = ({ doneCardArr, setDoneCardArr, setCardsArr }) => {
  // Done 카드 제거 버튼 클릭 시 실행 함수
  const deleteDoneCard = (key) => {
    if (confirm('Are you sure to delete this task?')) {
      // 사용자에게 다시 물어봐서 확인 시 함수 실행
      // 로컬저장소에서 done 키를 가져와서 변수로 지정
      const localDoneCards = JSON.parse(localStorage.getItem('done'));
      // 클릭한 카드의 key값과 로컬저장소의 카드의 id가 일치하면 그 카드를 제외한 새로운 배열 생성
      const updatedDoneCards = localDoneCards.filter((card) => card.id !== key);
      // 로컬 저장소에 저장
      localStorage.setItem('done', JSON.stringify(updatedDoneCards));
      const filteredArr = doneCardArr.filter((card) => {
        return card.id !== key;
      });
      // setDoneCardArr를 실행하여 클라이언트 상에서도 재랜더링
      setDoneCardArr(filteredArr);
    }
  };
  // BACK BUTTON to send back to in progress cards
  const backButtonClickHandler = (key) => {
    if (confirm('Wanna put it back to In Progress?')) {
      const targetCard = doneCardArr.filter((card) => card.id === key);
      // done 로컬에서 삭제
      const localDoneCards = JSON.parse(localStorage.getItem('done'));
      const updatedLocalDoneCards = localDoneCards.filter(
        (card) => card.id !== key
      );
      localStorage.setItem('done', JSON.stringify(updatedLocalDoneCards));

      // progress 로컬에 추가
      const localProgressCards = JSON.parse(localStorage.getItem('progress'));
      const updatedProgressCards = [...localProgressCards, ...targetCard];
      localStorage.setItem('progress', JSON.stringify(updatedProgressCards));
      setCardsArr(updatedProgressCards); //  업데이트로 랜더링하기

      // in progress에 있는 요소 없애기
      const filteredArr = doneCardArr.filter((card) => {
        return card.id !== key;
      });
      setDoneCardArr(filteredArr);
    }
  };
  return (
    <div className="flex flex-col gap-2 w-full px-16">
      <div className="flex flex-col items-center divider">
        <h1 className="divider-h1 w-32 text-xl font-medium text-gray-700 pt-5 cursor-default">
          Done
        </h1>
        <div
          id="divider0"
          className="mt-3 w-24 border-b-4 border-indigo-950 mb-3"
        ></div>
      </div>

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

// Done 카드 표시하기
const ProjectCards = ({
  doneCardArr,
  deleteDoneCard,
  backButtonClickHandler,
}) => {
  const Cards = doneCardArr.map((card) => {
    return (
      <div
        key={card.id}
        className="done-cards flex flex-col shadow-md shadow-indigo-200 rounded-md w-full bg-white cursor-default max-w-2xl"
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
              src="/back.png"
              alt="back"
              onClick={() => backButtonClickHandler(card.id)}
            />
            <img
              className="icon w-6 h-6  cursor-pointer"
              src="/delete.png"
              alt="delete"
              onClick={() => deleteDoneCard(card.id)}
            />
          </div>
        </div>

        <div className="flex justify-between items-center py-2">
          <h1 className="pl-5 mr-1 text-gray-700 font-medium text-xs">Done</h1>
          <p className="w-64 text-xs px-3 text-right">Wrote at: {card.time}</p>
        </div>
      </div>
    );
  });
  return Cards;
};
