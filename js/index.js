function init() {
    initArticleList()
}

function initArticleList() {
    var path = '../articles/'
    fetch(path + 'articles.txt')
        .then(function (response) {
            return response.text()
        })
        .then(function (txt) {
            txt.split("\n").forEach((element, index) => {
                let column =
                    `<td><a href="${"/article.html?article=" + element}">${element.slice(0, -3)}</a></td>`
                let tr = document.createElement('tr')
                tr.innerHTML = column
                document.querySelector("#h2 > table").append(tr)
            });
        });
}

window.onload = init