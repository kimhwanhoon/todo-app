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
  const addOnClickHandler = (e) => {
    // if no value on textarea or name input, make error message and return.
    if (props.typedValue === '' && props.typedName !== '') {
      alert('Please write your task.');
      const textarea = e.target.parentNode.querySelector('#todo-textarea');
      textarea.focus();
      return;
    } else if (props.typedValue === '') {
      alert('Please write your task.');
      return;
    } else if (props.typedName === '') {
      alert('Plase write your name.');
      e.target.focus();
      return;
    } else if (props.typedName.length > 8) {
      alert('Your name is too long.');
      const nameInput = e.target.parentNode.querySelector('#name-input');
      nameInput.focus();
      return;
    }
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const day = new Date().getDay();
    const hour = new Date().getHours();
    const minute = new Date().getMinutes();
    const filteredMinute = String(minute).length === 1 ? '0' + minute : minute;
    const time = `${year}.${month}.${day} ${hour}:${filteredMinute}`;
    props.setCardsArr((prev) => {
      const updatedCardsArr = [
        ...props.cardsArr,
        {
          id: prev.length,
          text: props.typedValue,
          by: props.typedName,
          time: time,
        },
      ];
      props.saveOnLocalProgress(updatedCardsArr);
      return updatedCardsArr;
    });
    props.setTypedValue('');
    props.setTypedName('');
  };
  // type enter on name input => Activates addOnClickHandler function
  const handleKeyPressOnNameInput = (e) => {
    if (e.key === 'Enter') {
      const nameInput = e.target.parentNode.querySelector('#name-input');
      nameInput.blur();
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
        <textarea
          autoComplete="off"
          id="todo-textarea"
          className="text-gray-600 shadow-md resize-none h-40 rounded-md w-96 focus:outline-indigo-400 p-4 focus:scale-105 ease-out duration-300 "
          value={props.typedValue}
          placeholder="Please write new to do task."
          onChange={(e) => todoTextOnChangeHandler(e)}
          onKeyDown={handleKeyPressOnTodoTextarea}
        />
        <input
          id="name-input"
          autoComplete="off"
          type="text"
          className="text-gray-600 w-96 shadow-md text-center rounded-md mt-3 px-3 focus:outline-indigo-400 focus:scale-105 ease-out duration-300"
          placeholder="Write your name"
          value={props.typedName}
          onChange={(e) => nameOnChangeHandler(e)}
          onKeyDown={handleKeyPressOnNameInput}
        />
        <input
          id="add-button"
          type="button"
          value="Add"
          className="mt-5 h-8 w-2/6 bg-indigo-500 shadow-lg shadow-indigo-500/50 rounded-lg text-white hover:bg-indigo-400 cursor-pointer active:scale-95 ease-out duration-300 hover:scale-x-105"
          onClick={(e) => addOnClickHandler(e)}
        />
      </div>
    </div>
  );
};

export default Input;