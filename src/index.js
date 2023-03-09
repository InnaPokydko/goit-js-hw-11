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

let query = '';
let page = 1;
let simpleLightBox;
const perPage = 40;

function onSubmit(e) {
  e.preventDefault();

  query = e.currentTarget.searchQuery.value.trim();

  if (query === '') {
    Notiflix.Notify.info('Please enter a valid value.');
  }

  fatchImg(query, page, perPage)
    .then(({ data }) => {
      if (data.totalHits === 0) {
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      } else {
        renderImg(data.hits);
        simpleLightBox = new SimpleLightbox('.gallery a').refresh();
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);

        if (data.totalHits > perPage) {
          loadMoreBtn.classList.remove('is-hidden');
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

  fetchImages(query, page, perPage)
    .then(({ data }) => {
      renderImg(data.hits);
      simpleLightBox = new SimpleLightbox('.gallery a').refresh();

      const totalPages = Math.ceil(data.totalHits / perPage);

      if (page > totalPages) {
        loadMoreBtn.classList.add('is-hidden');
        Notiflix.Notify.failure('The search string cannot be empty. Please specify your search query.');
      }
    })
    .catch(error => console.log(error));
}

// function alertImagesFound(data) {
//   Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
// }

// function alertNoEmptySearch() {
//   Notiflix.Notify.failure('The search string cannot be empty. Please specify your search query.');
// }

// function alertNoImagesFound() {
//   Notiflix.Notify.failure(
//     'Sorry, there are no images matching your search query. Please try again.',
//   );
// }

// function alertEndOfSearch() {
//   Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
// }

  // const searchForm = document.querySelector('#search-form');
// const gallery = document.querySelector('.gallery');
// const loadMoreBtn = document.querySelector('.btn-load-more');
// let query = '';
// let page = 1;
// let simpleLightBox;
// const perPage = 40;

// searchForm.addEventListener('submit', onSearchForm);
// loadMoreBtn.addEventListener('click', onLoadMoreBtn);

// onScroll();
// onToTopBtn();

// function onSearchForm(e) {
//   e.preventDefault();
//   window.scrollTo({ top: 0 });
//   page = 1;
//   query = e.currentTarget.searchQuery.value.trim();
//   gallery.innerHTML = '';
//   loadMoreBtn.classList.add('is-hidden');

//   if (query === '') {
//     alertNoEmptySearch();
//     return;
//   }