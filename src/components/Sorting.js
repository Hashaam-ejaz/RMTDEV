import {
  sortingEl,
  sortingBtnRecentEl,
  sortingBtnRelevantEl,
  state,
} from "../common.js";
import { renderJobList } from "./JobList.js";
import renderPaginationButtons from "./Pagination.js";

sortingEl.addEventListener("click", (event) => {
  //get clicked button element
  const clickedButtonEl = event.target.closest(".sorting__button");
  //stop function if element clicked is not one of two sorting buttons
  if (!clickedButtonEl) return;
  state.currentPage = 1;
  // check if intention is recent or relevant sorting
  const recent = clickedButtonEl.className.includes("--recent") ? true : false;
  //make sorting button active

  if (recent) {
    sortingBtnRecentEl.classList.add("sorting__button--active");
    sortingBtnRelevantEl.classList.remove("sorting__button--active");
  } else {
    sortingBtnRecentEl.classList.remove("sorting__button--active");
    sortingBtnRelevantEl.classList.add("sorting__button--active");
  }

  //sort job items
  if (recent) {
    state.searchJobItems.sort((a, b) => {
      return a.daysAgo - b.daysAgo;
    });
  } else {
    state.searchJobItems.sort((a, b) => {
      return b.relevanceScore - a.relevanceScore;
    });
  }

  //reset pagination buttons
  renderPaginationButtons();
  renderJobList();
});
