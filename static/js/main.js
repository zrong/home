document.addEventListener('DOMContentLoaded', function () {
  // ----- 平台检测（控制 ⌘/Ctrl 快捷键显示）-----
  const isMac = /Mac|iPhone|iPod|iPad/.test(navigator.platform);
  document.documentElement.classList.add(isMac ? 'mac' : 'non-mac');

  // ----- Pageview 静默上报 -----
  fetch(`${window.AID_BASE}/api/pageview/hit?uri=${encodeURIComponent(location.pathname)}&r=${window.AID_R}`)
    .catch(() => {});

  // ----- 明暗切换 -----
  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) {
    const updateToggle = () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      toggleBtn.setAttribute('aria-checked', isDark ? 'true' : 'false');
    };
    updateToggle();
    toggleBtn.addEventListener('click', function () {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateToggle();
      const screenToggle = document.getElementById('nav-screen-theme-toggle');
      if (screenToggle) screenToggle.setAttribute('aria-checked', next === 'dark' ? 'true' : 'false');
    });
  }

  // ----- 首页最新文章 -----
  const latestSection = document.getElementById('latest-posts');
  const latestGrid    = document.getElementById('latest-posts-grid');
  if (latestSection && latestGrid) {
    fetch(`${window.AID_BASE}/api/latest?limit=3&r=0`)
      .then(r => r.json())
      .then(data => {
        if (!data.results || data.results.length === 0) return;
        latestGrid.innerHTML = data.results.map(p => {
          const thumb = p.thumbnail
            ? `<img class="latest-post-thumb" src="https://blog.zengrong.net${p.thumbnail}" alt="${p.title}" loading="lazy">`
            : '';
          return `
            <a class="latest-post-card" href="${p.url}" target="_blank">
              ${thumb}
              <div class="latest-post-body">
                <div class="latest-post-title">${p.title}</div>
                <div class="latest-post-date">${p.date}</div>
              </div>
            </a>`;
        }).join('');
        latestSection.style.display = '';
      })
      .catch(() => {});
  }

  // ----- 移动端全屏菜单抽屉 -----
  const burger    = document.getElementById('nav-burger');
  const navScreen = document.getElementById('nav-screen');

  function openNavScreen() {
    if (!navScreen) return;
    navScreen.classList.add('is-active');
    navScreen.setAttribute('aria-hidden', 'false');
    if (burger) burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeNavScreen() {
    if (!navScreen) return;
    navScreen.classList.remove('is-active');
    navScreen.setAttribute('aria-hidden', 'true');
    if (burger) burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (burger) {
    burger.addEventListener('click', () => {
      navScreen && navScreen.classList.contains('is-active') ? closeNavScreen() : openNavScreen();
    });
  }
  if (navScreen) {
    navScreen.addEventListener('click', e => {
      if (e.target === navScreen) closeNavScreen();
    });
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeNavScreen();
  });

  // ----- 抽屉内的明暗切换（与 navbar 同步）-----
  const screenThemeToggle = document.getElementById('nav-screen-theme-toggle');
  if (screenThemeToggle) {
    const syncScreenToggle = () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      screenThemeToggle.setAttribute('aria-checked', isDark ? 'true' : 'false');
    };
    syncScreenToggle();
    screenThemeToggle.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      if (toggleBtn) toggleBtn.setAttribute('aria-checked', next === 'dark' ? 'true' : 'false');
      syncScreenToggle();
    });
  }

});
