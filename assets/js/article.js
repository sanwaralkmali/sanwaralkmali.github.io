// Article Page System - Vanilla JS

// --- Config ---
const RELATED_ARTICLES = [
  { title: 'How Coding Makes Math Fun', url: 'article.html?article=howCodingMath' },
  { title: 'Real-World Math Skills for Teens', url: 'article.html?article=realWorldMath' },
  { title: 'Why Problem Solving Matters', url: 'article.html?article=problemSolving' },
];

// --- Utility: Get Article Name from URL ---
function getArticleName() {
  const path = window.location.pathname;
  const match = path.match(/\/articles\/(\w+)/);
  if (match) return match[1];
  // fallback to query param for dev/testing
  const params = new URLSearchParams(window.location.search);
  return params.get('article') || 'whyMath';
}

// --- Utility: Reading Time ---
function estimateReadingTime(text) {
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

// --- Utility: Escape HTML ---
function escapeHTML(str) {
  return str.replace(/[&<>"']/g, function(tag) {
    const charsToReplace = {
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    };
    return charsToReplace[tag] || tag;
  });
}

// --- Markdown Parser (basic, extendable) ---
function parseMarkdown(md) {
  // Robustly match the 'Math is boring' block (curly/straight quotes, flexible whitespace)
  const boringBlockRegex = /[“"]Math is boring and hard\.[”"]?\s*[“"]I[’']m never gonna use this in real life\.[”"]?\s*[“"]I[’']m bad at math\.[”"]?\s*[“"]Math is just not my thing\.[”"]?\s*And to be honest\?\s*You[’']re not wrong\./m;
  if (boringBlockRegex.test(md)) {
    md = md.replace(boringBlockRegex, function() {
      return `<figure class="figure-row">
        <img src="${ARTICLE_IMAGES['Math is boring']}" alt="Math is boring">
        <div class="figure-text">
          <ul>
            <li>Math is boring and hard.</li>
            <li>“I’m never gonna use this in real life.”</li>
            <li>“I’m bad at math.”</li>
            <li>“Math is just not my thing.”</li>
          </ul>
        </div>
      </figure>
      <div style="margin:1.2rem 0 2rem 0;font-size:1.1em;text-align:center;"><strong>And to be honest?</strong><br>You’re not wrong.</div>`;
    });
  } else {
    // Fallback: insert the image after the first occurrence of 'Math is boring and hard.'
    md = md.replace(/([“"]?Math is boring and hard\.[”"]?)/, function(match) {
      return `<figure class="figure-row"><img src="${ARTICLE_IMAGES['Math is boring']}" alt="Math is boring"><div class="figure-text">${match}</div></figure>`;
    });
    console.warn('Could not match the full "math is boring" block. Inserted image after first occurrence.');
  }

  // Images (custom: insert at specific headings)
  md = md.replace(/### (Math trains your brain to think\.)/g, (m, t) => {
    return `<h3>${t}</h3><figure><img src="${ARTICLE_IMAGES['Math trains your brain to think']}" alt="${t}"><figcaption>${t}</figcaption></figure>`;
  });

  // Headings
  md = md.replace(/^# (.*)$/gm, '<h1>$1</h1>');
  md = md.replace(/^## (.*)$/gm, '<h2>$1</h2>');
  md = md.replace(/^### (.*)$/gm, '<h3>$1</h3>');

  // Horizontal rule
  md = md.replace(/^---$/gm, '<hr>');

  // Blockquotes
  md = md.replace(/^> (.*)$/gm, '<blockquote>$1</blockquote>');

  // Bold/Italic
  md = md.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  md = md.replace(/\*([^*]+)\*/g, '<em>$1</em>');

  // Inline code
  md = md.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Code blocks
  md = md.replace(/```([\s\S]*?)```/g, function(_, code) {
    return `<pre><code>${escapeHTML(code)}</code></pre>`;
  });

  // Lists
  md = md.replace(/\n\* (.+)/g, '<ul><li>$1</li></ul>');
  md = md.replace(/\n\d+\. (.+)/g, '<ol><li>$1</li></ol>');
  md = md.replace(/<\/ul>\s*<ul>/g, ''); // Merge adjacent lists
  md = md.replace(/<\/ol>\s*<ol>/g, '');

  // Callout (custom: lines starting with !)
  md = md.replace(/^! (.*)$/gm, '<div class="callout">$1</div>');

  // Pull quote (custom: lines starting with >>)
  md = md.replace(/^>> (.*)$/gm, '<div class="pullquote">$1</div>');

  // Paragraphs
  md = md.replace(/(^|\n)([^<\n][^\n]*)/g, function(_, br, text) {
    if (/^\s*$/.test(text) || /<(h\d|ul|ol|li|blockquote|pre|img|figure|div|hr)/.test(text)) return br + text;
    return br + '<p>' + text + '</p>';
  });

  // --- Figure + Paragraph Flex Layout ---
  // Find <figure>...</figure><p>...</p> and wrap in .figure-row
  md = md.replace(/(<figure>[\s\S]*?<\/figure>)\s*<p>([\s\S]*?)<\/p>/g, function(_, fig, para) {
    return `<figure class="figure-row">${fig.replace(/<figure>|<\/figure>/g, '')}<div class="figure-text">${para}</div></figure>`;
  });

  return md;
}

// --- Render Article ---
function renderArticle(md) {
  // Title, author, date
  document.getElementById('article-title').textContent = ARTICLE_META.title;
  document.getElementById('article-author').textContent = ARTICLE_META.author;
  document.getElementById('article-date').textContent = (new Date(ARTICLE_META.date)).toLocaleDateString();

  // Reading time (short, subtle)
  const mins = estimateReadingTime(md);
  document.getElementById('reading-time').textContent = `· ${mins} min read`;

  // Markdown to HTML
  const html = parseMarkdown(md);
  document.getElementById('article-content').innerHTML = html;

  // Animate in
  setTimeout(() => {
    document.getElementById('article-content').querySelectorAll('[data-animate]').forEach(el => {
      el.classList.add('visible');
    });
  }, 100);
}

// --- Social Sharing ---
function setupSocialSharing() {
  const url = window.location.href;
  const title = ARTICLE_META.title;
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
  };
  document.querySelectorAll('.share-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const platform = btn.getAttribute('data-platform');
      window.open(shareLinks[platform], '_blank', 'noopener');
    });
  });
}

// --- Related Articles ---
function renderRelatedArticles() {
  const container = document.getElementById('related-list');
  RELATED_ARTICLES.forEach(article => {
    const card = document.createElement('div');
    card.className = 'related-article-card';
    card.tabIndex = 0;
    card.setAttribute('role', 'link');
    card.setAttribute('aria-label', article.title);
    card.textContent = article.title;
    card.onclick = () => window.location.href = article.url;
    container.appendChild(card);
  });
}

// --- Load Article ---
const articleName = getArticleName();
const ARTICLE_PATH = `assets/articles/${articleName}.txt`;
const ARTICLE_IMAGES = {
  'Math is boring': `assets/articles/${articleName}/Math is boring.png`,
  'Math trains your brain to think': `assets/articles/${articleName}/Math trains you brain to think.png`,
};
const ARTICLE_META = {
  title: 'So… Why Are We Even Learning This?',
  author: 'Salah Alkmali',
  date: '2024-06-21',
};

fetch(ARTICLE_PATH)
  .then(res => res.text())
  .then(md => {
    renderArticle(md);
    setupSocialSharing();
    renderRelatedArticles();
  }); 