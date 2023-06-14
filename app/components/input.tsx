'use client';

import { ChangeEvent, useState } from 'react';

const Input = ({ typedValue, setTypedValue, cardsArr, setCardsArr }) => {
  const todoTextOnChangeHandler = (e: ChangeEvent) => {
    setTypedValue(e.target.value);
  };

  // ADD BUTTON => ADD CARD
  const addOnClickHandler = () => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const day = new Date().getDay();
    const hour = new Date().getHours();
    const minute = new Date().getMinutes();
    const filteredMinute = String(minute).length === 1 ? '0' + minute : minute;
    const time = `${year}.${month}.${day} ${hour}:${filteredMinute}`;
    console.log(time);
    setCardsArr((prevCardsArr) => {
      const updatedCardsArr = [
        ...cardsArr,
        { id: prevCardsArr.length, text: typedValue, by: '김환훈', time: time },
      ];
      setTypedValue('');
      return updatedCardsArr;
    });
  };

  return (
    <div className="py-7 flex justify-center gap-5 w-2/3">
      <div className="flex flex-col items-center w-2/3">
        <h2 className="text-gray-800 py-5 text-xl">To do</h2>
        <textarea
          className="shadow-md resize-none h-24 rounded-md w-full focus:outline-indigo-400 p-4"
          value={typedValue}
          onChange={(e) => todoTextOnChangeHandler(e)}
        />
        <input
          type="button"
          value="Add"
          className="mt-5 h-8 w-2/6 bg-indigo-500 shadow-lg shadow-indigo-500/50 rounded-lg text-white hover:bg-indigo-400 cursor-pointer"
          onClick={addOnClickHandler}
        />
      </div>
    </div>
  );
};

export default Input;
