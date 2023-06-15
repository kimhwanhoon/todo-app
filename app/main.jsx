'use client';
import { useEffect, useState } from 'react';

import Input from './components/input.jsx';
import InProgressCards from './components/In progress cards.jsx';
import DoneCards from './components/Done cards.jsx';


const Main = () => {
  //카드 정보 배열
  const [cardsArr, setCardsArr] = useState([]);
  // Todo textarea value 배열
  const [typedValue, setTypedValue] = useState('');
  // Todo name value 배열
  const [typedName, setTypedName] = useState('');
  // DONE 카드 정보 배열
  const [doneCardArr, setDoneCardArr] = useState([]);
  // local 받아오기
  useEffect(() => {
    const progressCardsOnLocal =
      JSON.parse(localStorage.getItem('progress')) ?? [];
    const doneCardsOnLocal = JSON.parse(localStorage.getItem('done')) ?? [];
    setCardsArr(progressCardsOnLocal);
    setDoneCardArr(doneCardsOnLocal);
  }, []); //빈 배열을 의미하는 두 번째 인자로 전달하여 페이지가 마운트될 때 한 번만 실행되도록 설정
  // local에 저장하기 progress
  const saveOnLocalProgress = (prevCardsArr) => {
    localStorage.setItem('progress', JSON.stringify(prevCardsArr));
  };
  // local에 저장하기 done
  const saveOnLocalDone = (prevCardsArr) => {
    const localData = JSON.parse(localStorage.getItem('done')) ?? [];
    const addedData = [...localData, ...prevCardsArr];
    localStorage.setItem('done', JSON.stringify(addedData));
  };
  return (
    <>
      <Input
        typedValue={typedValue}
        setTypedValue={setTypedValue}
        cardsArr={cardsArr}
        setCardsArr={setCardsArr}
        typedName={typedName}
        setTypedName={setTypedName}
        doneCardArr={doneCardArr}
        setDoneCardArr={setDoneCardArr}
        saveOnLocalProgress={saveOnLocalProgress}
      />
      <InProgressCards
        cardsArr={cardsArr}
        setCardsArr={setCardsArr}
        doneCardArr={doneCardArr}
        setDoneCardArr={setDoneCardArr}
        saveOnLocalDone={saveOnLocalDone}
      />
      <DoneCards
        doneCardArr={doneCardArr}
        setDoneCardArr={setDoneCardArr}
        cardsArr={cardsArr}
        setCardsArr={setCardsArr}
      />
    </>
  );
};

export default Main;
