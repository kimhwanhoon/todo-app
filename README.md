![sample_gif](https://i.ibb.co/zPyKYwB/gif.gif)

# 리액트 프로젝트 To do App

이번에 배운 `setState` 훅과 `props`를 사용하여 to do app을 만들었습니다.

제 프로젝트는 **next.js**로 만들어 졌습니다. <br>그리고 `.tsx`와 `.jsx`를 혼합 사용하였으며, **tailwindcss**를 사용했습니다.

`yarn dev` 또는 `npm run dev`로 실행 가능합니다.

`page.tsx`에서 `header.tsx`와 `main.jsx` 컴포넌트를 받으며,<br>
`main.jsx`에서 나머지 모든 컴포넌트를 받습니다.

state는 총 4개를 사용하였으며, 모두 `main.jsx`에서 생성하여 자식 컴포넌트인 `Done cards.jsx`, `In progress cards.jsx`, `input.jsx`로 props를 물려줬으며, 자식 컴포넌트는 그 props를 받아서 함수를 만들었습니다.

---

사용한 state는 다음과 같습니다.

### States

|             state             |                설명                |
| :---------------------------: | :--------------------------------: |
|    [cardsArr, setCardsArr]    | 진행중인 todo의 정보를 갖는 state  |
| [doneCardArr, setDoneCardArr] |  완료된 todo의 정보를 갖는 state   |
|  [typedValue, setTypedValue]  | todo textarea의 value를 갖는 state |
|   [typedTime, setTypedTime]   |   todo time의 value를 갖는 state   |

---

### 문제점

`main.jsx` 파일에서 아직 배우지 않은 다음의 함수를 사용하였습니다.

```js
useEffect(() => {
  const progressCardsOnLocal =
    JSON.parse(localStorage.getItem('progress')) ?? [];
  const doneCardsOnLocal = JSON.parse(localStorage.getItem('done')) ?? [];
  setCardsArr(progressCardsOnLocal);
  setDoneCardArr(doneCardsOnLocal);
}, []); //빈 배열을 의미하는 두 번째 인자로 전달하여 페이지가 마운트될 때 한 번만 실행되도록 설정
```

`useEffect`를 사용하기 전에는 로딩했을 때 상기 함수가 무한으로 반복되었기 때문에 `useEffect`훅을 사용했습니다.

`main.jsx`하나의 파일에서 많은 `props`들을 자식 컴포넌트에 보내다 보니까 코드가 지저분한 느낌이 드는것 같습니다.

```js
...
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
...
```
