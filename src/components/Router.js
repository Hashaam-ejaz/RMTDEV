import {
  BASE_API_URL,
  getData,
  jobDetailsContentEl,
  state,
} from "../common.js";
import renderError from "./Error.js";
import { renderJobDetails } from "./jobDetails.js";
import { renderJobList } from "./JobList.js";
import { deRenderSpinner, renderSpinner } from "./Spinner.js";

const loadHashChangeHandler = async () => {
  //get id
  const id = window.location.hash.substring(1);
  if (id) {
    document
      .querySelectorAll(".job-item--active")
      .forEach((jobItemwithActiveClass) => {
        jobItemwithActiveClass.classList.remove("job-item--active");
      });
    jobDetailsContentEl.innerHTML = "";
    renderSpinner("jobItem");
    try {
      const data = await getData(`${BASE_API_URL}/jobs/${id}`);
      const { jobItem } = data;
      state.activeJobItem = jobItem;
      renderJobList();
      deRenderSpinner("jobDetails");
      renderJobDetails(jobItem);
    } catch (error) {
      deRenderSpinner("jobDetails");
      renderError(error.message);
    }
  }
};

window.addEventListener("DOMContentLoaded", loadHashChangeHandler);
window.addEventListener("hashchange", loadHashChangeHandler);
