const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

// A small DOM stub checks filtering and safe link construction without browser dependencies.
function element() {
    return {
        children: [], dataset: {}, attributes: {}, listeners: {}, value: '', hidden: false,
        append(...children) { this.children.push(...children); },
        replaceChildren(...children) { this.children = children; },
        setAttribute(name, value) { this.attributes[name] = value; },
        addEventListener(name, listener) { this.listeners[name] = listener; }
    };
}
async function check() {
    const data = JSON.parse(fs.readFileSync('articles/articles.json'));
    const elements = Object.fromEntries(['#article-list', '#article-status', '#article-search', '#article-count', '.list-heading h2'].map(id => [id, element()]));
    const filters = ['전체', 'Kotlin', 'Android', '설계·테스트'].map(category => Object.assign(element(), {dataset: {category}}));
    const context = vm.createContext({
        document: {querySelector: id => elements[id], querySelectorAll: () => filters, createElement: element},
        fetch: async () => ({ok: true, json: async () => data})
    });
    vm.runInContext(fs.readFileSync('js/index.js', 'utf8'), context);
    await new Promise(setImmediate);
    assert.equal(elements['#article-list'].children.length, data.data.length);
    for (const article of data.data) {
        assert.ok(fs.existsSync(`articles/${article.title}`));
        assert.ok(filters.some(filter => filter.dataset.category === article.category));
    }
    filters[1].listeners.click();
    assert.equal(elements['#article-list'].children.length, data.data.filter(article => article.category === 'Kotlin').length);
    assert.equal(filters[1].attributes['aria-pressed'], 'true');
    elements['#article-search'].value = 'closure';
    elements['#article-search'].listeners.input();
    assert.equal(elements['#article-list'].children.length, 1);
    assert.equal(decodeURIComponent(elements['#article-list'].children[0].children[0].href.split('=')[1]), 'Kotlin Closure.md');
    elements['#article-search'].value = '없는 검색어';
    elements['#article-search'].listeners.input();
    assert.equal(elements['#article-list'].children.length, 0);
    assert.equal(elements['#article-status'].hidden, false);
    const main = element();
    const details = element();
    const markdown = element();
    markdown.dataset.src = 'articles/portfolio.md';
    markdown.removeAttribute = name => { if (name === 'data-src') delete markdown.dataset.src; };
    details.querySelector = () => markdown.dataset.src ? markdown : null;
    let highlights = 0;
    const code = element();
    const articleContext = vm.createContext({
        window: {hljs: true},
        hljs: {highlightElement: block => { highlights++; block.setAttribute('data-highlighted', 'yes'); }},
        document: {
            querySelector: selector => selector === 'main' ? main : null,
            querySelectorAll: selector => selector === '.document-details' ? [details] : []
        }
    });
    vm.runInContext(fs.readFileSync('js/article.js', 'utf8'), articleContext);
    assert.equal(markdown.attributes.src, undefined, 'Closed details must not load Markdown');
    details.listeners.toggle();
    assert.equal(markdown.attributes.src, undefined);
    details.open = true;
    details.listeners.toggle();
    assert.equal(markdown.attributes.src, 'articles/portfolio.md');
    assert.equal(markdown.dataset.src, undefined);
    details.listeners.toggle();
    assert.equal(markdown.attributes.src, 'articles/portfolio.md');
    const renderEvent = {target: {querySelectorAll: () => code.attributes['data-highlighted'] ? [] : [code]}};
    main.listeners['md-render'](renderEvent);
    main.listeners['md-render'](renderEvent);
    assert.equal(highlights, 1, 'Nested render events must not re-highlight code');
    assert.ok(!fs.readFileSync('js/article.js', 'utf8').includes('MutationObserver'));
    for (const file of ['about.html', 'resume.html']) {
        assert.doesNotMatch(fs.readFileSync(file, 'utf8'), /md-block|<details|js\/article\.js/);
    }
    const portfolio = fs.readFileSync('portfolio.html', 'utf8');
    assert.doesNotMatch(portfolio, /md-block|md-block\.verou|highlight\.js/);
    assert.equal((portfolio.match(/class="project-detail"/g) || []).length, 11);
    assert.doesNotMatch(portfolio, /<details[^>]+class="project-detail"|js\/article\.js/);
    const attachments = [...portfolio.matchAll(/<details class="project-attachments"([^>]*)>([\s\S]*?)<\/details>/g)];
    assert.equal(attachments.length, 4);
    for (const [, attributes, body] of attachments) {
        assert.doesNotMatch(attributes, /\bopen\b/);
        assert.match(body, /<summary>사진·영상<\/summary>/);
        assert.match(body, /<figure/);
    }
    const cards = [...portfolio.matchAll(/<a class="project-card" href="#([^"]+)">([\s\S]*?)<\/a>/g)];
    assert.equal(cards.length, 8);
    for (const [, id, body] of cards) {
        assert.ok(portfolio.includes(`id="${id}"`), `Missing detail: ${id}`);
        assert.ok(!body.includes('<a '), 'Card links must not contain nested links');
        const name = body.match(/<h2>(.*?)<\/h2>/)[1];
        const section = portfolio.match(new RegExp(`<section id="${id}"[\\s\\S]*?<h3[^>]*>(.*?)<\\/h3>`));
        assert.equal(section[1], name);
    }
    assert.equal((portfolio.match(/preload="none"/g) || []).length, 3);
    assert.equal((portfolio.match(/<iframe[^>]+loading="lazy"/g) || []).length, 2);
    for (const article of data.data) {
        const encoded = `?article=${encodeURIComponent(article.title)}`;
        assert.equal(articleContext.getArticleFilename(encoded), article.title);
        assert.equal(articleContext.getArticleFilename(`?article=${article.title}`), article.title);
    }
    for (const invalid of ['', '?article=%', '?article=../resume.md', '?article=%2Ftest.md', '?article=x.html', '?article=x%00.md']) {
        assert.equal(articleContext.getArticleFilename(invalid), null);
    }
    for (const file of ['index.html', 'about.html', 'resume.html', 'portfolio.html', 'article.html']) {
        const html = fs.readFileSync(file, 'utf8');
        assert.equal((html.match(/aria-current="page"/g) || []).length, 1);
        assert.ok(!html.includes('>Music<'));
        assert.ok(html.includes('lang="ko"'));
        for (const [, link] of html.matchAll(/(?:href|src)="([^"?#]+)(?:[?#][^"]*)?"/g)) {
            if (!/^(https?:|mailto:)/.test(link)) assert.ok(fs.existsSync(link), `${file}: ${link}`);
        }
    }
    context.fetch = async () => { throw new Error('offline'); };
    vm.runInContext(fs.readFileSync('js/index.js', 'utf8'), vm.createContext({...context}));
    await new Promise(setImmediate);
    assert.match(elements['#article-status'].textContent, /불러오지 못했습니다/);
    console.log('Passed: navigation, content links, categories, search, empty/error states, and legacy article URLs.');
}
check().catch(error => { console.error(error); process.exitCode = 1; });
