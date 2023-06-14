import Header from './components/header';
import Input from './components/input';
import Cards from './components/cards';
import Main from './main';

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-slate-50 h-[calc(100vh-80px)] flex flex-col items-center">
        <Main />
      </main>
    </>
  );
}
