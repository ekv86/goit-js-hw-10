const BASE_URL = 'https://api.thecatapi.com/v1/';
const API_KEY = 'live_e1QigGJw1Ryek1DLVT21nzyUeyYXFhFYIluvYSf9rX8CRbpUH3SzxOLTFEfoijAh';

export function fetchBreeds() {
    return fetch(`${BASE_URL}breeds?api_key=${API_KEY}`).then((resp) => {
        if (!resp.ok) {
            throw new Error(resp.statusText);
        }
        return resp.json();
    })
}

export function fetchCatByBreed(breedId) {
    return fetch(`${BASE_URL}images/search?breed_ids=${breedId}&api_key=${API_KEY}`).then((resp) => {
        if (!resp.ok) {
            throw new Error(resp.statusText);
        }
        return resp.json();
    })
}


