import getImagesByQuery from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';
import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

let currentPage = 1;

const errorMessage = error => {
  iziToast.error({
    position: 'topRight',
    message: error,
    backgroundColor: '#EF4040',
    messageColor: '#fff',
    iconUrl: './img/octagon-cross.svg',
  });
};

const submitBtn = document.querySelector('.form button');
if (submitBtn) {
  submitBtn.addEventListener('click', async event => {
    event.preventDefault();
    clearGallery();
    currentPage = 1;

    const input = document.querySelector('form input');
    const searchQuery = input.value.trim();

    if (searchQuery === '') {
      errorMessage('Please enter a search term.');
      return;
    }

    showLoader();
    await getImagesByQuery(searchQuery, currentPage)
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

const loadMoreBtn = document.querySelector('.load-more');
if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', async () => {
    const input = document.querySelector('form input');
    const searchQuery = input.value.trim();

    if (searchQuery === '') {
      errorMessage('Please enter a search term.');
      return;
    }

    showLoadMoreButton();
    await getImagesByQuery(searchQuery, ++currentPage)
      .then(data => {
        if (!data.hits || data.hits.length === 0) {
          errorMessage(
            'Sorry, there are no more images matching your search query.'
          );
          return;
        }
        createGallery(data.hits, data.totalHits);
      })
      .catch(error => {
        errorMessage(`Error fetching images: ${error.message}`);
      })
      .finally(() => {
        hideLoadMoreButton();
      });
  });
}
