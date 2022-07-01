
export const renderCardsMarkUp = images=> {
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