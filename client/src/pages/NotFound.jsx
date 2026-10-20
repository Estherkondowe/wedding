import { Link } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle';
import './NotFound.css';

export default function NotFound() {
  usePageTitle('Page not found');

  return (
    <section className="section not-found">
      <div className="container--text text-center">
        <p className="not-found__label">404</p>
        <h1 className="not-found__title">This page has wandered off</h1>
        <p className="not-found__body">
          The link may be old — but the celebration is still on.
        </p>
        <Link to="/" className="btn btn--primary">Back to the home page</Link>
      </div>
    </section>
  );
}
