(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('#theme-toggle');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  try {
    const saved = localStorage.getItem('depart-now-theme');
    if (saved === 'dark' || saved === 'light') root.dataset.theme = saved;
  } catch { /* Storage may be unavailable in privacy mode. */ }

  function updateThemeControl() {
    const dark = (root.dataset.theme || (systemTheme.matches ? 'dark' : 'light')) === 'dark';
    themeButton.textContent = dark ? '日间' : '夜间';
    themeButton.setAttribute('aria-label', dark ? '切换浅色模式' : '切换深色模式');
    themeButton.setAttribute('aria-pressed', String(dark));
    document.querySelector('meta[name="theme-color"]').content = dark ? '#17251e' : '#f3f5f0';
  }
  themeButton.addEventListener('click', () => {
    const dark = (root.dataset.theme || (systemTheme.matches ? 'dark' : 'light')) === 'dark';
    root.dataset.theme = dark ? 'light' : 'dark';
    try { localStorage.setItem('depart-now-theme', root.dataset.theme); } catch { /* Keep the current page usable. */ }
    updateThemeControl();
  });
  systemTheme.addEventListener('change', updateThemeControl);
  updateThemeControl();

  const stops = {
    dolomites: { title: '多洛米蒂', location: 'ITALY / DOLOMITES', date: '2026.09.26 - 09.28', alt: '夕阳下的富内斯山谷与多洛米蒂群峰', description: '取车后一路开进多洛米蒂，第一天下午赶去富内斯山谷看日落。第二天去了刀锋山和休斯高原，群山、草地和缆车窗外的风景，成了这趟旅程最想再看的画面。下次想给这里多留几天。' },
    florence: { title: '佛罗伦萨', location: 'ITALY / FIRENZE', date: '2026.09.28 - 09.30', alt: '暮色中的佛罗伦萨圣母百花大教堂', description: '在佛罗伦萨还车后，住在景区附近，开始用脚步认识这座城市。圣母百花大教堂周围的街巷适合慢慢逛，艺术馆里的作品也值得听着讲解细看。还有巴师傅的一顿川菜，让旅途多了一点熟悉的味道。' },
    rome: { title: '罗马', location: 'ITALY / ROMA', date: '2026.09.30 - 10.02', alt: '晴空下的罗马斗兽场', description: '从佛罗伦萨坐火车来到罗马。斗兽场、博尔盖塞美术馆，以及行程中去到的梵蒂冈，留下了很多关于历史与艺术的记忆。走到斗兽场前，才真正感受到两千年的时光有多近。' },
    paris: { title: '巴黎', location: 'FRANCE / PARIS', date: '2026.10.02 - 10.05', alt: '树木环绕的巴黎埃菲尔铁塔', description: '从罗马飞到巴黎，旅途从意大利转向法国。相册里留下了卢浮宫的雕塑、蒙娜丽莎和埃菲尔铁塔，也记住了 La Jacobine 的一顿法餐。最后一晚住到奥利机场附近，第二天一早飞回米兰。' },
    milan: { title: '米兰', location: 'ITALY / MILANO', date: '抵达 2026.09.25 · 返回 2026.10.05', alt: '蓝天白云下的米兰大教堂', description: '这段旅程从米兰开始，也在米兰收尾。10 月 5 日从巴黎飞回后，把白天留给米兰市区。那天天气很好，大教堂和教堂顶在照片里像一幅画，成为回国前最后一份旅行记忆。' }
  };

  const dialog = document.querySelector('#story-dialog');
  let lastTrigger;
  document.querySelectorAll('[data-stop]').forEach(button => {
    button.addEventListener('click', () => {
      const key = button.dataset.stop;
      const stop = stops[key];
      if (!stop) return;
      lastTrigger = button;
      const image = document.querySelector('#dialog-image');
      image.src = `assets/${key}.jpg`;
      image.alt = stop.alt;
      document.querySelector('#dialog-location').textContent = stop.location;
      document.querySelector('#dialog-title').textContent = stop.title;
      document.querySelector('#dialog-description').textContent = stop.description;
      document.querySelector('#dialog-date').textContent = stop.date;
      dialog.showModal();
      document.body.classList.add('modal-open');
    });
  });
  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    lastTrigger?.focus({ preventScroll: true });
  });
})();
