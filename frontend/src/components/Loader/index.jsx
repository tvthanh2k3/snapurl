import './Loader.css';

export default function Loader({ size = 'md', text = '' }) {
  return (
    <div className={`loader loader--${size}`} role="status" aria-label="Đang tải">
      <span className="loader__spinner" />
      {text && <span className="loader__text">{text}</span>}
    </div>
  );
}
