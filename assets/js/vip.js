document.addEventListener('DOMContentLoaded', function () {
  const AID = (window.AID_BASE || '').replace(/\/+$/, '');
  const elements = {
    app: document.getElementById('vip-app'),
    intro: document.getElementById('vip-intro'),
    flow: document.getElementById('vip-flow'),
    authSection: document.getElementById('vip-auth-section'),
    accountNumber: document.querySelector('#vip-account-section .vip-section-number'),
    resourcesSection: document.getElementById('vip-resources-section'),
    resourcesNumber: document.querySelector('#vip-resources-section .vip-section-number'),
    loading: document.getElementById('vip-loading'),
    login: document.getElementById('vip-login'),
    loginForm: document.getElementById('vip-login-form'),
    email: document.getElementById('vip-email'),
    requestButton: document.getElementById('vip-request-button'),
    requestMessage: document.getElementById('vip-request-message'),
    pageMessage: document.getElementById('vip-page-message'),
    accountEmpty: document.getElementById('vip-account-empty'),
    account: document.getElementById('vip-account'),
    accountEmail: document.getElementById('vip-account-email'),
    accountStatus: document.getElementById('vip-account-status'),
    accountDescription: document.getElementById('vip-account-description'),
    logoutButton: document.getElementById('vip-logout-button'),
    resourcesLocked: document.getElementById('vip-resources-locked'),
    resources: document.getElementById('vip-resources'),
    resourceMessage: document.getElementById('vip-resource-message'),
    resourcesRetry: document.getElementById('vip-resources-retry'),
    resourcesEmpty: document.getElementById('vip-resources-empty'),
    resourceList: document.getElementById('vip-resource-list'),
  };

  const statusText = {
    active: {
      label: 'VIP 已生效',
      description: '会员状态有效，可下载下方资源。',
    },
    pending: {
      label: '待开通',
      description: '邮箱已验证，VIP 尚未开通，暂不能下载资源。',
    },
    disabled: {
      label: '已停用',
      description: '当前 VIP 已停用，暂不能下载资源。',
    },
    expired: {
      label: '已过期',
      description: '当前 VIP 已过期，暂不能下载资源。',
    },
  };

  let sessionVersion = 0;
  let currentStatus = 'loading';
  let cooldownTimer = null;
  let cooldownRemaining = 0;
  let loginRedirect = null;

  function setMessage(element, text, type) {
    element.textContent = text || '';
    element.hidden = !text;
    if (text && type) element.dataset.type = type;
    else delete element.dataset.type;
  }

  function clearResourceView() {
    setMessage(elements.resourceMessage, '');
    elements.resourcesRetry.hidden = true;
    elements.resourcesEmpty.hidden = true;
    elements.resourceList.hidden = true;
    elements.resourceList.textContent = '';
  }

  function setAuthenticatedLayout(authenticated) {
    elements.app.classList.toggle('is-authenticated', authenticated);
    elements.intro.hidden = authenticated;
    elements.flow.hidden = authenticated;
    elements.authSection.hidden = authenticated;
    elements.accountNumber.hidden = authenticated;
    elements.resourcesNumber.hidden = authenticated;
  }

  function renderLoggedOut() {
    currentStatus = 'signed-out';
    setAuthenticatedLayout(false);
    elements.resourcesSection.hidden = false;
    elements.loading.hidden = true;
    elements.login.hidden = false;
    elements.account.hidden = true;
    elements.accountDescription.hidden = true;
    elements.accountEmpty.textContent = '验证邮箱后，这里会显示会员状态。';
    elements.accountEmpty.hidden = false;
    elements.resources.hidden = true;
    elements.resourcesLocked.textContent = 'VIP 生效后，这里会显示可下载资源。';
    elements.resourcesLocked.hidden = false;
    clearResourceView();
  }

  function renderAuthenticated(data, version) {
    const knownStatus = Object.prototype.hasOwnProperty.call(statusText, data.status);
    const status = knownStatus ? statusText[data.status] : {
      label: '状态不可用',
      description: '暂时无法识别会员状态，请稍后刷新页面重试。',
    };

    currentStatus = knownStatus ? data.status : 'unknown';
    setAuthenticatedLayout(true);
    elements.loading.hidden = true;
    elements.login.hidden = true;
    elements.accountEmpty.hidden = true;
    elements.account.hidden = false;
    elements.accountEmail.textContent = data.email;
    elements.accountStatus.textContent = status.label;
    elements.accountStatus.dataset.status = knownStatus ? data.status : 'unknown';
    elements.accountDescription.textContent = status.description;
    elements.accountDescription.hidden = currentStatus === 'active';
    clearResourceView();

    if (currentStatus === 'active') {
      elements.resourcesSection.hidden = false;
      elements.resourcesLocked.hidden = true;
      elements.resources.hidden = false;
      loadDownloads(version);
    } else {
      elements.resourcesSection.hidden = true;
      elements.resources.hidden = true;
      elements.resourcesLocked.hidden = true;
    }
  }

  async function api(path, options = {}) {
    const headers = Object.assign({ Accept: 'application/json' }, options.headers || {});
    if (options.body && !headers['Content-Type']) headers['Content-Type'] = 'application/json';

    const response = await fetch(AID + path, Object.assign({}, options, {
      headers,
      credentials: 'include',
    }));
    const text = await response.text();
    let data = null;
    let parsed = false;

    if (text) {
      try {
        data = JSON.parse(text);
        parsed = true;
      } catch (error) {
        data = null;
      }
    }

    if (!response.ok) {
      const error = new Error('API request failed');
      error.status = response.status;
      throw error;
    }
    if (text && !parsed) throw new Error('Invalid API response');
    return data;
  }

  function handleSessionExpired() {
    sessionVersion += 1;
    renderLoggedOut();
    setMessage(elements.pageMessage, '登录状态已失效，请重新验证邮箱。', 'error');
  }

  async function loadMe() {
    const version = ++sessionVersion;
    currentStatus = 'loading';
    elements.app.setAttribute('aria-busy', 'true');
    elements.loading.hidden = false;
    elements.login.hidden = true;
    elements.account.hidden = true;
    elements.accountEmpty.textContent = '正在读取会员状态…';
    elements.accountEmpty.hidden = false;
    elements.resourcesSection.hidden = false;
    elements.resources.hidden = true;
    elements.resourcesLocked.textContent = '读取会员状态后，这里会显示可下载资源。';
    elements.resourcesLocked.hidden = false;
    clearResourceView();

    try {
      const data = await api('/api/vip/me');
      if (version !== sessionVersion) return;
      if (!data || typeof data.authenticated !== 'boolean') throw new Error('Invalid member response');

      if (!data.authenticated) {
        renderLoggedOut();
        if (loginRedirect === 'success') {
          setMessage(elements.pageMessage, '未能建立登录会话，请重新获取登录邮件。', 'error');
        }
      } else if (typeof data.email !== 'string' || !data.email) {
        throw new Error('Invalid member identity');
      } else {
        renderAuthenticated(data, version);
        if (loginRedirect === 'success') {
          setMessage(elements.pageMessage, '登录成功，已读取会员状态。', 'success');
        }
      }
    } catch (error) {
      if (version !== sessionVersion) return;
      renderLoggedOut();
      setMessage(elements.pageMessage, '暂时无法检查登录状态，请检查网络后刷新页面重试。', 'error');
    } finally {
      if (version === sessionVersion) elements.app.setAttribute('aria-busy', 'false');
      loginRedirect = null;
    }
  }

  function updateCooldown() {
    if (cooldownRemaining > 0) {
      elements.requestButton.disabled = true;
      elements.requestButton.textContent = `重新发送（${cooldownRemaining} 秒）`;
      return;
    }

    if (cooldownTimer) clearInterval(cooldownTimer);
    cooldownTimer = null;
    elements.requestButton.disabled = false;
    elements.requestButton.textContent = '发送登录邮件';
  }

  function startCooldown() {
    if (cooldownTimer) clearInterval(cooldownTimer);
    cooldownRemaining = 60;
    updateCooldown();
    cooldownTimer = setInterval(function () {
      cooldownRemaining -= 1;
      updateCooldown();
    }, 1000);
  }

  async function requestLogin(event) {
    event.preventDefault();
    if (elements.requestButton.disabled) return;
    if (!elements.loginForm.checkValidity()) {
      elements.loginForm.reportValidity();
      return;
    }

    const email = elements.email.value.trim();
    elements.requestButton.disabled = true;
    elements.requestButton.textContent = '正在发送…';
    setMessage(elements.requestMessage, '正在请求发送登录邮件…');

    try {
      await api('/api/vip/auth/request', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
      setMessage(
        elements.requestMessage,
        '如果该邮箱可以接收登录邮件，我们已发送登录链接。请检查收件箱和垃圾邮件文件夹。',
        'success'
      );
      startCooldown();
    } catch (error) {
      if (error.status === 429) {
        setMessage(elements.requestMessage, '请求过于频繁，请 1 分钟后再试。', 'error');
        startCooldown();
      } else if (error.status === 503) {
        setMessage(elements.requestMessage, '邮件服务暂时不可用，请稍后再试。', 'error');
      } else if (error.status === 400 || error.status === 422) {
        setMessage(elements.requestMessage, '邮箱地址未通过校验，请检查后重试。', 'error');
      } else {
        setMessage(elements.requestMessage, '发送失败，请检查网络后稍后再试。', 'error');
      }
    } finally {
      if (cooldownRemaining <= 0) {
        elements.requestButton.disabled = false;
        elements.requestButton.textContent = '发送登录邮件';
      }
    }
  }

  async function logout() {
    if (elements.logoutButton.disabled) return;
    elements.logoutButton.disabled = true;
    setMessage(elements.pageMessage, '正在退出登录…');

    try {
      await api('/api/vip/auth/logout', { method: 'POST' });
      sessionVersion += 1;
      renderLoggedOut();
      setMessage(elements.pageMessage, '已退出登录。', 'success');
    } catch (error) {
      if (error.status === 401) {
        sessionVersion += 1;
        renderLoggedOut();
        setMessage(elements.pageMessage, '当前登录状态已结束。', 'success');
      } else {
        setMessage(elements.pageMessage, '退出失败，请检查网络后稍后再试。', 'error');
      }
    } finally {
      elements.logoutButton.disabled = false;
    }
  }

  function formatSize(value) {
    if (typeof value === 'string' && value.trim() && !Number.isFinite(Number(value))) {
      return value.trim();
    }
    const size = Number(value);
    if (!Number.isFinite(size) || size < 0) return '';
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let amount = size;
    let unit = 0;
    while (amount >= 1024 && unit < units.length - 1) {
      amount /= 1024;
      unit += 1;
    }
    const digits = unit === 0 || amount >= 10 ? 0 : 1;
    return `${amount.toFixed(digits)} ${units[unit]}`;
  }

  function createResourceItem(item) {
    const listItem = document.createElement('li');
    listItem.className = 'vip-resource-item';

    const header = document.createElement('div');
    header.className = 'vip-resource-header';
    const name = document.createElement('h3');
    name.className = 'vip-resource-name';
    name.textContent = item.name;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'vip-button vip-resource-download';
    button.textContent = '下载';
    button.setAttribute('aria-label', `下载 ${item.name}`);
    button.addEventListener('click', function () {
      startDownload(item, button);
    });

    header.append(name, button);
    listItem.appendChild(header);

    if (typeof item.description === 'string' && item.description) {
      const description = document.createElement('p');
      description.className = 'vip-resource-description';
      description.textContent = item.description;
      listItem.appendChild(description);
    }

    const meta = [formatSize(item.size), typeof item.mime === 'string' ? item.mime : '']
      .filter(Boolean)
      .join(' · ');
    if (meta) {
      const metaElement = document.createElement('p');
      metaElement.className = 'vip-resource-meta';
      metaElement.textContent = meta;
      listItem.appendChild(metaElement);
    }

    return listItem;
  }

  async function loadDownloads(version) {
    if (version !== sessionVersion || currentStatus !== 'active') return;
    clearResourceView();
    elements.resources.setAttribute('aria-busy', 'true');
    setMessage(elements.resourceMessage, '正在加载资源…');

    try {
      const data = await api('/api/vip/downloads');
      if (version !== sessionVersion || currentStatus !== 'active') return;
      if (!Array.isArray(data)) throw new Error('Invalid download list');

      const valid = data.every(function (item) {
        const validId = typeof item.dl_id === 'number' || typeof item.dl_id === 'string';
        return item && validId && String(item.dl_id).length > 0 && typeof item.name === 'string' && item.name;
      });
      if (!valid) throw new Error('Invalid download item');

      setMessage(elements.resourceMessage, '');
      if (data.length === 0) {
        elements.resourcesEmpty.hidden = false;
        return;
      }

      const fragment = document.createDocumentFragment();
      data.forEach(function (item) {
        fragment.appendChild(createResourceItem(item));
      });
      elements.resourceList.appendChild(fragment);
      elements.resourceList.hidden = false;
    } catch (error) {
      if (version !== sessionVersion || currentStatus !== 'active') return;
      if (error.status === 401) {
        handleSessionExpired();
        return;
      }

      if (error.status === 403) {
        setMessage(elements.resourceMessage, '当前账号没有资源读取权限，请刷新页面重新检查会员状态。', 'error');
      } else if (error.status === 429) {
        setMessage(elements.resourceMessage, '请求过于频繁，请稍后再试。', 'error');
      } else if (error.status === 503) {
        setMessage(elements.resourceMessage, '资源服务暂时不可用，请稍后再试。', 'error');
      } else {
        setMessage(elements.resourceMessage, '资源列表加载失败，请检查网络后重试。', 'error');
      }
      elements.resourcesRetry.hidden = false;
    } finally {
      if (version === sessionVersion) elements.resources.setAttribute('aria-busy', 'false');
    }
  }

  async function startDownload(item, button) {
    if (button.disabled || currentStatus !== 'active') return;
    const version = sessionVersion;
    button.disabled = true;
    button.textContent = '准备下载…';
    setMessage(elements.resourceMessage, '正在获取下载链接…');

    try {
      const data = await api(`/api/vip/downloads/${encodeURIComponent(item.dl_id)}/ticket`, {
        method: 'POST',
      });
      if (version !== sessionVersion || currentStatus !== 'active') return;
      if (!data || typeof data.url !== 'string' || !data.url.startsWith('/api/vip/download/file?token=')) {
        throw new Error('Invalid download ticket');
      }

      const link = document.createElement('a');
      link.href = AID + data.url;
      link.hidden = true;
      link.setAttribute('aria-hidden', 'true');
      link.setAttribute('tabindex', '-1');
      document.body.appendChild(link);
      link.click();
      link.remove();
      setMessage(elements.resourceMessage, '已开始下载。若浏览器没有响应，请稍后重试。', 'success');
    } catch (error) {
      if (version !== sessionVersion || currentStatus !== 'active') return;
      if (error.status === 401) {
        handleSessionExpired();
      } else if (error.status === 403) {
        setMessage(elements.pageMessage, '下载权限可能已变化，正在重新检查会员状态…', 'error');
        loadMe();
      } else if (error.status === 404) {
        setMessage(elements.resourceMessage, '资源不可用或已下架，请重新加载资源列表。', 'error');
        elements.resourcesRetry.hidden = false;
      } else if (error.status === 429) {
        setMessage(elements.resourceMessage, '操作过于频繁，请稍后再试。', 'error');
      } else if (error.status === 503) {
        setMessage(elements.resourceMessage, '下载服务暂时不可用，请稍后再试。', 'error');
      } else {
        setMessage(elements.resourceMessage, '下载链接获取失败，请检查网络后重试。', 'error');
      }
    } finally {
      button.disabled = false;
      button.textContent = '下载';
    }
  }

  function readLoginRedirect() {
    const url = new URL(window.location.href);
    const result = url.searchParams.get('login');
    if (result === null) return null;

    url.searchParams.delete('login');
    window.history.replaceState(null, '', url.pathname + url.search + url.hash);
    return result === 'success' || result === 'invalid' ? result : null;
  }

  elements.loginForm.addEventListener('submit', requestLogin);
  elements.logoutButton.addEventListener('click', logout);
  elements.resourcesRetry.addEventListener('click', function () {
    loadDownloads(sessionVersion);
  });

  loginRedirect = readLoginRedirect();
  if (loginRedirect === 'success') {
    setMessage(elements.pageMessage, '邮件链接已确认，正在读取会员状态…', 'success');
  } else if (loginRedirect === 'invalid') {
    setMessage(elements.pageMessage, '登录链接无效、已使用或已过期，请重新获取。', 'error');
  }

  if (!AID) {
    elements.loading.hidden = true;
    elements.app.setAttribute('aria-busy', 'false');
    setMessage(elements.pageMessage, '服务地址未配置，暂时无法验证邮箱。', 'error');
    return;
  }

  loadMe();
});
