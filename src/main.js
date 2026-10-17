import getImagesByQuery from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';
import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const errorMessage = error => {
  iziToast.error({
    position: 'topRight',
    message: error,
    backgroundColor: '#EF4040',
    messageColor: '#fff',
    iconUrl: './img/octagon-cross.svg',
  });
};

const button = document.querySelector('.form button');
if (button) {
  button.addEventListener('click', async event => {
    event.preventDefault();
    clearGallery();

    const input = document.querySelector('form input');
    const searchQuery = input.value.trim();

    if (searchQuery === '') {
      errorMessage('Please enter a search term.');
      return;
    }

    showLoader();
    getImagesByQuery(searchQuery)
      .then(data => {
        if (!data.hits || data.hits.length === 0) {
          errorMessage(
            'Sorry, there are no images matching your search query. Please try again!'
          );
          return;
        }
        createGallery(data.hits, data.totalHits);
      })
      .catch(error => {
        errorMessage(`Error fetching images: ${error.message}`);
      })
      .finally(() => {
        hideLoader();
      });
  });
}
