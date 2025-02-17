import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      // e.preventDefault;
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1, and there are other pages
    if (curentPage === 1 && numPages > 1) {
      return `
        <button data-goto="${
          curentPage + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${curentPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>`;
    }

    // Last page
    if (curentPage === numPages && numPages > 1) {
      return `
        <button data-goto="${
          curentPage - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curentPage - 1}</span>
        </button>`;
    }
    // Other page
    if (curentPage < numPages) {
      return `
        <button data-goto="${
          curentPage - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curentPage - 1}</span>
        </button>
        <button data-goto="${
          curentPage + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${curentPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>`;
    }
    // Page 1, and there are NO other pages
    return '';
  }
}

export default new PaginationView();
