export async function fetchdata(endpoint) {
    const url = window.location.host.indexOf('localhost') > -1 ? 'http://localhost:8000' : '' ; 
    const response = await fetch(url + endpoint, {
        method: 'GET',
        /*body: JSON.stringify(json),*/
        headers: {
            "Content-Type": "application/json",
        }
    })
    const res = await response.json();
    if (!response.ok) {
        return res
    }
    return res.result
}
