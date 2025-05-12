import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Fixtures from './pages/Fixtures';
import Table from './pages/Table';
import News from './pages/News';
import Video from './pages/Video';
import Clubs from './pages/Clubs';
import Players from './pages/Players';
import PlayerProfile from './pages/profile';
import Results from './pages/Results';
import Stats from './pages/Stats';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fixtures" element={<Fixtures />} />
            <Route path="/tables" element={<Table />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/news" element={<News />} />
            <Route path="/video" element={<Video />} />
            <Route path="/clubs" element={<Clubs />} />
            <Route path="/players" element={<Players />} />
            <Route path="/players/:id" element={<PlayerProfile />} />
            <Route path="/results" element={<Results />} />
            {/* Add more routes as needed */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
