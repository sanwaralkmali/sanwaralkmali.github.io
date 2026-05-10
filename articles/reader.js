// Reading progress bar — sets --progress (0..1) on .reading-progress on scroll.
(function () {
  var bar = document.querySelector('.reading-progress');
  if (!bar) return;

  function update() {
    var doc = document.documentElement;
    var max = (doc.scrollHeight - window.innerHeight) || 1;
    var pct = Math.min(1, Math.max(0, window.scrollY / max));
    bar.style.setProperty('--progress', pct.toFixed(4));
  }

  var pending = false;
  function onScroll() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(function () { update(); pending = false; });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
})();

// Theme toggle on the article top bar — mirrors site chrome behavior.
// Theme is set early via inline <head> script to avoid FOUC; this only handles clicks.
(function () {
  var btn = document.querySelector('.article-topbar__theme');
  if (!btn) return;

  var root = document.documentElement;
  var STORAGE_KEY = 'theme';

  function getCurrentTheme() {
    return root.getAttribute('data-theme') ||
      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  }

  function updateIcon(theme) {
    btn.innerHTML = theme === 'light'
      ? '<i class="fas fa-moon"></i>'
      : '<i class="fas fa-sun"></i>';
    btn.setAttribute('aria-label',
      theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
  }

  updateIcon(getCurrentTheme());

  btn.addEventListener('click', function () {
    var next = getCurrentTheme() === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch (e) { /* private mode */ }
    updateIcon(next);
  });
})();
