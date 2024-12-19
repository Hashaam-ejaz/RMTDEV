import {
  state,
  paginationEl,
  paginationNumberNextEl,
  paginationNumberBackEl,
  paginationBtnBackEl,
  paginationBtnNextEl,
  resultsPerPage,
} from "../common.js";

import { renderJobList } from "./JobList.js";

const renderPaginationButtons = () => {
  //display back button if page 2 or further
  if (state.currentPage > 1) {
    paginationBtnBackEl.classList.remove("pagination__button--hidden");
  } else {
    paginationBtnBackEl.classList.add("pagination__button--hidden");
  }

  //display next button if more job items on next page
  if (state.searchJobItems.length < state.currentPage * resultsPerPage) {
    paginationBtnNextEl.classList.add("pagination__button--hidden");
  } else {
    paginationBtnNextEl.classList.remove("pagination__button--hidden");
  }
  //Update page numbers
  paginationNumberNextEl.textContent = state.currentPage + 1;
  paginationNumberBackEl.textContent = state.currentPage - 1;
  //unfocus buttons
  paginationBtnBackEl.blur();
  paginationBtnNextEl.blur();
};

paginationEl.addEventListener("click", (event) => {
  //get clicked button el
  const clickedButtonEl = event.target.closest(".pagination__button");
  // stop function if null
  if (!clickedButtonEl) return;

  const nextPage = clickedButtonEl.className.includes("--next") ? true : false;
  //update state
  nextPage ? state.currentPage++ : state.currentPage--;
  //render pagination buttons
  renderPaginationButtons();
  //render job list
  renderJobList();
});

export default renderPaginationButtons;
