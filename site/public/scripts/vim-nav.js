// vim-style keyboard navigation for the entry list.
// Progressive enhancement: without JS the list is plain links.
(() => {
  const list = document.getElementById('entry-list');
  if (!list) return;

  const allCards = Array.from(list.querySelectorAll('[data-entry]'));
  const emptyMsg = document.getElementById('entry-empty');
  const searchBar = document.getElementById('entry-search');
  const searchInput = document.getElementById('entry-search-input');
  const searchCount = document.getElementById('entry-search-count');

  const LAST_KEY = 'study-log:last-entry';

  // The cards currently eligible for navigation (respects the active filter).
  let visible = allCards.slice();
  let lastG = 0; // timestamp of the last lone 'g' for gg detection

  // Restore the last-opened entry only when we're actually *returning* from a
  // detail page. That intent is flagged (LAST_KEY set) at the moment an entry is
  // opened, and consumed here on the way back. A reload or fresh visit has no
  // such flag → first entry. We consume (delete) the key so a subsequent reload
  // of the index doesn't resurrect the old selection.
  let selected = -1;
  const returningHref = sessionStorage.getItem(LAST_KEY);
  sessionStorage.removeItem(LAST_KEY);
  if (returningHref) {
    const idx = visible.findIndex((c) => c.getAttribute('href') === returningHref);
    if (idx !== -1) selected = idx;
  }
  if (selected === -1 && visible.length) selected = 0;

  function render() {
    allCards.forEach((card) => {
      const isVisible = visible.includes(card);
      card.hidden = !isVisible;
      card.classList.toggle('is-selected', visible[selected] === card);
    });
    if (emptyMsg) emptyMsg.hidden = visible.length > 0;
  }

  function select(i) {
    if (visible.length === 0) {
      selected = -1;
      render();
      return;
    }
    selected = Math.max(0, Math.min(i, visible.length - 1));
    render();
    const card = visible[selected];
    if (card) {
      // Instant jump — vim-snappy, no smooth-scroll lag.
      card.scrollIntoView({ block: 'nearest', behavior: 'auto' });
    }
  }

  function move(delta) {
    select(selected === -1 ? 0 : selected + delta);
  }

  function openSelected() {
    const card = visible[selected];
    if (!card) return;
    const href = card.getAttribute('href');
    sessionStorage.setItem(LAST_KEY, href);
    window.location.href = href;
  }

  // ── search ────────────────────────────────────────────────────────────
  function openSearch() {
    if (!searchBar || !searchInput) return;
    searchBar.hidden = false;
    searchInput.focus();
    searchInput.select();
  }

  function closeSearch(clear) {
    if (!searchBar || !searchInput) return;
    if (clear) {
      searchInput.value = '';
      applyFilter('');
    }
    searchBar.hidden = true;
    searchInput.blur();
  }

  function applyFilter(query) {
    const q = query.trim().toLowerCase();
    visible = q
      ? allCards.filter((c) => (c.dataset.search || '').includes(q))
      : allCards.slice();
    if (searchCount) {
      searchCount.textContent = q
        ? `${visible.length}/${allCards.length}`
        : '';
    }
    // Keep a valid selection within the filtered set.
    selected = visible.length ? 0 : -1;
    render();
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => applyFilter(searchInput.value));
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeSearch(true);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        openSelected();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        move(1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        move(-1);
      }
    });
  }

  // ── global key handling ───────────────────────────────────────────────
  document.addEventListener('keydown', (e) => {
    // Don't hijack typing in inputs (search handles its own keys above).
    const t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;

    switch (e.key) {
      case 'j':
        e.preventDefault();
        move(1);
        break;
      case 'k':
        e.preventDefault();
        move(-1);
        break;
      case 'Enter':
        if (selected !== -1) {
          e.preventDefault();
          openSelected();
        }
        break;
      case 'G':
        e.preventDefault();
        select(visible.length - 1);
        break;
      case 'g': {
        const now = Date.now();
        if (now - lastG < 400) {
          e.preventDefault();
          select(0);
          lastG = 0;
        } else {
          lastG = now;
        }
        break;
      }
      case '/':
        e.preventDefault();
        openSearch();
        break;
      case 'Escape':
        if (searchBar && !searchBar.hidden) closeSearch(true);
        break;
    }
  });

  // Clicking a card (mouse) should also remember it, so returning via Esc/back
  // restores that entry rather than the first.
  allCards.forEach((card) => {
    card.addEventListener('click', () => {
      sessionStorage.setItem(LAST_KEY, card.getAttribute('href'));
    });
  });

  function restoreSelection() {
    let idx = -1;
    const href = sessionStorage.getItem(LAST_KEY);
    sessionStorage.removeItem(LAST_KEY); // consume: don't survive a later reload
    if (href) idx = visible.findIndex((c) => c.getAttribute('href') === href);
    if (idx === -1 && visible.length) idx = 0;
    selected = idx;
  }

  render();
  // Only a bfcache *restore* (persisted) means we navigated back — re-select
  // the last-opened entry. A normal load keeps the init-time first selection.
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      restoreSelection();
      render();
    }
  });
})();
