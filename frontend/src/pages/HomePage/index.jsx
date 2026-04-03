import { useState } from 'react';
import ShortenForm from '../../components/ShortenForm';
import ResultCard from '../../components/ResultCard';
import LinkHistory from '../../components/LinkHistory';
import ErrorMessage from '../../components/ErrorMessage';
import { useLinkHistory } from '../../hooks/useLinkHistory';
import './HomePage.css';

export default function HomePage() {
  const [latestResult, setLatestResult] = useState(null);
  const [error, setError] = useState('');
  const { history, addLink, clearHistory } = useLinkHistory();

  const handleSuccess = (result) => {
    const newLink = addLink(result);
    setLatestResult(newLink);
    setError('');
  };

  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="container">
          <div className="hero-badge">
            <span className="badge badge--accent">⚡ Nhanh &amp; Miễn phí</span>
          </div>
          <h1 className="hero-title">
            <span className="gradient-text">SnapURL - Rút gọn liên kết</span>
          </h1>
          <p className="hero-subtitle">
            Tạo các liên kết ngắn gọn, dễ nhớ và cung cấp thống kê thời gian thực cho mỗi lượt truy cập.
          </p>

          <div className="form-section card card--glow">
            <ShortenForm onSuccess={handleSuccess} onError={setError} />
            {error && (
              <ErrorMessage
                message={error}
                onDismiss={() => setError('')}
              />
            )}
          </div>

          {latestResult && (
            <ResultCard result={latestResult} />
          )}
        </div>
      </section>

      <section className="history-section">
        <div className="container">
          <LinkHistory links={history} onClear={clearHistory} />
        </div>
      </section>

      <section className="features-section">
        <div className="container--wide">
          <div className="features-grid">
            <div className="feature-item">
              <span className="feature-item__icon">🔗</span>
              <div>
                <strong>Rút gọn tức thì</strong>
                <span>Nhận liên kết của bạn trong vài mili giây</span>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-item__icon">📊</span>
              <div>
                <strong>Thống kê theo thời gian thực</strong>
                <span>Xem lượt nhấp khi chúng xảy ra</span>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-item__icon">🔒</span>
              <div>
                <strong>Không cần tài khoản</strong>
                <span>Không cần đăng ký, không rắc rối</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
