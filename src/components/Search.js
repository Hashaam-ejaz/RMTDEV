import {
  errorTextEl,
  searchInputEl,
  searchFormEl,
  jobListSearchEl,
  spinnerSearchEl,
  numberEl,
} from "../common.js";

const submitHandler = async (event) => {
  event.preventDefault();
  const searchText = searchInputEl.value;

  const forbiddenPattern = /[0-9]/;
  const testMatch = forbiddenPattern.test(searchText); //
  if (testMatch) {
    errorTextEl.textContent = `Your Search may not contain numbers`;
    errorEl.classList.add("error--visible");
    setTimeout(() => {
      errorEl.classList.remove("error--visible");
    }, 3500);
  }

  searchInputEl.blur();

  jobListSearchEl.innerHTML = "";

  spinnerSearchEl.classList.add("spinner--visible");
  try {
    const response = await fetch(
      `https://bytegrad.com/course-assets/js/2/api/jobs?search=${searchText}`
    );
    if (!response.ok) {
      console.log("Error");
    }
    const data = await response.json();
    const { jobItems } = data;
    spinnerSearchEl.classList.remove("spinner--visible");
    numberEl.textContent = jobItems.length;
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
  } catch (error) {
    console.log(error);
  }
};
searchFormEl.addEventListener("submit", submitHandler);
