document.addEventListener('DOMContentLoaded', function () {
  // ----- 明暗切换 -----
  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) {
    const updateIcon = () => {
      toggleBtn.textContent = document.documentElement.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙';
    };
    updateIcon();
    toggleBtn.addEventListener('click', function () {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateIcon();
    });
  }

  // ----- Navbar burger (mobile) -----
  const burger = document.querySelector('.navbar-burger');
  const menu = document.getElementById('navMenu');
  if (burger && menu) {
    burger.addEventListener('click', () => menu.classList.toggle('is-active'));
  }

  // ----- 搜索（调用 aid FTS5 API）-----
  const AID_SEARCH = 'https://aid.zengrong.net/api/search';
  const searchBtn     = document.getElementById('search-btn');
  const searchOverlay = document.getElementById('search-overlay');
  const searchClose   = document.getElementById('search-close-btn');
  const searchInput   = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  if (!searchBtn || !searchOverlay) return;

  let debounceTimer = null;

  function openSearch() {
    searchOverlay.classList.add('is-active');
    searchInput.focus();
  }

  function closeSearch() {
    searchOverlay.classList.remove('is-active');
    searchInput.value = '';
    searchResults.innerHTML = '';
  }

  searchBtn.addEventListener('click', openSearch);
  if (searchClose) searchClose.addEventListener('click', closeSearch);
  searchOverlay.addEventListener('click', e => { if (e.target === searchOverlay) closeSearch(); });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeSearch();
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
  });

  searchInput.addEventListener('input', function () {
    clearTimeout(debounceTimer);
    const q = this.value.trim();
    if (!q) { searchResults.innerHTML = ''; return; }

    debounceTimer = setTimeout(() => {
      searchResults.innerHTML = '<div class="search-empty">搜索中...</div>';
      fetch(`${AID_SEARCH}?q=${encodeURIComponent(q)}&limit=10`)
        .then(r => r.json())
        .then(data => {
          if (!data.results || data.results.length === 0) {
            searchResults.innerHTML = '<div class="search-empty">无结果</div>';
            return;
          }
          searchResults.innerHTML = data.results.map(r => `
            <div class="search-result-item">
              <a href="${r.url}">${r.title}</a>
              <p>${r.snippet || r.description || ''}</p>
            </div>
          `).join('');
        })
        .catch(() => {
          searchResults.innerHTML = '<div class="search-empty">搜索服务暂不可用</div>';
        });
    }, 300);
  });
});
