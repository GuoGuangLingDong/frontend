import { Footer } from "./components/Footer";
import { AppRouter } from './routes';
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { bgColor } from './theme';

const App = () => {
  const { pathname } = useLocation();
  const isShowHeaderAndFooter = useMemo(() => !["/login", "/register"]?.includes(pathname), [pathname])

  return (
    <div className="relativ overflow-hidden w-full sm:min-w-base min-h-screen" id="app-head" style={{ background: bgColor }}>
      <AppRouter />
      {isShowHeaderAndFooter && <Footer />}
    </div>
  )
}

export default App;
