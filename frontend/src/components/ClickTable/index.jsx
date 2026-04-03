import './ClickTable.css';

function formatDate(dateStr) {
  const dateObj = new Date(dateStr);
  const datePart = `${String(dateObj.getDate()).padStart(2, '0')}/${String(dateObj.getMonth() + 1).padStart(2, '0')}/${dateObj.getFullYear()}`;
  const timePart = `${String(dateObj.getHours()).padStart(2, '0')}:${String(dateObj.getMinutes()).padStart(2, '0')}`;
  return `${timePart} ${datePart}`;
}

function parseUA(ua) {
  if (!ua) return '🌐 Không xác định';
  if (/mobile/i.test(ua)) return '📱 Di động';
  if (/tablet|ipad/i.test(ua)) return '📟 Máy tính bảng';
  if (/edg/i.test(ua)) return '🔵 Edge';
  if (/chrome/i.test(ua)) return '🌐 Chrome';
  if (/firefox/i.test(ua)) return '🦊 Firefox';
  if (/safari/i.test(ua)) return '🧭 Safari';
  return '🌐 Trình duyệt';
}

export default function ClickTable({ clicks }) {
  if (!clicks || clicks.length === 0) {
    return (
      <div className="click-table-empty" id="click-table-empty">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
        <p>Chưa có lượt nhấp nào</p>
        <span>Chia sẻ liên kết của bạn để bắt đầu theo dõi</span>
      </div>
    );
  }

  return (
    <div className="click-table-wrapper animate-fade-in" id="click-table">
      <div className="click-table-scroll">
        <table className="click-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Thời gian</th>
              <th>Trình duyệt</th>
              <th>Địa chỉ IP</th>
            </tr>
          </thead>
          <tbody>
            {clicks.map((click, idx) => (
              <tr key={click.id || idx}>
                <td className="click-table__num">{clicks.length - idx}</td>
                <td className="click-table__time">{formatDate(click.clickedAt)}</td>
                <td className="click-table__ua">{parseUA(click.userAgent)}</td>
                <td className="click-table__ip">
                  <code>{click.ipAddress || '—'}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="click-table__count">
        Hiển thị {clicks.length} lượt nhấp
      </p>
    </div>
  );
}
