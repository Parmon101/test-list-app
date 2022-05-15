class Api {
    url= 'https://jsonplaceholder.typicode.com/posts '

    performRequest(url, method = 'GET', body) {
        return fetch(url, {
            method,
            body: JSON.stringify(body),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        }).then(response=>response.json())
    }
}

export default new Api()
