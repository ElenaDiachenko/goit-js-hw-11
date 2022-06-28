import './css/styles.css';
import axios from 'axios';

const form = document.getElementById('search-form')
form.addEventListener('submit', onSubmitForm)

function onSubmitForm(e) {
    e.preventDefault(); 
    const form = e.currentTarget;
    const inputValue = form.elements.searchQuery.value;
    
    fetchImages(inputValue).then(images => console.log(images.hits[0]))
    .catch(error=> console.log(error))
}

function fetchImages(imageTheme) {
    return fetch('https://pixabay.com/api/?key=28311245-d5a87b2fb61808ea8cd4c4eb5&{imageTheme}&image_type=photo&orientation=horizontal&safesearch=true')
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            throw new Error(res.statusText)
    });
}



// var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent('red roses');
// $.getJSON(URL, function(data){
// if (parseInt(data.totalHits) > 0)
//     $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
// else
//     console.log('No hits');
// });
