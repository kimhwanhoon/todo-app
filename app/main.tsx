'use client';
import { useState } from 'react';
import Input from './components/input';
import InProgressCards from './components/In progress cards';
import DoneCards from './components/Done cards';

const Main = () => {
  //카드 정보 배열
  const [cardsArr, setCardsArr] = useState([]);
  // Todo textarea value 배열
  const [typedValue, setTypedValue] = useState('');
  // Todo name value 배열
  const [typedName, setTypedName] = useState('');
  // DONE 카드 정보 배열
  const [doneCardArr, setDoneCardArr] = useState([]);
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
      />
      <InProgressCards
        cardsArr={cardsArr}
        setCardsArr={setCardsArr}
        doneCardArr={doneCardArr}
        setDoneCardArr={setDoneCardArr}
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
