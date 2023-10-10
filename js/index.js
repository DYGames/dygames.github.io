function init() {
    initArticleList()
}

function initArticleList() {
    fetch('articles/articles.json')
        .then(function (response) {
            return response.json()
        })
        .then(function (json) {
            json.data.forEach((element, index) => {
                let column =
                    `<td><a href="${"/article.html?article=" + element.title}">${element.name || element.title.slice(0, -3)}</a></td>`
                let tr = document.createElement('tr')
                tr.innerHTML = column
                document.querySelector("#h2 > table").append(tr)
            });
        });
}

window.onload = init