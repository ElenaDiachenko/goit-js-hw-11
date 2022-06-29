
import './css/styles.css';
import axios from 'axios';
import  {Notify} from 'notiflix';

const {form,contentBlock,btnLoadMore} = {
    form: document.getElementById('search-form'),
    contentBlock: document.querySelector('.gallery'),
    btnLoadMore: document.querySelector('.load-more'),
}

let queryName = '';
let currentPage = 1;

form.addEventListener('submit', onSubmitForm);
btnLoadMore.addEventListener('click', onLoadMore)

function onSubmitForm(e) {
    e.preventDefault(); 
    queryName = e.currentTarget.elements.searchQuery.value;

    if (queryName === '') {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        return;
        };
    currentPage = 1;
    
    fetchImages(queryName, currentPage).then(data => {
        if (data.totalHits === 0) {
           return Notify.failure('Sorry, there are no images matching your search query. Please try again.')
        } 
        
        currentPage += 1;
        Notify.info(`Hooray! We found ${data.totalHits} images.`);
        btnLoadMore.classList.remove('is-visible') 
        contentBlock.innerHTML = renderCardsMarkUp(data.hits);
        btnLoadMore.classList.add('is-visible') 
    })
    .catch(error=> console.log(error))
}

function onLoadMore() {

    fetchImages(queryName,currentPage).then(data => {
        currentPage += 1;
        contentBlock.insertAdjacentHTML('beforeend', renderCardsMarkUp(data.hits));
    })
    .catch(error=> console.log(error))
}


function fetchImages(value, page) {
    const searchParams = new URLSearchParams({
        key: '28311245-d5a87b2fb61808ea8cd4c4eb5',
        q: value,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 100,
        page:page
    })

    return fetch(`https://pixabay.com/api/?${searchParams}`)
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            throw new Error(res.statusText);
    });
}


function renderCardsMarkUp(images) {
   return images.map(({largeImageURL,webformatURL,tags,likes,views,comments,downloads}) => {
        return`<a class='photo-card' href="${largeImageURL}">
  <img class='photo-card_image' src="${webformatURL}" alt="${tags}" loading='lazy' />
  <div class='info'>
    <p class='info-item'>
      <b>Likes:</b>
      <span>${likes}</span>
    </p>
    <p class='info-item'>
      <b>Views: </b>
      <span>${views}</span>
    </p>
    <p class='info-item'>
      <b>Comments: </b>
      <span>${comments}</span>
    </p>
    <p class='info-item'>
      <b>Downloads:</b>
      <span>${downloads}</span>
    </p>
  </div>
</a>`
    })
    .join('');
}