import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery li  a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
  overlayOpacity: 0.8,
});

const initSocialItem = (title, count) => {
  const socialItem = document.createElement('div');
  const titleEl = document.createElement('div');
  titleEl.classList.add('social-title');
  titleEl.textContent = title;
  socialItem.appendChild(titleEl);
  const countEl = document.createElement('div');
  countEl.classList.add('social-count');
  countEl.textContent = count;
  socialItem.appendChild(countEl);
  return socialItem;
};

const initGalleryItem = (preview, original, description, socialData) => {
  const li = document.createElement('li');
  li.classList.add('gallery-item');
  const card = document.createElement('div');
  card.classList.add('gallery-card');
  li.appendChild(card);

  const a = document.createElement('a');
  a.classList.add('gallery-link');
  a.href = original;

  const img = document.createElement('img');
  img.classList.add('gallery-image');
  img.src = preview;
  img.alt = description;

  const socialContainer = document.createElement('div');
  socialContainer.classList.add('social-container');

  const likes = initSocialItem('Likes', socialData.likes);
  const views = initSocialItem('Views', socialData.views);
  const comments = initSocialItem('Comments', socialData.comments);
  const downloads = initSocialItem('Downloads', socialData.downloads);
  socialContainer.appendChild(likes);
  socialContainer.appendChild(views);
  socialContainer.appendChild(comments);
  socialContainer.appendChild(downloads);

  a.appendChild(img);
  card.appendChild(a);

  card.appendChild(socialContainer);
  li.appendChild(card);

  return li;
};

const createGallery = (images, ...total) => {
  const gallery = document.querySelector('.gallery');
  const items = images.map(image =>
    initGalleryItem(image.webformatURL, image.largeImageURL, image.name, {
      likes: image.likes,
      views: image.views,
      comments: image.comments,
      downloads: image.downloads,
    })
  );
  gallery.append(...items);
  lightbox.refresh();
};
const clearGallery = () => {
  document.querySelector('.gallery').innerHTML = '';
};
const showLoader = () => {
  document.querySelector('.loader').classList.remove('hidden');
};
const hideLoader = () => {
  document.querySelector('.loader').classList.add('hidden');
};

const showLoadMoreButton = () => {
  document.querySelector('.load-more').classList.remove('hidden');
};

const hideLoadMoreButton = () => {
  document.querySelector('.load-more').classList.add('hidden');
};

export {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
};
