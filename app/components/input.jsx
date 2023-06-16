'use client';

// 가져온 props들이 너무 많아서 구조분해할당이 아닌 props 객체를 가져왔습니다.
const Input = (props) => {
  // todo input 키 반응 핸들러
  const todoTextOnChangeHandler = (e) => {
    props.setTypedValue(e.target.value);
  };
  // time input 키 반응 핸들러
  const TimeOnChangeHandler = (e) => {
    props.setTypedTime(e.target.value);
  };

  // ADD 버튼 클릭 -> In Progress 카드 추가
  const addOnClickHandler = (e) => {
    const textarea = e.target.parentNode.querySelector('#todo-textarea');
    // if no value on todo input or name input, make error message and return.
    if (props.typedValue === '' && props.typedTime !== '') {
      alert('Please write your task.');
      textarea.focus();
      return;
    } else if (props.typedValue === '') {
      alert('Please write your task.');
      textarea.focus();
      return;
    } else if (props.typedTime === '') {
      alert('Please choose target time.');
      e.target.focus();
      return;
    }
    // 작성 시각 생성하기
    const year = new Date().getFullYear();
    // JS에서 month는 0부터 시작하므로 1을 추가
    const month = new Date().getMonth() + 1;
    // month가 1의 자리면 앞에 0을 붙여 균형있게 만들기
    const filteredMonth = String(month).length === 1 ? '0' + month : month;
    const day = new Date().getDate();
    const hour = new Date().getHours();
    const minute = new Date().getMinutes();
    // 분 단위에서 한 자리면 앞에 0을 붙여서 균형있게 만들기
    const filteredMinute = String(minute).length === 1 ? '0' + minute : minute;
    const time = `${year}.${filteredMonth}.${day} ${hour}:${filteredMinute}`;
    // setCardsArr풀어서 쓴 이유
    // setCardsArr 함수안에 props.saveOnLocalProgress(updatedCardsArr);를 쓰지 않으면
    // 계속 한 박자 늦게 업데이트가 되는 문제가 있었습니다.
    // setCardsArr 함수가 비동기 함수라서 그런것을 추측하고 있습니다.
    props.setCardsArr((prev) => {
      const updatedCardsArr = [
        ...props.cardsArr,
        {
          id: prev.length,
          text: props.typedValue,
          by: props.typedTime,
          time: time,
        },
      ];
      props.saveOnLocalProgress(updatedCardsArr);
      return updatedCardsArr;
    });
    props.setTypedValue('');
    props.setTypedTime('');
  };
  // type enter on name input => Activates addOnClickHandler function
  const handleKeyPressOnTimeInput = (e) => {
    if (e.key === 'Enter') {
      const timeInput = e.target.parentNode.querySelector('#time-input');
      timeInput.blur(); // add 버튼 누르고 마지막 인풋에서 포커스 떼기
      addOnClickHandler(e);
    } else if (e.key === 'Escape') {
      // typed ESC, get rid of focus on input
      e.target.blur();
    }
  };
  const handleKeyPressOnTodoTextarea = (e) => {
    // if typed ESC, get rid of focus on input
    if (e.key === 'Escape') {
      e.target.blur();
    }
  };

  return (
    <div className="py-7 flex justify-center gap-5 w-2/3">
      <div className="flex flex-col items-center w-2/3">
        <h2 className="text-gray-700 pt-5 pb-2 text-2xl  font-medium">
          Add your To do
        </h2>
        <div
          id="divider-addYourTodo"
          className="w-3/4 border-b-4 border-b-indigo-950 mb-5"
        ></div>
        <div className="flex items-center">
          <div className="w-full">
            <input
              autoComplete="off"
              id="todo-textarea"
              className="text-gray-600 shadow-md resize-none h-10 rounded-md w-full focus:outline-indigo-400 p-4 focus:scale-105 ease-out duration-300"
              value={props.typedValue}
              placeholder="Please write new to do task."
              onChange={(e) => todoTextOnChangeHandler(e)}
              onKeyDown={handleKeyPressOnTodoTextarea}
            />
            <input
              id="time-input"
              type="time"
              className="text-gray-600 w-full shadow-md rounded-md mt-3 p-4 focus:outline-indigo-400 focus:scale-105 ease-out duration-300 h-10 text-center"
              value={props.typedTime}
              onChange={(e) => TimeOnChangeHandler(e)}
              onKeyDown={handleKeyPressOnTimeInput}
            />
          </div>

          <input
            id="add-button"
            type="button"
            value="Add"
            className="w-2/6 h-full bg-indigo-500 shadow-lg shadow-indigo-500/50 rounded-lg text-white hover:bg-indigo-400 cursor-pointer active:scale-95 ease-out duration-300 min-w-120 ml-3 max-w-120"
            onClick={(e) => addOnClickHandler(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default Input;
