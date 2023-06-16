'use client';
import Header from './components/header';
import Main from './main.jsx';

export default function Home() {
  return (
    <div id="CONTAINER" className="flex flex-col mx-auto my-5 max-w-1200">
      <Header />
      <main className="rounded-b-xl w-full bg-slate-50 h-[calc(100vh-120px)] flex flex-col items-center overflow-auto">
        <Main />
      </main>
    </div>
  );
}
