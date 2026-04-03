import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAnalytics } from '../../services/api';
import AnalyticsCard from '../../components/AnalyticsCard';
import ClickTable from '../../components/ClickTable';
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';
import './AnalyticsPage.css';

export default function AnalyticsPage() {
  const { shortCode } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError('');
    try {
      const result = await getAnalytics(shortCode);
      setData(result);
    } catch (err) {
      setError(err.message || 'Tải số liệu thống kê thất bại');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [shortCode]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <main className="analytics-page">
      <div className="container">
        <div className="analytics-page__back">
          <Link to="/" className="analytics-page__back-link" id="back-home">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Trở về Trang chủ
          </Link>
        </div>

        <div className="analytics-page__header">
          <div>
            <h1 className="analytics-page__title">
              Thống kê liên kết
            </h1>
            <p className="analytics-page__subtitle">
              Đang theo dõi <code className="analytics-page__code">/{shortCode}</code>
            </p>
          </div>
          <button
            id="refresh-btn"
            className="btn btn-secondary analytics-page__refresh"
            onClick={() => fetchData(true)}
            disabled={loading || refreshing}
            aria-label="Làm mới thống kê"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={refreshing ? 'spin-icon' : ''}
            >
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
            {refreshing ? 'Đang làm mới…' : 'Làm mới'}
          </button>
        </div>

        {loading && (
          <div className="analytics-page__loader">
            <Loader size="lg" text="Đang tải thống kê…" />
          </div>
        )}

        {error && !loading && (
          <ErrorMessage message={error} onDismiss={() => setError('')} />
        )}

        {data && !loading && (
          <div className="analytics-page__content animate-fade-in">
            <AnalyticsCard data={data} />

            <section className="analytics-page__clicks">
              <h2 className="analytics-page__section-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
                Lịch sử nhấp chuột
              </h2>
              <ClickTable clicks={data.recentClicks ?? []} />
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
