import { fetchBreeds } from "./cat-api";
import { fetchCatByBreed } from "./cat-api";
import './sass/index.css';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';

const selectEl = document.querySelector('.breed-select');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error')
const catInfo = document.querySelector('.cat-info');

selectEl.addEventListener("change", onSelect);

selectEl.setAttribute('hidden', 'hidden');
errorEl.setAttribute('hidden', 'hidden');


fetchBreeds()
    .then(data => {
        selectEl.innerHTML = createMarkupSelect(data);
        selectEl.hidden = false;
        loaderEl.style.display = 'none';
    })
    .catch(err => {
        loaderEl.style.display = 'none';
        Notiflix.Notify.warning(errorEl.textContent);
    })


function createMarkupSelect(arr) {
    return arr.map(({ id, name }) => `<option value="${id}">${name}</option>`).join('');
}

function onSelect(evt) {
    loaderEl.style.display = 'inline-block';
    catInfo.innerHTML = "";
    fetchCatByBreed(selectEl.value).then(data => {
        catInfo.innerHTML = createMarkupCatInfo(data);
        loaderEl.style.display = 'none';

    }).catch(err => {
        loaderEl.style.display = 'none';
        Notiflix.Notify.warning(errorEl.textContent);
    });
}
function createMarkupCatInfo(arr) {
    return arr.map(({ url, breeds }) =>
        `<img src="${url}" alt="${breeds[0].name}">
         <div class="cat_descr"><h2>${breeds[0].name}</h2>
         <p>${breeds[0].description}</p>
         <p><span class="temperament">Temperament: </span>${breeds[0].temperament}</p></div>
      `).join('');
}





