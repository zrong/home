document.addEventListener('DOMContentLoaded', function () {
  // ----- 平台检测（控制 ⌘/Ctrl 快捷键显示）-----
  const isMac = /Mac|iPhone|iPod|iPad/.test(navigator.platform);
  document.documentElement.classList.toggle('mac', isMac);
  document.documentElement.classList.toggle('non-mac', !isMac);

  const searchBtn = document.getElementById('search-btn');
  if (searchBtn) searchBtn.title = `搜索 (${isMac ? '⌘K' : 'Ctrl+K'})`;

  // ----- 导航子菜单（主链接访问页面，悬停整个菜单组展开子菜单）-----
  const navGroups = document.querySelectorAll('.navbar-group');
  navGroups.forEach(group => {
    const toggle = group.querySelector('.navbar-submenu-toggle');
    const dropdown = group.querySelector('.navbar-dropdown');
    function setOpen(open) {
      toggle.setAttribute('aria-expanded', String(open));
      dropdown.hidden = !open;
    }
    toggle.addEventListener('click', () => setOpen(dropdown.hidden));
    group.addEventListener('pointerenter', e => {
      if (e.pointerType === 'mouse') setOpen(true);
    });
    group.addEventListener('pointerleave', () => {
      if (!group.contains(document.activeElement)) setOpen(false);
    });
    group.addEventListener('focusout', e => {
      if (!group.contains(e.relatedTarget)) setOpen(false);
    });
    group.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !dropdown.hidden) {
        toggle.focus();
        setOpen(false);
      }
    });
    document.addEventListener('click', e => {
      if (!group.contains(e.target)) setOpen(false);
    });
  });

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

  // ----- 文章目录（宽屏左栏、滚动定位、移动端折叠）-----
  const articleToc = document.querySelector('.article-toc');
  if (articleToc) {
    const tocDetails = articleToc.querySelector('.article-toc-details');
    const wideToc = window.matchMedia('(min-width: 1280px)');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const navbar = document.querySelector('.navbar');
    const tocItems = Array.from(articleToc.querySelectorAll('nav a[href^="#"]')).map(link => {
      let id = link.hash.slice(1);
      try { id = decodeURIComponent(id); } catch {}
      return { link, heading: document.getElementById(id) };
    }).filter(item => item.heading);

    let activeItem = null;
    let tocTicking = false;

    function syncTocMode() {
      if (tocDetails) tocDetails.open = wideToc.matches;
    }

    function keepActiveVisible() {
      if (!activeItem || !wideToc.matches || (tocDetails && !tocDetails.open)) return;
      const linkRect = activeItem.link.getBoundingClientRect();
      const tocRect = articleToc.getBoundingClientRect();
      const topInset = 48;
      const bottomInset = 16;
      if (linkRect.top < tocRect.top + topInset) {
        articleToc.scrollTop -= tocRect.top + topInset - linkRect.top;
      } else if (linkRect.bottom > tocRect.bottom - bottomInset) {
        articleToc.scrollTop += linkRect.bottom - tocRect.bottom + bottomInset;
      }
    }

    function setActiveItem(item) {
      if (!item) return;
      if (activeItem === item) {
        keepActiveVisible();
        return;
      }
      if (activeItem) {
        activeItem.link.classList.remove('is-active');
        activeItem.link.removeAttribute('aria-current');
      }
      activeItem = item;
      activeItem.link.classList.add('is-active');
      activeItem.link.setAttribute('aria-current', 'location');
      keepActiveVisible();
    }

    function updateActiveItem() {
      tocTicking = false;
      if (!tocItems.length) return;
      const topOffset = (navbar ? navbar.offsetHeight : 0) + 32;
      let current = tocItems[0];
      for (const item of tocItems) {
        if (item.heading.getBoundingClientRect().top <= topOffset) current = item;
        else break;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        current = tocItems[tocItems.length - 1];
      }
      setActiveItem(current);
    }

    function scheduleTocUpdate() {
      if (tocTicking) return;
      tocTicking = true;
      requestAnimationFrame(updateActiveItem);
    }

    tocItems.forEach(item => {
      item.link.addEventListener('click', event => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        item.heading.scrollIntoView({
          behavior: reduceMotion.matches ? 'auto' : 'smooth',
          block: 'start'
        });
        if (location.hash !== item.link.hash) history.pushState(null, '', item.link.href);
        setActiveItem(item);
      });
    });

    syncTocMode();
    updateActiveItem();
    wideToc.addEventListener('change', () => {
      syncTocMode();
      scheduleTocUpdate();
    });
    window.addEventListener('scroll', scheduleTocUpdate, { passive: true });
    window.addEventListener('resize', scheduleTocUpdate);
    window.addEventListener('load', scheduleTocUpdate, { once: true });
  }

});
