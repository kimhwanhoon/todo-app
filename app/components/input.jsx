'use client';

const Input = (props) => {
  const todoTextOnChangeHandler = (e) => {
    props.setTypedValue(e.target.value);
  };
  const TimeOnChangeHandler = (e) => {
    props.setTypedTime(e.target.value);
  };

  // ADD BUTTON => ADD CARD
  const addOnClickHandler = (e) => {
    // if no value on textarea or name input, make error message and return.
    if (props.typedValue === '' && props.typedTime !== '') {
      alert('Please write your task.');
      const textarea = e.target.parentNode.querySelector('#todo-textarea');
      textarea.focus();
      return;
    } else if (props.typedValue === '') {
      alert('Please write your task.');
      return;
    } else if (props.typedTime === '') {
      alert('Please choose target time.');
      e.target.focus();
      return;
    }
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const day = new Date().getDate();
    const hour = new Date().getHours();
    const minute = new Date().getMinutes();
    const filteredMinute = String(minute).length === 1 ? '0' + minute : minute;
    const time = `${year}.${month + 1}.${day} ${hour}:${filteredMinute}`;
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
      timeInput.blur();
      addOnClickHandler(e);
    } else if (e.key === 'Escape') {
      // typed ESC, get rid of focus on input
      e.target.blur();
    }
  };
  const handleKeyPressOnTodoTextarea = (e) => {
    // typed ESC, get rid of focus on input
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
            className="w-2/6 h-full bg-indigo-500 shadow-lg shadow-indigo-500/50 rounded-lg text-white hover:bg-indigo-400 cursor-pointer active:scale-95 ease-out duration-300 hover:scale-x-105 min-w-120 ml-3 max-w-120"
            onClick={(e) => addOnClickHandler(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default Input;
