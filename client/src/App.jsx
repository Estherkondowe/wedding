import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ErrorBoundary from './components/ErrorBoundary';

const Home           = lazy(() => import('./pages/Home'));
const Story          = lazy(() => import('./pages/Story'));
const WeddingDetails = lazy(() => import('./pages/WeddingDetails'));
const RSVP           = lazy(() => import('./pages/RSVP'));
const NotFound       = lazy(() => import('./pages/NotFound'));
const Admin          = lazy(() => import('./pages/Admin'));

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ErrorBoundary>
        <Layout>
          <Suspense fallback={<div className="section" aria-busy="true" />}>
            <Routes>
              <Route path="/"         element={<Home />} />
              <Route path="/story"    element={<Story />} />
              <Route path="/details"  element={<WeddingDetails />} />
              <Route path="/rsvp"     element={<RSVP />} />
              <Route path="/admin"    element={<Admin />} />
              <Route path="*"         element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
