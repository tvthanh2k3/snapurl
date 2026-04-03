import './ErrorMessage.css';

export default function ErrorMessage({ message, onDismiss }) {
  if (!message) return null;

  return (
    <div className="error-message animate-fade-in" role="alert">
      <span className="error-message__icon">⚠</span>
      <span className="error-message__text">{message}</span>
      {onDismiss && (
        <button
          className="error-message__dismiss"
          onClick={onDismiss}
          aria-label="Bỏ qua lỗi"
        >
          ✕
        </button>
      )}
    </div>
  );
}
