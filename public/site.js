// Theme before first paint, plus the two click actions. No framework, no inline script (CSP: script-src 'self').
(() => {
  const root = document.documentElement;
  const read = () => {
    try { return localStorage.getItem('theme'); } catch { return null; }
  };
  const saved = read();
  root.dataset.theme = saved === 'light' || saved === 'dark' ? saved : 'dark';

  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target.closest('[data-action]') : null;
    if (!(target instanceof HTMLElement)) return;
    if (target.dataset.action === 'toggle-theme') {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch { /* private mode: still toggles for this page */ }
    } else if (target.dataset.action === 'print') {
      window.print();
    }
  });
})();
