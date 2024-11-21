import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/home/Home';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import PageNotFound from './components/other/PageNotFound';

export default function App() {
  return (
    <div>
      <Router
        // WARNING FIX: React Router will begin wrapping state updates in `React.startTransition` in v7
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Header />
        <main>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}
