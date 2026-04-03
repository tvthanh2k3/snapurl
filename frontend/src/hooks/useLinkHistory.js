import { useState, useEffect } from 'react';

const STORAGE_KEY = 'snapurl_history';
const MAX_HISTORY = 20;

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

/**
 * Custom hook for managing link history in localStorage.
 * @returns {{ history: Array, addLink: Function, clearHistory: Function }}
 */
export function useLinkHistory() {
  const [history, setHistory] = useState(loadHistory);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const addLink = (result) => {
    const newLink = {
      ...result,
      createdAt: result.createdAt ?? new Date().toISOString(),
    };
    setHistory((prev) => {
      const filtered = prev.filter((h) => h.shortCode !== newLink.shortCode);
      return [newLink, ...filtered].slice(0, MAX_HISTORY);
    });
    return newLink;
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return { history, addLink, clearHistory };
}
