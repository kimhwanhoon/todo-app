import Header from './components/header';
import Input from './components/input';
import Cards from './components/In progress cards';
import Main from './main';

export default function Home() {
  return (
    <div
      id="CONTAINER"
      className="flex flex-col mx-auto my-5 min-w-800 max-w-1200"
    >
      <Header />
      <main className="rounded-b-xl w-full bg-slate-50 h-[calc(100vh-120px)] flex flex-col items-center overflow-auto">
        <Main />
      </main>
    </div>
  );
}
