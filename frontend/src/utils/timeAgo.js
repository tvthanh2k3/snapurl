/**
 * @param {string} dateStr - ISO date string
 * @returns {string}
 */
export function timeAgo(dateStr) {
  if (!dateStr) return 'không rõ';
  const timestamp = new Date(dateStr).getTime();
  if (isNaN(timestamp)) return 'không rõ';

  const diff = Date.now() - timestamp;
  if (diff < 60_000) return 'vừa xong';
  const mins = Math.floor(diff / 60_000);
  if (mins < 60) return `${mins} phút trước`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} giờ trước`;
  return `${Math.floor(hrs / 24)} ngày trước`;
}
