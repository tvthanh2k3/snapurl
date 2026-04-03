const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

/**
 * Create a short link
 * @param {string} originalUrl
 * @returns {Promise<{shortCode: string, shortUrl: string, originalUrl: string, createdAt: string}>}
 */
export async function createShortLink(originalUrl) {
  const response = await fetch(`${BASE_URL}/api/links`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ originalUrl }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error || 'Tạo link rút gọn thất bại');
  }

  return data;
}

/**
 * Get analytics for a short link
 * @param {string} shortCode
 * @returns {Promise<{shortCode: string, originalUrl: string, createdAt: string, totalClicks: number, clicks: Array}>}
 */
export async function getAnalytics(shortCode) {
  const response = await fetch(`${BASE_URL}/api/links/${shortCode}/analytics`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error || 'Tải dữ liệu thống kê thất bại');
  }

  return data;
}
