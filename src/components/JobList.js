import {
  jobListSearchEl,
  jobDetailsContentEl,
  BASE_API_URL,
} from "../common.js";
import { renderJobDetails } from "./jobDetails.js";
import { renderSpinner, deRenderSpinner } from "./Spinner.js";

const clickHandler = async (event) => {
  event.preventDefault();
  const jobItemEl = event.target.closest(".job-item");

  document
    .querySelector(".job-item--active")
    ?.classList.remove("job-item--active");

  jobItemEl.classList.add("job-item--active");

  jobDetailsContentEl.innerHTML = "";
  renderSpinner("jobDetails");
  const id = jobItemEl.children[0].getAttribute("href");
  try {
    const result = await fetch(`${BASE_API_URL}/jobs/${id}`);
    if (!result.ok) throw new Error("Response not in 2xx range");
    const data = await result.json();
    const { jobItem } = data;
    deRenderSpinner("jobDetails");
    renderJobDetails(jobItem);
  } catch (error) {
    console.log(error);
  }
};
jobListSearchEl.addEventListener("click", clickHandler);

export const renderJobList = (jobItems) => {
  jobItems.slice(0, 7).forEach((jobItem) => {
    const newJobItemHtml = `
            <li class="job-item">
            <a class="job-item__link" href=${jobItem.id}>
                <div class="job-item__badge">${jobItem.badgeLetters}</div>
                <div class="job-item__middle">
                    <h3 class="third-heading">${jobItem.title}</h3>
                    <p class="job-item__company">${jobItem.company}</p>
                    <div class="job-item__extras">
                        <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i> ${jobItem.duration}</p>
                        <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i> ${jobItem.salary}</p>
                        <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i> ${jobItem.location}</p>
                    </div>
                </div>
                <div class="job-item__right">
                    <i class="fa-solid fa-bookmark job-item__bookmark-icon"></i>
                    <time class="job-item__time">${jobItem.daysAgo}d</time>
                </div>
            </a>
            </li>`;
    jobListSearchEl.insertAdjacentHTML("beforeend", newJobItemHtml);
  });
};
