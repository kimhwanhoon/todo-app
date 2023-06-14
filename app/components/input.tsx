'use client';

import { ChangeEvent, useState } from 'react';

const Input = (props) => {
  const todoTextOnChangeHandler = (e: ChangeEvent) => {
    props.setTypedValue(e.target.value);
  };
  const nameOnChangeHandler = (e: ChangeEvent) => {
    props.setTypedName(e.target.value);
  };

  // ADD BUTTON => ADD CARD
  const addOnClickHandler = () => {
    // if no value on textarea or name input, make error message and return.
    if (props.typedValue === '') {
      alert('Please write your task.');
      return;
    } else if (props.typedName === '') {
      alert('Plase write your name.');
      return;
    }
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const day = new Date().getDay();
    const hour = new Date().getHours();
    const minute = new Date().getMinutes();
    const filteredMinute = String(minute).length === 1 ? '0' + minute : minute;
    const time = `${year}.${month}.${day} ${hour}:${filteredMinute}`;
    props.setCardsArr((prevCardsArr) => {
      const updatedCardsArr = [
        ...props.cardsArr,
        {
          id: prevCardsArr.length,
          text: props.typedValue,
          by: props.typedName,
          time: time,
        },
      ];
      props.setTypedValue('');
      props.setTypedName('');
      return updatedCardsArr;
    });
  };
  // type enter on name input => Activates addOnClickHandler function
  const handleKeyPressOnNameInput = (e) => {
    if (e.key === 'Enter') {
      addOnClickHandler();
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
        <h2 className="text-gray-800 py-5 text-xl">To do</h2>
        <textarea
          id="todo-textarea"
          className="shadow-md resize-none h-40 rounded-md w-96 focus:outline-indigo-400 p-4 focus:scale-105 ease-out duration-300 "
          value={props.typedValue}
          placeholder="Please write new to do task."
          onChange={(e) => todoTextOnChangeHandler(e)}
          onKeyDown={handleKeyPressOnTodoTextarea}
        />
        <input
          id="name-input"
          type="text"
          className="w-96 shadow-md text-center rounded-md mt-3 px-3 focus:outline-indigo-400 focus:scale-105 ease-out duration-300"
          placeholder="Write your name"
          value={props.typedName}
          onChange={(e) => nameOnChangeHandler(e)}
          onKeyDown={handleKeyPressOnNameInput}
        />
        <input
          id="add-button"
          type="button"
          value="Add"
          className="mt-5 h-8 w-2/6 bg-indigo-500 shadow-lg shadow-indigo-500/50 rounded-lg text-white hover:bg-indigo-400 cursor-pointer active:scale-95 ease-out duration-300"
          onClick={addOnClickHandler}
        />
      </div>
    </div>
  );
};

export default Input;
