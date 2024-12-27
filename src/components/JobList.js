import {
  jobListSearchEl,
  jobDetailsContentEl,
  BASE_API_URL,
  getData,
  state,
  resultsPerPage,
  jobListBookmarksEl,
} from "../common.js";
import renderError from "./Error.js";
import { renderJobDetails } from "./jobDetails.js";
import { renderSpinner, deRenderSpinner } from "./Spinner.js";

const clickHandler = async (event) => {
  event.preventDefault();
  const jobItemEl = event.target.closest(".job-item");

  document
    .querySelectorAll(".job-item--active")
    .forEach((jobItemwithActiveClass) => {
      jobItemwithActiveClass.classList.remove("job-item--active");
    });

  jobItemEl.classList.add("job-item--active");

  jobDetailsContentEl.innerHTML = "";
  renderSpinner("jobDetails");
  const id = jobItemEl.children[0].getAttribute("href");

  const allJobItems = [...state.searchJobItems, ...state.bookmarkJobItems];
  state.activeJobItem = allJobItems.find((jobItem) => jobItem.id === +id);
  renderJobList();
  history.pushState(null, "", `/#${id}`);
  try {
    const data = await getData(`${BASE_API_URL}/jobs/${id}`);
    const { jobItem } = data;
    deRenderSpinner("jobDetails");
    renderJobDetails(jobItem);
  } catch (error) {
    deRenderSpinner("jobDetails");
    renderError(error.message);
  }
};
jobListSearchEl.addEventListener("click", clickHandler);
jobListBookmarksEl.addEventListener("click", clickHandler);

export const renderJobList = (whichJobList = "search") => {
  //determine correct selector for job list (search results list or bookmarks list)
  const jobListEl =
    whichJobList === "search" ? jobListSearchEl : jobListBookmarksEl;

  //remove previous job items
  jobListEl.innerHTML = "";

  //determine job items to be rendered
  let jobItems;
  if (whichJobList === "search") {
    jobItems = state.searchJobItems.slice(
      state.currentPage * resultsPerPage - resultsPerPage,
      state.currentPage * resultsPerPage
    );
  } else if (whichJobList === "bookmarks") {
    jobItems = state.bookmarkJobItems;
  }

  //display job items
  jobItems.forEach((jobItem) => {
    const isActive = state.activeJobItem?.id === jobItem.id;
    const newJobItemHtml = `
            <li class="job-item ${isActive ? "job-item--active" : ""}">
            <a class="job-item__link" href=${jobItem.id}>
                <div class="job-item__badge">${jobItem.badgeLetters}</div>
                <div class="job-item__middle">
                    <h3 class="third-heading">${jobItem.title}</h3>
                    <p class="job-item__company">${jobItem.company}</p>
                    <div class="job-item__extras">
                        <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i> ${
                          jobItem.duration
                        }</p>
                        <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i> ${
                          jobItem.salary
                        }</p>
                        <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i> ${
                          jobItem.location
                        }</p>
                    </div>
                </div>
                <div class="job-item__right">
                    <i class="fa-solid fa-bookmark job-item__bookmark-icon ${
                      state.bookmarkJobItems.some(
                        (bookmarkJobItem) => bookmarkJobItem.id === jobItem.id
                      ) && "job-item__bookmark-icon--bookmarked"
                    }"></i>
                    <time class="job-item__time">${jobItem.daysAgo}d</time>
                </div>
            </a>
            </li>`;
    jobListEl.insertAdjacentHTML("beforeend", newJobItemHtml);
  });
};
