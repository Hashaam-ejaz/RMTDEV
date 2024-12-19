import {
  searchInputEl,
  searchFormEl,
  jobListSearchEl,
  numberEl,
  BASE_API_URL,
  getData,
} from "../common.js";
import renderError from "./Error.js";
import { renderJobList } from "./JobList.js";
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
  renderSpinner("search");
  try {
    const data = await getData(`${BASE_API_URL}/jobs?search=${searchText}`);
    const { jobItems } = data;
    deRenderSpinner("search");
    numberEl.textContent = jobItems.length;
    renderJobList(jobItems);
  } catch (error) {
    deRenderSpinner("search");
    renderError(error.message);
  }
};
searchFormEl.addEventListener("submit", submitHandler);
