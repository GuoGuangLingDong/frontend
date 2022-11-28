import { Header } from './components/Header';
import { Footer } from "./components/Footer";
import { AppRouter } from './routes';
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

const App = () => {
  const { pathname } = useLocation();
  const isShowHeaderAndFooter = useMemo(() => !["/login", "/register"]?.includes(pathname), [pathname])

  return (
    <div className="relative bg-white overflow-hidden w-full sm:min-w-base" id="app-head" /* style={{ minWidth: 1000, minHeight: 600 }} */>
      {isShowHeaderAndFooter && <Header />}
      <AppRouter />
      {isShowHeaderAndFooter && <Footer />}
    </div>
  )
}

export default App;
