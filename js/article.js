// Decode percent escapes without turning literal + in existing article links into spaces.
function getArticleFilename(search) {
    const value = search.replace(/^\?/, '').split('&').find(part => part.startsWith('article='));
    if (!value) return null;
    try {
        const filename = decodeURIComponent(value.slice('article='.length));
        return filename.endsWith('.md') && !/[\\/\u0000-\u001f]/.test(filename) && filename !== '..md' ? filename : null;
    } catch {
        return null;
    }
}

async function loadArticle() {
    const content = document.querySelector('#article-content');
    if (!content) return;
    const status = document.querySelector('#article-status');
    const filename = getArticleFilename(window.location.search);
    if (!filename) {
        status.textContent = '글 주소를 확인해 주세요. 위의 모든 글에서 다시 선택할 수 있습니다.';
        return;
    }
    const source = `articles/${encodeURIComponent(filename)}`;
    try {
        const response = await fetch(source);
        if (!response.ok) throw new Error('Article unavailable');
        const text = await response.text();
        const markdown = document.createElement('md-block');
        markdown.className = 'markdown-body';
        markdown.textContent = text;
        const title = filename.replace(/\.md$/, '');
        document.title = `${title} · DYGames`;
        content.replaceChildren(markdown);
    } catch {
        status.textContent = '글을 불러오지 못했습니다. 주소를 확인하거나 잠시 후 다시 시도해 주세요.';
    }
}

// Rendering has its own event; observing highlighting mutations can repeat expensive work.
document.querySelector('main').addEventListener('md-render', event => {
    if (window.hljs) {
        event.target.querySelectorAll('pre code:not([data-highlighted])').forEach(block => hljs.highlightElement(block));
    }
});

// Closed details should not fetch or render documents and their embedded media.
document.querySelectorAll('.document-details').forEach(details => {
    details.addEventListener('toggle', () => {
        if (!details.open) return;
        const markdown = details.querySelector('md-block[data-src]');
        if (!markdown) return;
        markdown.setAttribute('src', markdown.dataset.src);
        markdown.removeAttribute('data-src');
    });
});
loadArticle();
