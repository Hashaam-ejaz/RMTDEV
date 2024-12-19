import {
  searchInputEl,
  searchFormEl,
  jobListSearchEl,
  numberEl,
  BASE_API_URL,
  getData,
  sortingBtnRecentEl,
  sortingBtnRelevantEl,
  state,
} from "../common.js";
import renderError from "./Error.js";
import { renderJobList } from "./JobList.js";
import renderPaginationButtons from "./Pagination.js";

import { renderSpinner, deRenderSpinner } from "./Spinner.js";

const submitHandler = async (event) => {
  event.preventDefault();
  const searchText = searchInputEl.value;

  const forbiddenPattern = /[0-9]/;
  const testMatch = forbiddenPattern.test(searchText); //
  if (testMatch) {
    renderError("No Numbers");
    return;
  }

  searchInputEl.blur();

  jobListSearchEl.innerHTML = "";
  //reset sorting buttons
  sortingBtnRecentEl.classList.remove("sorting__button--active");
  sortingBtnRelevantEl.classList.add("sorting__button--active");
  renderSpinner("search");
  try {
    const data = await getData(`${BASE_API_URL}/jobs?search=${searchText}`);
    const { jobItems } = data;
    //update state
    state.searchJobItems = jobItems;
    state.currentPage = 1;
    renderPaginationButtons();
    deRenderSpinner("search");
    numberEl.textContent = jobItems.length;
    renderJobList();
  } catch (error) {
    deRenderSpinner("search");
    renderError(error.message);
  }
};
searchFormEl.addEventListener("submit", submitHandler);
