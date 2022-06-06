export async function postEvent(url, body){
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    }).then(async (response) => {
        if (response.ok) {
            let result = await response.json();
            console.log(result)
        }
    }).catch(error => {
            console.error(error);
    })
}


