'use client';

import { useEffect, useState } from 'react';
import Input from './components/input.jsx';
import InProgressCards from './components/In progress cards.jsx';
import DoneCards from './components/Done cards.jsx';

const Main = () => {
  //카드 정보 배열
  const [cardsArr, setCardsArr] = useState([]);
  // DONE 카드 정보 배열
  const [doneCardArr, setDoneCardArr] = useState([]);
  // Todo textarea value 배열
  const [typedValue, setTypedValue] = useState('');
  // Todo name value 배열
  const [typedTime, setTypedTime] = useState('');

  // localStorage에서 in progress cards, done cards 받아오기
  useEffect(() => {
    setCardsArr(JSON.parse(localStorage.getItem('progress')) ?? []);
    setDoneCardArr(JSON.parse(localStorage.getItem('done')) ?? []);
  }, []); //빈 배열을 의미하는 두 번째 인자로 전달하여 페이지가 마운트될 때 한 번만 실행되도록 설정
  // local에 저장하기 in progress cards => props로 물려줄 예정
  // Add 버튼누르면 실행
  const saveOnLocalProgress = (prevCardsArr) => {
    localStorage.setItem('progress', JSON.stringify(prevCardsArr));
  };
  // local에 저장하기 done cards  => props로 물려줄 예정
  // in progress 카드에서 완료버튼 누르면 실행
  const saveOnLocalDone = (prevCardsArr) => {
    // 로컬저장소에 done이란 key가 있으면 받아오고, 없으면 빈 배열 생성
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
        typedTime={typedTime}
        setTypedTime={setTypedTime}
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
