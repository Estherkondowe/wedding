import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home          from './pages/Home';
import Story         from './pages/Story';
import WeddingDetails from './pages/WeddingDetails';
import RSVP          from './pages/RSVP';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/"        element={<Home />} />
          <Route path="/story"   element={<Story />} />
          <Route path="/details" element={<WeddingDetails />} />
          <Route path="/rsvp"    element={<RSVP />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
