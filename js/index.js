const list = document.querySelector('#article-list');
const status = document.querySelector('#article-status');
const search = document.querySelector('#article-search');
const count = document.querySelector('#article-count');
const heading = document.querySelector('.list-heading h2');
let articles = [];
let category = '전체';

function renderArticles() {
    const query = search.value.trim().toLocaleLowerCase();
    const matches = articles.filter(article =>
        (category === '전체' || article.category === category) &&
        `${article.name || article.title} ${article.summary} ${article.category}`.toLocaleLowerCase().includes(query)
    );
    list.replaceChildren();
    for (const article of matches) {
        const item = document.createElement('li');
        const link = document.createElement('a');
        link.className = 'article-row';
        link.href = `article.html?article=${encodeURIComponent(article.title)}`;
        const topic = document.createElement('p');
        topic.className = 'meta';
        topic.textContent = article.category;
        const content = document.createElement('div');
        const title = document.createElement('h3');
        title.textContent = article.name || article.title.replace(/\.md$/, '');
        const summary = document.createElement('p');
        summary.textContent = article.summary;
        const arrow = document.createElement('span');
        arrow.className = 'row-arrow';
        arrow.textContent = '↗';
        arrow.setAttribute('aria-hidden', 'true');
        content.append(title, summary);
        link.append(topic, content, arrow);
        item.append(link);
        list.append(item);
    }
    heading.textContent = query ? '검색 결과' : category === '전체' ? '모든 글' : category;
    count.textContent = `${matches.length}개의 글`;
    status.hidden = matches.length > 0;
    status.textContent = '일치하는 글이 없습니다. 다른 검색어나 주제를 선택해 보세요.';
}

for (const button of document.querySelectorAll('[data-category]')) {
    button.addEventListener('click', () => {
        category = button.dataset.category;
        for (const filter of document.querySelectorAll('[data-category]')) {
            filter.setAttribute('aria-pressed', String(filter === button));
        }
        renderArticles();
    });
}
search.addEventListener('input', renderArticles);

fetch('articles/articles.json')
    .then(response => {
        if (!response.ok) throw new Error('Article list unavailable');
        return response.json();
    })
    .then(json => {
        articles = json.data;
        renderArticles();
    })
    .catch(() => {
        status.hidden = false;
        status.textContent = '글 목록을 불러오지 못했습니다. 잠시 후 새로고침해 주세요.';
    });
