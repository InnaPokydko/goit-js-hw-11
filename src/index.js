import './css/styles.css';
import { renderImg } from './js/renderImg';
import { fatchImg } from './js/fetchImg';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('input[name=searchQuery]'),
  Btn: document.querySelector('button'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};
refs.form.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', OnLoadMore);
refs.loadMoreBtn.classList.add('is-hidden');
let query = '';
let page = 1;
let simpleLightBox;
const perPage = 40;

function onSubmit(e) {
  e.preventDefault();
  cleanGallery();
  query = e.currentTarget.searchQuery.value.trim();

  if (query === '') {
    Notiflix.Notify.warning('Enter text to search the gallery.');
    
    return refs.loadMoreBtn.classList.add('is-hidden');;
      }

  fatchImg(query, page, perPage)
    .then(({ data }) => {
      if (data.totalHits === 0) {
        Notiflix.Notify.failure(
          'The search string cannot be empty or not valid. Please specify your search query.'
        );
      } else {
        renderImg(data.hits);
        simpleLightBox = new SimpleLightbox('.gallery a').refresh();
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);

        if (data.totalHits > perPage) {
          refs.loadMoreBtn.classList.remove('is-hidden');
          return;
        }
      }
    })
    .catch(error => console.log(error))
    .finally(() => {
      refs.form.reset();
    });
}

function OnLoadMore() {
  page += 1;
  simpleLightBox.destroy();

  fatchImg(query, page, perPage)
    .then(({ data }) => {
      renderImg(data.hits);
      simpleLightBox = new SimpleLightbox('.gallery a').refresh();

      const totalPages = Math.ceil(data.totalHits / perPage);

      if (page > totalPages) {
        refs.loadMoreBtn.classList.add('is-hidden');
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query.'
        );
      }
    })
    .catch(error => console.log(error));
}

function cleanGallery() {
  refs.gallery.innerHTML = '';
  page = 1;
}
