function getParams() {
    var url = window.location.search.replace('?', '');
    var params = {};
    var urlArray = url.split('&');

    for (var i in urlArray) {
        var param = urlArray[i].split('=');
        params[param[0]] = param[1];
    }
    return params;
}

const params = getParams();

function init() {
    var path = '../articles/'
    let column =
        `<md-block class="markdown-body" src="${path + params["article"]}"></md-block>`
    let div = document.createElement('div')
    div.innerHTML = column
    document.querySelector("#h2").append(div)
}

window.onload = init