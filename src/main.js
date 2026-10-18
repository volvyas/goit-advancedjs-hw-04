import getImagesByQuery from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let currentPage = 1;
let currentQuery = '';
const itemsPerPage = 15;

const errorMessage = error => {
  iziToast.error({
    position: 'topRight',
    message: error,
    backgroundColor: '#EF4040',
    messageColor: '#fff',
    iconUrl: './img/octagon-cross.svg',
  });
};

const submitFrm = document.querySelector('.form');
if (submitFrm) {
  submitFrm.addEventListener('submit', async event => {
    event.preventDefault();
    clearGallery();
    currentPage = 1;
    currentQuery = document.querySelector('form input').value;
    currentQuery = currentQuery.trim();
    showLoadMoreButton();

    if (currentQuery === '') {
      errorMessage('Please enter a search term.');
      return;
    }

    showLoader();
    hideLoadMoreButton();
    try {
      const result = await getImagesByQuery(currentQuery, currentPage);
      if (!result.hits || result.hits.length === 0) {
        errorMessage(
          'Sorry, there are no images matching your search query. Please try again!'
        );
        return;
      }
      createGallery(result.hits, result.totalHits);
      showLoadMoreButton();
    } catch (error) {
      errorMessage(`Error fetching images: ${error.message}`);
    } finally {
      hideLoader();
    }
  });
}

const loadMoreBtn = document.querySelector('.load-more');
if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', async () => {
    if (currentQuery === '') {
      errorMessage('Please enter a search term.');
      return;
    }

    hideLoadMoreButton();
    let result;
    let endOfResults = false;
    try {
      result = await getImagesByQuery(currentQuery, ++currentPage);
      endOfResults = currentPage * itemsPerPage >= result.totalHits;
      if (endOfResults) {
        errorMessage(
          "We're sorry, but you've reached the end of search results."
        );
        return;
      }
      if (!result.hits || result.hits.length === 0) {
        errorMessage(
          'Sorry, there are no images matching your search query. Please try again!'
        );
        return;
      }

      createGallery(result.hits, result.totalHits);
    } catch (error) {
      errorMessage(`Error fetching images: ${error.message}`);
    } finally {
      if (!endOfResults) {
        showLoadMoreButton();
      }
    }
  });
}
