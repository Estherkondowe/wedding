import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error('Wedding site error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="section" style={{ textAlign: 'center' }}>
          <p className="section-heading__label">Something went wrong</p>
          <h1 className="section-heading__title">We hit a snag</h1>
          <p className="text-center text-muted" style={{ marginTop: '1rem' }}>
            Please refresh the page — or reach us at{' '}
            <a href="tel:+265995979684" style={{ textDecoration: 'underline' }}>0995 979 684</a>.
          </p>
          <p style={{ marginTop: '2rem' }}>
            <a href="/" className="btn btn--primary">Back to the home page</a>
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
