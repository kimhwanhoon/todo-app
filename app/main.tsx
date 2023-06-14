'use client';
import { useState } from 'react';
import Input from './components/input';
import Cards from './components/cards';

const Main = () => {
  //카드 정보 배열
  const [cardsArr, setCardsArr] = useState([]);
  // Todo textarea value 배열
  const [typedValue, setTypedValue] = useState('');
  // Todo name value 배열
  const [typedName, setTypedName] = useState('');
  return (
    <>
      <Input
        typedValue={typedValue}
        setTypedValue={setTypedValue}
        cardsArr={cardsArr}
        setCardsArr={setCardsArr}
        typedName={typedName}
        setTypedName={setTypedName}
      />
      <Cards cardsArr={cardsArr} setCardsArr={setCardsArr} />
    </>
  );
};

export default Main;
