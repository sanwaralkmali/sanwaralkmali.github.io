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

// Newsletter subscribe — Buttondown integration.
// Card hides itself if the username is still the YOUR_USERNAME placeholder,
// so the page never shows a broken form.
(function () {
  var cards = document.querySelectorAll('.subscribe-card');
  if (!cards.length) return;

  cards.forEach(function (card) {
    var user = card.getAttribute('data-buttondown-user');
    if (!user || user === 'YOUR_USERNAME') {
      card.style.display = 'none';
      return;
    }

    var form = card.querySelector('form');
    var button = card.querySelector('.subscribe-card__btn');
    var finer = card.querySelector('.subscribe-card__finer');
    if (!form || !button) return;

    var origLabel = button.textContent;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var emailInput = form.querySelector('input[type="email"]');
      var email = emailInput && emailInput.value.trim();
      if (!email) return;

      button.disabled = true;
      button.textContent = 'Subscribing…';

      var fd = new FormData();
      fd.append('email', email);
      fd.append('embed', '1');

      fetch('https://buttondown.email/api/emails/embed-subscribe/' + encodeURIComponent(user), {
        method: 'POST',
        body: fd,
        mode: 'no-cors'
      }).then(function () {
        // no-cors hides the response, but Buttondown sends a confirmation email regardless
        form.style.display = 'none';
        if (finer) {
          finer.textContent = '✓ Almost there — check your inbox to confirm.';
          finer.classList.add('subscribe-card__finer--success');
        }
      }).catch(function () {
        button.disabled = false;
        button.textContent = origLabel;
        if (finer) finer.textContent = 'Something went wrong. Please try again.';
      });
    });
  });
})();
