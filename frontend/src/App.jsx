import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AnalyticsPage from './pages/AnalyticsPage';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/analytics/:shortCode" element={<AnalyticsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
