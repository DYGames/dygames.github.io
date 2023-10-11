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
    const path = '../articles/'
    const column = `<md-block class="markdown-body" src="${path + params["article"]}"></md-block>`
    const div = document.createElement('div')
    div.innerHTML = column
    const h2 = document.querySelector("#h2")
    h2.append(div)

    const config = { childList: true, subtree: true };
    const callback = (mutationList, observer) => {
        for (const mutation of mutationList) {
            if (mutation.type === "childList") {
                hljs.highlightAll()
                observer.disconnect()
            }
        }
    };

    const observer = new MutationObserver(callback)
    observer.observe(h2, config)
}

window.onload = init